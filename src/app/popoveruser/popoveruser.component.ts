import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, PopoverController, NavController } from '@ionic/angular';
import { MaodalinscriptionPage } from '../maodalinscription/maodalinscription.page';

@Component({
  selector: 'app-popoveruser',
  templateUrl: './popoveruser.component.html',
  styleUrls: ['./popoveruser.component.scss'],
})
export class PopoveruserComponent implements OnInit {
  nom
  id_user
  id_victime
  constructor( private navParam: NavParams,public alertController: AlertController, public popoverController: PopoverController, private navCtrl: NavController, private service: ServerService) { }

  ngOnInit() {
    console.log('ID ', this.navParam.get('id_user'), ' nom ', this.navParam.get('nom_user'))
    this.nom = this.navParam.get('nom_user')
    this.id_user = this.navParam.get('id_user')
    this.id_victime = this.navParam.get('id_victime')
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: `Pourquoi voulez-vous signaler ${this.nom} ?`,
      inputs: [
        {
          name: 'motif 1',
          type: 'radio',
          label: 'Cette personne est menteur',
          value: 'Cette personne est menteur',
          checked: true
        },
        {
          name: 'motif 2',
          type: 'radio',
          label: 'Cette personne crée des faux paris',
          value: 'Cette personne crée des faux paris'
        },
        {
          name: 'radio1',
          type: 'radio',
          label: 'Cette personne m\'a arnaqué',
          value: 'Cette personne m\'a arnaqué'
        }
      ],
      buttons: [
        {
          text: 'Retour',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.popoverController.dismiss({
              component : PopoveruserComponent,
              'dismissed': true
            });
          }
        }, {
          text: 'Confirmer',
          handler: (ev) => {
            console.log('Confirm Ok', ev);
            this.service.getsignal(this.id_user, this.id_victime, ev).then((e:any)=> {
              console.log('signale ', e)
              if(e.etat == 1) {
                  this.alert(e.motif)
              }
            })
           const pop = this.popoverController.dismiss({
              component : PopoveruserComponent,
              'dismissed': true
            })
          }
        }
      ]
  
    });

    await alert.present();
  }
  async alert(messageTxt) {
    const alert = await this.alertController.create({
      header: 'Information',
      subHeader: 'Personne dèjà signalé',
      message: `Vous avez dèjà signalé ${this.nom} avec le motif suivant: ${messageTxt}`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
