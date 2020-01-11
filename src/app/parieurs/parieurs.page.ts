import { ServerService } from './../server.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parieurs',
  templateUrl: './parieurs.page.html',
  styleUrls: ['./parieurs.page.scss'],
})
export class ParieursPage implements OnInit {
  paris
  constructor(private navCtrl: NavController, private service: ServerService) { }

  ngOnInit() {
  }
  goback() {
    this.navCtrl.navigateForward(['accueil', 'accueil', 'explorer'])
  }
}
