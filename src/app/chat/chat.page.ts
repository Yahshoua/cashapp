import { ServerService } from './../server.service';
import { NavController, IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var moment, $, Pusher
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
form: FormGroup
chaine: any
profil:any
user: any
chating = []
channel
messages
@ViewChild(IonContent, {'static': true}) content: IonContent;
  constructor(private formBuild: FormBuilder, private routes: ActivatedRoute, private navCtrl: NavController, private service: ServerService) { }

  ngOnInit() {
    moment.locale('fr')
    var h1 = $('ion-content').height() - $('.myform').height()
   $('.mydiv').css({'height':  h1+'px', 'overflow-y': 'auto'})
   console.info('bbb ', h1)
    this.profil = JSON.parse(this.routes.snapshot.queryParams.profil)
    this.user= JSON.parse(this.routes.snapshot.queryParams.user)
    if(this.routes.snapshot.queryParams.profil !== undefined) {
      this.content.scrollToBottom(1000);
    }
    this.service.getChat(this.user.id, this.profil.id_exp).then((e:any)=> {
      if(e.length>=1) {
        this.chaine = e[0].chaine
        console.log('il y a deja une chaine ', this.chaine)
        this.chating = e
      } else {
        this.chaine = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log('pas de chaine, nouvelle chaine ', this.chaine)
      }
         //Pusher
          var pusher = new Pusher('cd29f2f1d7ed1ce9bd9c', {
            cluster: 'eu',
            encrypted: true
            //forceTLS: true
          });
    var channel = pusher.subscribe(this.chaine);
      channel.bind('my-event', (data)=> {
        console.log('data pusher', data);
        this.chating.push(data)
        this.content.scrollToBottom(1000);
      });
    })
    
    
   
    this.form = this.formBuild.group({
      message: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    })
  }
  slot(id) {
    return this.user.id == id?'start':'end'
  }
  align(id) {
    return this.user.id == id?'left':'right'
  }
  send(form) {
    let id_exp = this.user.id
    let id_recep = this.profil.id_exp
    let token = this.profil.token
    let dates = moment().format('dd MM.YYYY à HH:mm')
    let dateMoment = moment().format()
    let message = form.value.message
    let chaine2 = this.profil.chaine_notif
    this.service.setChat(id_exp, id_recep, message, dates, this.chaine, this.user.nom, this.user.photo, token, this.profil.nom, chaine2, dateMoment)
    this.form.reset()
    
  }
  goback() {
    this.navCtrl.back()
  }
}