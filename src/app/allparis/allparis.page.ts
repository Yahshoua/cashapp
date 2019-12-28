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
  paris:[]
  constructor(public services: ServerService, public navCtrl: NavController, public route: Router, public routes: ActivatedRoute, private zone: NgZone) { }

  ngOnInit() {
    this.getdata()
  }
  ionViewWillEnter(){
        this.services.parisSubscription.subscribe((e: any)=>{
            this.paris = e.sort((a, b) => a.id < b.id ? 1 : -1)
            console.log(typeof this.paris)
            console.log('ooook ', this.paris)
          })
    this.services.getparis()
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getdata()
    }, 2000);
  }
    getdata() {
       this.services.getallparis().then((e: any)=> {
         console.log(e)
         //this.paris = e.sort((a, b) => a.id < b.id ? 1 : -1)
       })
    }
}
