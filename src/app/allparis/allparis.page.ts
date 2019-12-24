import { Subject } from 'rxjs';
import { ServerService } from './../server.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-allparis',
  templateUrl: './allparis.page.html',
  styleUrls: ['./allparis.page.scss'],
})
export class AllparisPage implements OnInit {
  paris
  constructor(public services: ServerService, public navCtrl: NavController, public route: Router, public routes: ActivatedRoute, private zone: NgZone) { }

  ngOnInit() {
    this.getdata()
  }
  ionViewWillEnter(){
        this.services.parisSubscription.subscribe((e: any)=>{
            this.paris = e
            console.log('ooook ', this.paris)
          })
    this.services.getparis()
  }
    getdata() {
       
    }
}
