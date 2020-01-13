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
mynumber
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
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.mynumber = this.service.utilisateur.data.numero
    
  }
  getBtn() {
    let numero = this.service.utilisateur.data.numero
      var Txticon = 'create'
      var TxtBtn = 'Mettre à jour votre numero'
    if(numero =='' || numero == undefined) {
      Txticon = 'add'
      TxtBtn = 'Ajouter un numéo de téléphone'
    }
    return {
       textIcon: Txticon,
       textBtn: TxtBtn
    }
  }
  ionViewWillEnter(){
  }
}
