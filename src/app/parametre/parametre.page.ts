import { ToastController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ServerService } from './../server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalsmsPage } from '../modalsms/modalsms.page';
declare var $
@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {
  @ViewChild('myselect', {'static': true}) select1
  @ViewChild('myinput', {'static': true}) input
  flag = 'ga'
  indicatif= '+241'
  numero: ''
  pays
  mynumber
  constructor(private service: ServerService, private toastController: ToastController, private modalCtrl: ModalController, private alertController: AlertController, public loadingController: LoadingController) { }
  number = this.service.utilisateur.data.numero
  ngOnInit() {
    this.pays = this.service.countrycode
    this.mynumber = this.service.utilisateur.data.numero
    $(document).ready(()=> {
        $('.input-wrapper').on('click', ()=> {
          alert('ok')
        })
    })
  }
  openselect() {
    this.select1.open()
  }
  async checkLimit(numbers) {
    let regExp = /^\d+$/
    console.log('validate input ', this.input)
    console.log('le numero est ', this.number , ' numero ', numbers)
    if (regExp.test(numbers)) {
      console.log('number ', this.number, ' mon numero ', this.mynumber)
      let compare = this.number == this.mynumber?true:false
      console.log('compare ', compare)
      if(this.number.length <=7) return
      if(this.number == this.mynumber) {
        console.log('heho')
        const toast1 = await this.toastController.create({
          message: 'Votre numéo de tél est le même !',
          position: 'top',
          duration: 4000
        });
         return toast1.present();
      } else {
        this.confirm()
      }
        return true
    }
    const toast = await this.toastController.create({
      message: 'Votre numéro de tel est incorrecte',
      position: 'top',
      color: 'danger',
      duration: 4000
    });
    toast.present();
    return null;
  }
  getSelect($event) {
    let obj: any = event
    console.log('eeee ', event)
    this.flag = ($event.detail.value.flag).toLowerCase()
    this.indicatif = obj.detail.value.indicatif
    console.log('obj ', obj ,'flag ', this.flag , 'ind ', this.indicatif)
  }
  async confirm() {
    
    var numero = this.indicatif+' '+this.number
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `${numero} est bien votre numero de téléphone ?`,
      buttons: [
        {
          text: 'je me suis trompé',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            console.log('Confirm Okay');
            this.popupconfirmation(this.indicatif, this.number)
          }
        }
      ]
    });
    await alert.present()
    return
  }
  async popupconfirmation(indicatif, numero) {
    let modal = await this.modalCtrl.create({
      component: ModalsmsPage,
      componentProps: {'indicatif': indicatif, 'numero': numero}
    });
    modal.onDidDismiss().then((e: any)=> {
        let etat = e.data.componentProps.etat
        if(etat == true) {
         let form: any = {
              numero: numero,
              id: this.service.utilisateur.data.id,
              prefixenumber:  indicatif+' '+numero
         } 
            this.setNumber(form)
        }
    })
    return await modal.present();
  }
   setNumber(form) {
    this.service.setNumberPhone(form).then(async (res)=> {
      const toast = await this.toastController.create({
        message: 'Votre numero de téléphone a été mis à jour',
        position: 'top',
        duration: 4000
      });
      this.mynumber = this.service.utilisateur.data.numero
      toast.present();
    })
  }
}
