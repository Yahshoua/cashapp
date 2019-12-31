import { ToastController } from '@ionic/angular';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
declare var moment
@Component({
  selector: 'app-vosparis',
  templateUrl: './vosparis.page.html',
  styleUrls: ['./vosparis.page.scss'],
})
export class VosparisPage implements OnInit {
paris: any
  constructor(private services: ServerService, private toastController: ToastController) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.getPari()
    }
     getPari() {
      this.services.parisSubscription.subscribe((e: any) =>{
        var tab = new Array()
        for(var i=0;i<e.length;i++) {
          e[i].participants.find(x=> {
            if(x.id_part == this.services.utilisateur.data.id) {
              tab.push(e[i])
            }
          })
        }
        this.paris = tab
        console.log('paris ', this.paris)
      })
      this.services.getparis()
    }
    dateParse(date) {
      moment.locale('fr')
      date = moment(date).format('DD MM YYYY à HH:mm')
      return date
    }
    async doRefresh(event) {
      const toast = await this.toastController.create({
        message: 'Page rafraichie',
        duration: 2000
      });
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
        this.getPari()
        toast.present();
      }, 2000);
    }
}
