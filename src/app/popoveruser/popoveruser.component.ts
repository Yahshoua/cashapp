import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, PopoverController } from '@ionic/angular';
import { MaodalinscriptionPage } from '../maodalinscription/maodalinscription.page';

@Component({
  selector: 'app-popoveruser',
  templateUrl: './popoveruser.component.html',
  styleUrls: ['./popoveruser.component.scss'],
})
export class PopoveruserComponent implements OnInit {
  nom
  constructor( private navParam: NavParams,public alertController: AlertController, public popoverController: PopoverController) { }

  ngOnInit() {
    console.log('ID ', this.navParam.get('id_user'), ' nom ', this.navParam.get('nom_user'))
    this.nom = this.navParam.get('nom_user')
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: `Pourquoi voulez-vous signaler ${this.nom} ?`,
      inputs: [
        {
          name: 'motif 1',
          type: 'radio',
          label: 'Cette personne est menteur ',
          value: 'menteur',
          checked: true
        },
        {
          name: 'motif 2',
          type: 'radio',
          label: 'Cette personne crée des faux paris',
          value: 'faux paris'
        },
        {
          name: 'radio1',
          type: 'radio',
          label: 'Cette personne m\'a arnaqué',
          value: 'arnaqueur'
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
            this.popoverController.dismiss({
              component : PopoveruserComponent,
              'dismissed': true
            });
          }
        }
      ]
  
    });

    await alert.present();
  }
}
