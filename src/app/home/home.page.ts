import { ServerService } from './../server.service';
import { MaodalinscriptionPage } from './../maodalinscription/maodalinscription.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Sim  } from '@ionic-native/sim/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email
  password;
  focused: boolean;
  userData
  formConnexion: FormGroup;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(public route: ActivatedRoute, public formBuild: FormBuilder, public alertController: AlertController, public navCtrl:NavController, public loadingController: LoadingController, public modalCtrl: ModalController, private fb: Facebook, public service: ServerService, private toastCtrl: ToastController, private alrtCtrl: AlertController, private sim: Sim, private twitter: TwitterConnect, private googlePlus: GooglePlus) {}

   ngOnInit() {
    
    this.formConnexion = this.formBuild.group({
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])]
    })
      if (this.route.snapshot.queryParams.email) {
        this.email = this.route.snapshot.queryParams.email
        this.password = this.route.snapshot.queryParams.password
        let user = {'email': this.email, 'password': this.password}
        this.connexion(user)
      }
  }
  
  connexion(user) {
    this.navCtrl.navigateForward('/accueil')
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
    return await modal.present();
  }
  //connectin avec Google plus
  twiter() {
    this.googlePlus.login({})
      .then(profile =>{
        this.userData = { email: profile['email'], first_name: profile['givenName'], photo: profile['imageUrl'], nom: profile['displayName'], 'type': 'google' }
        this.setuser(this.userData)
      })
      .catch(async (err) => {
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
    this.sim.requestReadPermission().then(
      () => console.log('Permission granted'),
      () => console.log('Permission denied')
    )
    this.sim.getSimInfo().then(
      (info) => console.log('Sim info: ', info),
      (err) => console.log('Unable to get sim info: ', err)
    );
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], photo: profile['picture_large']['data']['url'], nom: profile['name'], 'type': 'facebook'}
        console.log('userData ', this.userData)
        this.setuser(this.userData)
      }).catch(err=> {
        alert('une erreur s\'est produit '+ err)
      })
    });
        
  }

    setuser(user) {
      this.service.setUser(user).then(async (e: any)=> {
        console.log('reponse ', e, 'couleur ', e.couleur)
       if (e.type == 'formulaire' || e.type == null) {
          e.response += '. Connectez-vous au formulaire !'
        } else if (e.type=="facebook" || e.type== 'google') {
         //  this.navCtrl.navigateForward(['accueil'])
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
