import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, Routes } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(public navCtrl: NavController, public router: Router) { }

  ngOnInit() {}
  go() {
    // this.navCtrl.navigateForward(['profil', 'mesparis'])
    this.router.navigate(['profil', {outlets: {'myoutlet': ['mesparis']}}])
  }
}
