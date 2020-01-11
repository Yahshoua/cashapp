import { PopoveruserComponent } from './../popoveruser/popoveruser.component';
import { NavController, PopoverController } from '@ionic/angular';
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
  profil: any
  paris:any
  notifs
  allparis
  constructor(private service: ServerService, private route: ActivatedRoute, private navCtrl: NavController, private routes: Router, public popoverController: PopoverController) { }

  ngOnInit() {
    // let id = this.route.snapshot.queryParams.id
    if(this.route.snapshot.queryParams.idpari !== undefined) {
          let idpari = this.route.snapshot.queryParams.idpari
        
          this.profil = this.service.notifications.find(e=> {
           
              return e.idPari = idpari
        })
        console.log('idPAri ', idpari, ' paris ', this.service.paris)
        // this.paris = this.service.paris.find(res=> {
        //   return res.id_p = idpari
        // })
         this.service.parisSubscription.subscribe((res: any)=> {
            
             let p =  res.find(e=> {
               return e.id_p == idpari
             })
           this.paris = p
        })
        this.service.getparis()
        console.log('le pari ', this.paris)
        console.log('profil ', this.profil)
          $('#homes').on('click', ()=> {
            this.navCtrl.navigateBack(['accueil'])
          })
        this.routes.navigate(['demande'], {relativeTo: this.route, queryParams: {'profil': JSON.stringify(this.profil), 'paris': JSON.stringify(this.paris)}})
    } else {
      this.profil = JSON.parse(this.route.snapshot.queryParams.profil)
    }
    
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoveruserComponent,
      event: ev,
      translucent: true,
      cssClass: 'popover',
      componentProps: {
        'id_victime': this.profil.id_exp,
        'nom_user': this.profil.nom,
        'id_user': this.service.utilisateur.data.id
      }
    });

    popover.onDidDismiss().then(e=> {
       let sign = this.service.signal
        if(sign==1) return
     this.navCtrl.navigateForward(['signal'], {queryParams: {'nom': this.profil.nom}})
    })
    return await popover.present();
  }
  goback() {
    this.navCtrl.back()
  }
}
