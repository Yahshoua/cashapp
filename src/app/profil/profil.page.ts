import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  prevUrl
  constructor(public navCtrl: NavController, public route: Router, public router:ActivatedRoute) { }

    goback() {
      this.navCtrl.back({ animated: true,
        animationDirection: 'back'})
    }
  ngOnInit() {
    this.prevUrl = this.router.snapshot.queryParams.url
  }
  goparis() {
      // this.navCtrl.navigateForward('mesparis')
  }
}
