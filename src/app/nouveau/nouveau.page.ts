import { NavController } from '@ionic/angular';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
declare var moment, $
@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.page.html',
  styleUrls: ['./nouveau.page.scss'],
})
export class NouveauPage implements OnInit {
  parieurs = []

  constructor(private service: ServerService, private navCtrl: NavController) { }

  ngOnInit() {
      moment.locale('fr')
      let users = this.service.allusers.filter(e=> {
        return e.id  !== this.service.utilisateur.data.id
      })
      for(var i=0;i<users.length;i++) {
        var dates = moment(users[i].dateinscription).format('YYYYMMDD')
                var today= moment().format('YYYYMMDD')
                var a = moment(today, 'YYYYMMDD');
                var b = moment(dates, 'YYYYMMDD');
                var diff = a.diff(b, 'days')
                console.log(' dates', dates, ' a ', a, ' difference ', diff)
                if(diff <=7) {
                 this.parieurs.push(users[i])
                }
      }
      console.log('paris ', this.parieurs)
  }
  follow(id) {
      let profil = this.parieurs.find(e=> {
        return e.id == id
      })
      profil.id_exp = id
      console.log('profil ', profil)
     this.navCtrl.navigateForward(['visitprofil', 'demande'], {queryParams: {'profil': JSON.stringify(profil)}})
  }
}
