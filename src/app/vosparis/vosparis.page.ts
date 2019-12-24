import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vosparis',
  templateUrl: './vosparis.page.html',
  styleUrls: ['./vosparis.page.scss'],
})
export class VosparisPage implements OnInit {
parie
  constructor(private services: ServerService) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.getPari()
    }
     getPari() {
      this.services.parisSubscription.subscribe( (e: any) =>{
        this.parie = e.filter((elm)=> {
          return elm.id == 0
        })
      })
      this.services.getparis()
    }
}
