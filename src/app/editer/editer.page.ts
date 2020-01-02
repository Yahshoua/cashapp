import { NavController, AlertController, ToastController } from '@ionic/angular';
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
  pari
  edition: any
  constructor(private navCtrl: NavController, private routes: ActivatedRoute, private service: ServerService, private alertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.routes.snapshot.queryParams.id
    console.log('id ', this.id, 'typeof ', typeof this.id)
     this.service.parisSubscription.subscribe((e: any)=> {
      this.pari = e.find(i=> {
        return i.id_p == parseInt(this.id)
      })
    })
    this.service.getparis()
    console.log('pari ', this.pari)
    
  }
  ionViewWillEnter(){
    this.edition = {visible: this.pari.visible, nbparticipant: this.pari.nbparticipant, invitation: this.pari.invitation, noti_invit: this.pari.noti_invit, voirnum: this.pari.voirnum}
    console.log('edition ', this.edition)
  }
  visiblePari(visible) {
   var view = visible == 1?true:false
    return view
  }
  edited() {
    this.edition.edit = true
  }
  limite(nb) {
    var q = nb==100?'illimité': nb
    return q
  }
  notification(visible) {
    var view = visible == 1?true:false
    return view
  }
  goback() {
    if(this.edition.edit) {
      this.setEdition()
    } else {
      this.navCtrl.back()
    }
  }
  async setEdition() {
    const alert = await this.alertController.create({
      header: 'Confirmez les modifications ?',
      message: 'Voulez-vous confirmer les modifications effectué ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.navCtrl.back()
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.edition.idPari = this.id
            console.log('nouvelles valeurs ', this.edition)
            this.service.updatepari(this.edition)
            this.presentToast()
            
          }
        }
      ]
    });
    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Mise-à-jour effectuée !',
      duration: 2000,
      position: 'top'
    });
    toast.present();
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
          value: 1,
          checked: this.checkqst1('1')
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '5 personnes maxi',
          value: 5,
          checked: this.checkqst1('5')
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'illimité',
          value: 100,
          checked: this.checkqst1('100')
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
            this.edition.nbparticipant = $event
            this.pari.nbparticipant = $event
            this.edited()
          }
        }
      ]
    });
    await alert.present();
  }
  checkqst1(val) {
    console.log('cmbien de personne ? ', val, 'typeof val', typeof val, ' typeof pari ', typeof this.pari.nbparticipant, this.pari.nbparticipant)
    var elm = this.pari.nbparticipant == val?true:false
    console.log('reponse ', elm)
    return elm
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
          checked: this.checkinvit('Tout le monde')
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Moi seul',
          value: 'Moi seul',
          checked: this.checkinvit('Moi seul')
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Moi et les participants',
          value: 'Moi et les participants',
          checked: this.checkinvit('Moi et les participants')
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
            this.edition.invitation = $event
            this.pari.invitation = $event
            this.edited()
          }
        }
      ]
    });
    await alert.present();
  }
  checkinvit(val) {
    return this.pari.invitation == val?true:false
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
          checked: this.checkvoir('Tout le monde')
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'les participants',
          value: 'les participants',
          checked: this.checkvoir('les participants')
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
            this.edition.voirnum = $event
            this.pari.voirnum = $event
            this.edited()
          }
        }
      ]
    });
    await alert.present();
  }
  checkvoir(voirnum) {
    return this.pari.voirnum == voirnum?true:false

  }
  change() {
    var e:any = event
    var value = e.detail.checked?1:0
    this.edition.visible = String(value)
    this.edited()
  }
  change2() {
    var e:any = event
    var value = e.detail.checked?1:0
    this.edition.noti_invit = String(value)
    this.edited()
  }
}