import { Subject } from 'rxjs';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-allparis',
  templateUrl: './allparis.page.html',
  styleUrls: ['./allparis.page.scss'],
})
export class AllparisPage implements OnInit {
  paris
  constructor(public services: ServerService) { }

  ngOnInit() {
    this.getdata()
  }
  ionViewWillEnter(){
    console.log('fiiiire')
        this.services.parisSubscription.subscribe((e: any)=>{
            this.paris = e
            console.log('ooook ', this.paris)
          })
    this.services.getparis()
  }
    getdata() {
       
    }
}
