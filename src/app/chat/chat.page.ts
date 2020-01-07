import { ServerService } from './../server.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
  constructor(private formBuild: FormBuilder, private routes: ActivatedRoute, private navCtrl: NavController, private service: ServerService) { }

  ngOnInit() {
    moment.locale('fr')
    var h1 = $('ion-content').height() - $('.myform').height()
   $('.mydiv').css({'height':  h1+'px', 'overflow-y': 'auto'})
   console.info('bbb ', h1)
    this.profil = JSON.parse(this.routes.snapshot.queryParams.profil)
    this.user= JSON.parse(this.routes.snapshot.queryParams.user)
   
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
    let dates = moment().format('dd MM.YYYY à HH:mm')
    let message = form.value.message
    this.service.setChat(id_exp, id_recep, message, dates, this.chaine, this.user.nom, this.user.photo)
    this.form.reset()
  }
}
