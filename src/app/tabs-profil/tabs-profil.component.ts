import { NavController } from '@ionic/angular';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
declare var Pusher
@Component({
  selector: 'app-tabs-profil',
  templateUrl: './tabs-profil.component.html',
  styleUrls: ['./tabs-profil.component.scss'],
})
export class TabsProfilComponent implements OnInit {
  notification
  chaine
  constructor(private service: ServerService, private navCtrl: NavController) { }

  ngOnInit() {
    this.chaine = this.service.utilisateur.data.chaine_notif
    var pusher = new Pusher('cd29f2f1d7ed1ce9bd9c', {
      cluster: 'eu',
      encrypted: true
      //forceTLS: true
    });
      var channel = pusher.subscribe(this.chaine);
      channel.bind('notifications', (data)=> {
        console.log('notification pusher', data);
        this.notification = data.notifications
        this.service.setNotifications(data.notifications)
        this.service.getallparis()
        console.log('nouvelles notifs ', this.notification)
      });

    
    this.service.getNotification().then((e: any)=> {
      this.service.notifSubscriber.subscribe((res:Array<string>=[])=> {
        if(res.length>=1) {
          this.notification = res.filter((e: any)=> {
          return e.etat == 0
            })
          console.log('les notifs ', this.notification)
        }
        
      })
      this.service.getNotif()
  })
  }
  goTonotif() {
    this.navCtrl.navigateForward(['notification'],{queryParams: {'url': ['mypage', 'profil']}})
  }
}
