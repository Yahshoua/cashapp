import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
declare var Chart
@Component({
  selector: 'app-moncompte',
  templateUrl: './moncompte.page.html',
  styleUrls: ['./moncompte.page.scss'],
})
export class MoncomptePage implements OnInit {
pari
  constructor(private service: ServerService) { }

  ngOnInit() {
    this.service.parisSubscription.subscribe((e: any)=> {
      this.pari = e.filter(i=> {
        return i.id_auteur == this.service.utilisateur.data.id
      })
    })
    this.service.getparis()
    console.log('mes paris ', this.pari)
  }
  ionViewWillEnter(){
  }
}
