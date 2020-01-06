import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-visitprofil',
  templateUrl: './visitprofil.page.html',
  styleUrls: ['./visitprofil.page.scss'],
})
export class VisitprofilPage implements OnInit {
  profil
  constructor(private service: ServerService, private route: ActivatedRoute, private navCtrl: NavController, private routes: Router) { }

  ngOnInit() {
    // let id = this.route.snapshot.queryParams.id
    if(this.route.snapshot.queryParams.idpari !== undefined) {
          let idpari = this.route.snapshot.queryParams.idpari
        this.profil = this.service.notifications.find(e=> {
          return e.idPari = idpari
        })
        console.log('profil ', this.profil)
          $('#homes').on('click', ()=> {
            this.navCtrl.navigateBack(['accueil'])
          })
        this.routes.navigate(['demande'], {relativeTo: this.route})
    }
    
  }
  goback() {
    this.navCtrl.navigateBack(['notification'])
  }
}
