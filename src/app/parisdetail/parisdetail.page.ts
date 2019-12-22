import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-parisdetail',
  templateUrl: './parisdetail.page.html',
  styleUrls: ['./parisdetail.page.scss'],
})
export class ParisdetailPage implements OnInit {
  pari
  constructor(public route: ActivatedRoute, public service: ServerService) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.service.parisSubscription.subscribe((e:any)=> {
      this.pari = e.find((i)=> {
          return i.id == id
      })
    })
    this.service.getparis()
  }

}
