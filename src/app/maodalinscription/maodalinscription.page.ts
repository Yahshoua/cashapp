import { Push } from '@ionic-native/push/ngx';
import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maodalinscription',
  templateUrl: './maodalinscription.page.html',
  styleUrls: ['./maodalinscription.page.scss'],
})
export class MaodalinscriptionPage implements OnInit {
  constructor(private navCtrl: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  inscSocial(texte) {
    this.modalCtrl.dismiss({
      component : [MaodalinscriptionPage],
      componentProps: {'etat': texte},
      'dismissed': true
    });
  }
}
