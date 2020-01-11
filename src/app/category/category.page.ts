import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
declare var moment, $
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  paris
  type
  constructor(private service: ServerService, private routes: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
      this.type = this.routes.snapshot.queryParams.type
      this.paris = this.service.paris.filter((e: any)=> {
         return e.category == this.type
      })
  }
  dateParse(date) {
    moment.locale('fr')
    date = moment(date).format('DD MM YYYY à HH:mm')
    return date
  }
  goback() {
    this.navCtrl.navigateBack(['accueil', 'accueil', 'explorer'])
  }
}
