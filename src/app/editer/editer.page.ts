import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-editer',
  templateUrl: './editer.page.html',
  styleUrls: ['./editer.page.scss'],
})
export class EditerPage implements OnInit {
  id
  constructor(private navCtrl: NavController, private routes: ActivatedRoute, private service: ServerService, private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.routes.snapshot.queryParams
    console.log('id ', this.id)
  }
  goback() {
    this.navCtrl.back()
  }
  async question1() {
    const alert = await this.alertController.create({
      header: 'Choisir',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: '1 personne maxi',
          value: '1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '5 personnes maxi',
          value: '5'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'illimité',
          value: '100'
        }
      ],
      buttons: [
        {
          text: 'Retour',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ($event) => {
            console.log('Confirm Ok', $event);
          }
        }
      ]
    });
    await alert.present();
  }
  async inviter() {
    const alert = await this.alertController.create({
      header: 'Choisir',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Tout le monde',
          value: 'Tout le monde',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Moi seul',
          value: 'Moi seul'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Moi et les participants',
          value: 'Moi et les participants'
        }
      ],
      buttons: [
        {
          text: 'Retour',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ($event) => {
            console.log('Confirm Ok', $event);
          }
        }
      ]
    });
    await alert.present();
  }
  async voir() {
    const alert = await this.alertController.create({
      header: 'Choisir',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Tout le monde',
          value: 'Tout le monde',
          checked: true
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'les participants',
          value: 'les participants'
        }
      ],
      buttons: [
        {
          text: 'Retour',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ($event) => {
            console.log('Confirm Ok', $event);
          }
        }
      ]
    });
    await alert.present();
  }
  change(envent) {
    console.log(event)
  }
  change2(ev) {
    console.log(ev)
  }
}
