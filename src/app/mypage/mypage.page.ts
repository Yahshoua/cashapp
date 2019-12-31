import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  goback() {
    this.navCtrl.back({ animated: true,
      animationDirection: 'back'})
  }
}
