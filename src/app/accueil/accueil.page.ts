import { element } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServerService } from './../server.service';
import { Component, OnInit, NgZone, Input  } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
declare var $, M: any
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  actives: Boolean = true
  color ='light'
  color2 = 'none'
  @Input() zap:boolean = false
  senderID
  constructor(public service: ServerService, public navCtrl: NavController, public route: Router, public routes: ActivatedRoute, private zone: NgZone, private push: Push) { }
  mycolor() {
    return this.color
  }
  mycolor2() {
    return this.color2
  }
  ngAfterViewInit() {
     $('#homes').on('click', ()=> {
        this.color= "light"
        this.color2 = 'none'
        this.zap = false
        console.log('zap ', this.zap)
      })
  }
  ionViewWillEnter(){
    this.service.getStorageUser()
     
  }
  clic() {
    this.navCtrl.navigateForward(['accueil','accueil', 'allparis']).then((elm)=> {
      console.log('e ', elm)
    }).catch((err)=> {
      console.log('error ', err)
    })
    this.color= "light"
    this.color2 = 'none'
    this.zap = false
    
      // to check if we have permission
      // this.push.hasPermission()
      // .then((res: any) => {

      //       if (res.isEnabled) {
      //         console.log('We have permission to send push notifications');
      //       } else {
      //         console.log('We do not have permission to send push notifications');
      //       }
      //     });
      //   this.push.createChannel({
      //     id: "testchannel1",
      //     description: "My first test channel",
      //     importance: 5
      //   }).then((e) => console.log('Channel created ', e));
  }

   govosparis() {
    this.navCtrl.navigateForward(['accueil', 'accueil', 'vosparis'])
        this.color = "none"
        this.zap = true
        this.color2 = 'light'
        console.log('etat de button1', this.mycolor())
    console.log('etat de button2 ',this.mycolor2())
     
  }
  
  ngOnInit() {
    
        // Return a list of currently configured channels
        this.push.listChannels().then((channels) => console.log('List of channels', channels))
        // to initialize push notifications
      // Marche pas :(
      const options: PushOptions = {
        android: {
          senderID:"518940197353",
          icon: 'https://kazimo.ga/cashapp/logo-cash.PNG',
          vibrate: true,
          forceShow: true,
          messageKey: 'Hey bonhomme !',
          titleKey: 'Qui t\'a dit que c\'est difficile ? '
        },
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      }

      //fin
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
     // Marche, le numero de registration est l'id du phone qui reçoit le push notif
  pushObject.on('registration').subscribe((registration: any) =>{
    console.log('Device registered', registration)
        this.senderID = registration.registrationId
        this.service.updateRegistration(this.senderID).then(res=> {
          console.log('resultat ', res)
        })
  });
  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    
}

}
