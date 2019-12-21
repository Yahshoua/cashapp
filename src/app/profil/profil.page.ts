import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  goparis() {
      // this.navCtrl.navigateForward('mesparis')
  }
}
