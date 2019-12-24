import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
declare var $
@Component({
  selector: 'app-parisdetail',
  templateUrl: './parisdetail.page.html',
  styleUrls: ['./parisdetail.page.scss'],
})
export class ParisdetailPage implements OnInit {
  pari
  par
  enft
  id
  constructor(public route: ActivatedRoute, public service: ServerService, public navCtrl: NavController,  public router: Router) { }

  goback() {
    this.navCtrl.back()
  }
  godesc() {
    this.router.navigate(['parisdetail',this.id, {outlets: {'outlet2': ['description']}}], { queryParams: { id: this.id } })
  }
  gopart() {
    this.router.navigate(['parisdetail',this.id, {outlets: {'outlet2': ['participants']}}], { queryParams: { id: this.id } })
  }
  goinv() {
    this.router.navigate(['parisdetail',this.id, {outlets: {'outlet2': ['invitations']}}], { queryParams: { id: this.id } })
  }
  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.id = id
    this.service.parisSubscription.subscribe((e:any)=> {
      this.pari = e.find((i)=> {
          return i.id == id
      })
    })
    this.service.getparis()
    $(document).ready(function(){
      $('.item-paris ion-col').on('click', function(){
        var par = $('.item-paris').width()
        var enft = Math.floor(par/3)
        var id = $(this).attr('id')
        var swip = $('.col-swip').css('left')
        console.log('id= ', id, 'paent =',par, 'enft=', enft, 'swip =', swip)
        if((id==1 && swip == enft+'px') || (id==2 && swip == enft*2+'px')) return
   				if(id == 1 && (swip =='0px' || swip ==  enft*2+'px')) {
   						$('.col-swip').css('left', enft+'px')
   				} else if(id == 2 && (swip == enft+'px' || swip =='0px')) {
   					$('.col-swip').css('left', enft*2+'px')
   				} else {
   					$('.col-swip').css('left', '0px')
   				}
      })
    })
     
  }
    ionViewWillEnter(){
      let swipsize = $('.item-active').width()
      console.log('item active ', swipsize)
      $('.col-swip').css('width', swipsize)
    }
}
