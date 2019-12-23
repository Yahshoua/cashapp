import { ServerService } from './../server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
id
pari
  constructor(public route: ActivatedRoute, public service: ServerService) { }

  ngOnInit() {
    let id = this.route.snapshot.queryParams.id
    console.log(this.route.snapshot)
    this.id = id
    this.service.parisSubscription.subscribe((e:any)=> {
      this.pari = e.find((i)=> {
          return i.id == id
      })
    })
    this.service.getparis()
  }

}
