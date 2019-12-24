import { element } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServerService } from './../server.service';
import { Component, OnInit, NgZone  } from '@angular/core';
declare var $, M: any
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  actives: Boolean = true
  color ='light'
  color2 = 'none'
  zap:boolean = false
  constructor(public service: ServerService, public navCtrl: NavController, public route: Router, public routes: ActivatedRoute, private zone: NgZone) { }
   govosparis() {
    this.navCtrl.navigateForward(['accueil', 'accueil', 'vosparis']).then((elm)=> {
        console.log('e ', elm)
      }).catch((err)=> {
        console.log('error ', err)
      })
      this.color = "none"
      this.zap = true
      this.color2 = 'light'
  }
  mycolor() {
    return this.color
  }
  mycolor2() {
    return this.color2
  }
  clic() {
    this.color= "light"
    this.color2 = 'none'
    this.zap = false
  }
  ngOnInit() {
    var instance = M.Tabs.init('.tabs');
       $('.tabs').tabs();
  }

}
