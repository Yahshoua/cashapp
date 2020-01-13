import { ModalsmsPage } from './../modalsms/modalsms.page';
import { ServerService } from './../server.service';
import { NavController, ModalController, AlertController,ToastController, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MaodalinscriptionPage } from '../maodalinscription/maodalinscription.page';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Sim } from '@ionic-native/sim/ngx';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  @ViewChild('myselect', {'static': true}) select1
  formInscription: FormGroup
  password: ''
  password2: ''
  focused: boolean;
  eyes = 'eye-off'
  text = 'password'
  eye = 'eye-off'
  text2 = 'password'
  pays
  flag = 'ga'
  indicatif= '+241'
  numero: ''
  modal
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public formBuild: FormBuilder, private service: ServerService, private alertCtrl: AlertController, private toastCtrl: ToastController,private sim: Sim, public alertController: AlertController, public toastController: ToastController) {}

  ngOnInit() {
    this.pays = this.service.countrycode
    this.modalCtrl.dismiss({
      component : [MaodalinscriptionPage, ModalsmsPage],
      'dismissed': true
    });
  
    this.formInscription = this.formBuild.group({
      nom: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      numero: ['', Validators.compose([Validators.required,Validators.minLength(6)]) ],
      type: 'formulaire',
      password: ['', Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(10)])],
      password2: ['', Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(10)])]
    },
    {
      validator: this.passwords.bind(this)
    }
    )
   
  }
  ionViewWillEnter(){
    
  }
  openselect() {
    this.select1.open()
  }
  async checkLimit(number) {
    let regExp = /^\d+$/

    if (regExp.test(number)) {
      console.log('valide')
        this.confirm()
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
    console.log($event.detail)
    let obj: any = $event
    this.flag = (obj.detail.value.flag).toLowerCase()
    this.indicatif = obj.detail.value.indicatif
    console.log('obj ', obj ,'flag ', this.flag , 'ind ', this.indicatif)

  }
  goback() {
    this.navCtrl.navigateBack('/home', {queryParams: {'id': 0}} )
  }
  onInputs() {
    this.focused = !this.focused;
    console.log(this.focused)
  }
  passwords(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: password2 } = formGroup.get('password2');
    return password === password2 ? null : { passwordNotMatch: true };
  }
  view() {
    this.eyes == 'eye-off'? this.eyes = 'eye': this.eyes = 'eye-off'
    this.text == 'password'? this.text= 'text': this.text='password'
    console.log('eyes ', this.eyes, 'text ', this.text)
  }
  view2() {
    this.eye == 'eye-off'? this.eye = 'eye': this.eye = 'eye-off'
    this.text2 == 'password'? this.text2= 'text': this.text2='password'
    console.log('eye ', this.eye, 'text2 ', this.text2)
  }
  async confirm() {
    console.log(this.formInscription)
    var numero = this.indicatif+' '+this.formInscription.value.numero
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
            this.popupconfirmation(this.indicatif, this.formInscription.value.numero)
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
          console.log('form ', this.formInscription.value)
          this.formInscription.value.prefixenumero = indicatif+' '+numero
            this.connexion(this.formInscription.value)
        }
    })
    return await modal.present();
  }
  async connexion(form) {
     
      this.service.setUser(form).then(async (e:any)=> {
        console.log('reponse ', e, 'couleur ', e.couleur)
        e = JSON.parse(e)
        if (e.tab == '1') {
          e.response += '. Connectez-vous'
        }
        const toast = await this.toastCtrl.create({
          message: e.response,
          duration: 7000,
          position: 'top',
          color: e.couleur
        });
        toast.present();
        this.formInscription.reset()
        this.service.setStorage(e).then(res=> {
          this.navCtrl.navigateForward(['accueil'])
      })
      }).catch(async (err)=>{
        console.log('erreur ', err)
        const alert = await this.alertCtrl.create({
          header: 'Oups !',
          message: 'une erreur s\'est produite <br> <small>'+ err.statusText +'<br>'+err.message+'</small>',
          buttons: ['OK']
        });
        await alert.present();
      })
  }
}
