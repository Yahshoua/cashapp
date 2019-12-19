import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email
  password;
  focused: boolean;
  formConnexion: FormGroup;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(public route: ActivatedRoute, public formBuild: FormBuilder, public alertController: AlertController, public navCtrl:NavController, public loadingController: LoadingController) {}

  async ngOnInit() {
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
    this.navCtrl.navigateForward('/page-login')
  }
  onInputs() {
    this.focused = !this.focused;
    console.log(this.focused)
  }
}
