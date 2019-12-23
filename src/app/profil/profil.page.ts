import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(public navCtrl: NavController, public route: Router) { }
  goback() {
    this.navCtrl.navigateBack(['accueil'])
  }
  ngOnInit() {
  }
  goparis() {
      // this.navCtrl.navigateForward('mesparis')
  }
}
