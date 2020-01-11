import { ModalsmsPage } from './../modalsms/modalsms.page';
import { ServerService } from './../server.service';
import { NavController, ModalController, AlertController,ToastController  } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MaodalinscriptionPage } from '../maodalinscription/maodalinscription.page';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Sim } from '@ionic-native/sim/ngx';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  formInscription: FormGroup
  password: ''
  password2: ''
  focused: boolean;
  eyes = 'eye-off'
  text = 'password'
  eye = 'eye-off'
  text2 = 'password'
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public formBuild: FormBuilder, private service: ServerService, private alertCtrl: AlertController, private toastCtrl: ToastController,private sim: Sim) {}

  ngOnInit() {
    this.modalCtrl.dismiss({
      component : [MaodalinscriptionPage, ModalsmsPage],
      'dismissed': true
    });
    this.sim.getSimInfo().then(
      (info) => console.log('Sim info: ', info),
      (err) => console.log('Unable to get sim info: ', err)
    );
    
    this.sim.hasReadPermission().then(
      (info) => console.log('Has permission: ', info)
    );
    
    this.sim.requestReadPermission().then(
      () => console.log('Permission granted'),
      () => console.log('Permission denied')
    );
    this.formInscription = this.formBuild.group({
      nom: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      numero: ['', Validators.compose([Validators.required, Validators.minLength(6)]) ],
      type: 'formulaire',
      password: ['', Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(10)])],
      password2: ['', Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(10)])]
    },
    {
      validator: this.passwords.bind(this)
    }
    )
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
    const modal = await this.modalCtrl.create({
      component: ModalsmsPage
    });
    return await modal.present();
  }
  async connexion(form) {
     
      this.service.setUser(form).then(async (e:any)=> {
        console.log('reponse ', e, 'couleur ', e.couleur)
        if(e.tab == '0') {
          e.response += '. Confirmez votre numéro !'
        } else if (e.tab == '1') {
          e.response += '. Connectez-vous'
        }
        const toast = await this.toastCtrl.create({
          message: e.response,
          duration: 7000,
          position: 'top',
          color: e.couleur
        });
        toast.present();
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
