import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}
  go() {
    this.navCtrl.navigateForward('/allparis')
  }
}
