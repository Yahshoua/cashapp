import { ServerService } from './../server.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-demande',
  templateUrl: './demande.page.html',
  styleUrls: ['./demande.page.scss'],
})
export class DemandePage implements OnInit {
  profil: Array<string>
  paris: Array<string>
  user: Array<string>
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private service: ServerService) { }

  ngOnInit() {
    this.user= this.service.utilisateur.data
    this.profil = JSON.parse(this.route.snapshot.queryParams.profil)
    this.paris = JSON.parse(this.route.snapshot.queryParams.paris)
    console.log('profil ', this.profil, 'paris ', this.paris)
    $(document).ready(function(){
      var h1 = $('.myblock').height()
      var h2 = $('.heads').height()
      var height = 100 - ($('app-demande').height() - h2)
      $('.col-info').css({'height': height +'%'})
      console.log('height ', height)
      
    })
  }
  goChat() {
    this.navCtrl.navigateForward(['visitprofil', 'chat'], {queryParams: {'profil': JSON.stringify(this.profil), 'user': JSON.stringify(this.user)}})
  }
}
