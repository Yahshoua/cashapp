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
  constructor(private formBuild: FormBuilder, private routes: ActivatedRoute, private navCtrl: NavController, private service: ServerService) { }

  ngOnInit() {
    var h1 = $('ion-content').height() - $('.myform').height()
   $('.mydiv').css({'height':  h1+'px', 'overflow-y': 'auto'})
   console.info('bbb ', h1)
    this.profil = JSON.parse(this.routes.snapshot.queryParams.profil)
    this.user= JSON.parse(this.routes.snapshot.queryParams.user)
    this.service.getChat(this.user.id, this.profil.id_exp)
    this.service.chatSubscription.subscribe((e:any)=> {
      console.log('eeee ', e ,' taille ', e.length)
        if(e.length>=1) {
          this.chaine = e[0].chaine
          console.log('il y a deja une chaine ', this.chaine)
          this.chating = e
        } else {
          this.chaine = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          console.log('pas de chaine, nouvelle chaine ', this.chaine)
        }
        
        //Pusher
        Pusher.logToConsole = true;
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
    this.service.getChatSubsciption()
    
    this.form = this.formBuild.group({
      message: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    })
  }
  slot(id) {
    return this.user.id == id?'end':'start'
  }
  align(id) {
    return this.user.id == id?'right':'left'
  }
  send(form) {
    let id_exp = this.user.id
    let id_recep = this.profil.id_exp
    let dates = moment().format('DDD MM YY à HH:mm')
    let message = form.value.message
    this.service.setChat(id_exp, id_recep, message, dates, this.chaine, this.user.nom, this.user.photo)
  }
}
