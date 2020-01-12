import { ModalsmsPage } from './../modalsms/modalsms.page';
import { ServerService } from './../server.service';
import { MaodalinscriptionPage } from './../maodalinscription/maodalinscription.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Sim  } from '@ionic-native/sim/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  numero
  password;
  focused: boolean;
  userData
  eye = 'eye-off'
  text = 'password'
  formConnexion: FormGroup;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(public route: ActivatedRoute, public formBuild: FormBuilder, public alertController: AlertController, public navCtrl:NavController, public loadingController: LoadingController, public modalCtrl: ModalController, private fb: Facebook, public service: ServerService, private toastCtrl: ToastController, private alrtCtrl: AlertController, private sim: Sim, private googlePlus: GooglePlus) {}

   ngOnInit() {
    this.formConnexion = this.formBuild.group({
      numero: ['', Validators.compose([Validators.required]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])]
    })
    this.modalCtrl.dismiss({
      component : ModalsmsPage,
      'dismissed': true
    });
  }
  
  connexion(user) {
    this.service.login(user).then(async (e:any)=> {
      console.log('resltat de la connection ', JSON.parse(e))
      e = JSON.parse(e)
      if(e.status == 1) {
        this.service.setStorage(e).then(res=> {
          this.navCtrl.navigateForward(['accueil'])
      })
    }
      const toast = await this.toastCtrl.create({
        message: e.message,
        duration: 7000,
        position: 'top',
        color: e.couleur
      });
      toast.present() })
  }
  view() {
    this.eye == 'eye-off'? this.eye = 'eye': this.eye = 'eye-off'
    this.text == 'password'? this.text= 'text': this.text='password'
  }
  onInputs() {
    this.focused = !this.focused;
    console.log(this.focused)
  }
  async callinscrip() {
    const modal = await this.modalCtrl.create({
      component: MaodalinscriptionPage,
      cssClass: 'my-custom-modal-css'
    })
    modal.onDidDismiss().then(e=> {
      let etat = event.detail.data.componentProps.etat
      if(etat == 'facebook') {
          this.facebook()
      } else if(etat == 'google') {
        this.twiter()
      }
    })
    return await modal.present();
  }
  //connectin avec Google plus
  twiter() {
    this.googlePlus.login({})
      .then(profile =>{
        console.log('profil google ', profile)
        this.userData = { email: profile['email'], first_name: profile['givenName'], photo: profile['imageUrl'], nom: profile['displayName'], 'type': 'google' }
        this.setuser(this.userData)
      })
      .catch(async (err) => {
        console.log('erreur ', err)
        const alert = await this.alrtCtrl.create({
          header: 'Oups !',
          message: 'une erreur s\'est produite <br> <small>'+ err.statusText +'<br>'+err.message+'</small>',
          buttons: ['OK']
        });
        await alert.present();
      }); 
    }
    // fin
    //connection avec facebook
  facebook() {
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], photo: profile['picture_large']['data']['url'], nom: profile['name'], 'type': 'facebook'}
        console.log('userData ', this.userData)
        this.setuser(this.userData)
      }).catch(err=> {
        alert('une erreur s\'est produit '+ err)
      })
    }).catch(err=> {
      console.log('erreur facebook ', err)
      alert(JSON.stringify(err))
    })
  }
    setuser(user) {
      this.service.setUser(user).then(async (e: any)=> {
        e = JSON.parse(e)
        console.log('reponse ', e, 'couleur ', e.couleur)
       if (e.type == 'formulaire' || e.type == null) {
          e.response += '. Connectez-vous au formulaire !'
        } else if (e.type=="facebook" || e.type== 'google') {
          this.service.setStorage(e).then(res=> {
              this.navCtrl.navigateForward(['accueil'])
          })
          
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
        const alert = await this.alrtCtrl.create({
          header: 'Oups !',
          message: 'une erreur s\'est produite <br> <small>'+ err.statusText +'<br>'+err.message+'</small>',
          buttons: ['OK']
        });
        await alert.present();
      })
    }
}
