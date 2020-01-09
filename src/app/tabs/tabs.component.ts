import { ServerService } from './../server.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, Routes } from '@angular/router';
declare var Pusher, $
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  notification: Array<string>= []
  chaine: any
  constructor(public navCtrl: NavController, public router: Router, private service: ServerService) { }

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
  ngAfterViewInit() {
    
  }
  gohome() {
    this.navCtrl.navigateBack(['accueil'])
  }
  goTonotif() {
    this.navCtrl.navigateForward(['notification'],{queryParams: {'url': 'accueil'}})
  }
  go() {
   // this.navCtrl.navigateForward(['mypage'])
   this.navCtrl.navigateForward(['mypage'], {queryParams: {'url': 'accueil'}})
  }
}
