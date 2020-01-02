import { ServerService } from './../server.service';
import { NavController, MenuController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { hamburgers } from 'hamburgers';
declare var $
@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {
  pari
  profil
  constructor(private navCtrl: NavController, private menu: MenuController, private service: ServerService,public toastController: ToastController) { }
  openmenu() {
      this.menu.enable(true, 'first');
      this.menu.open('first');
  }
  goCondition(){
    this.menu.close('first');
  }
  close() {
    $('.hamburger').removeClass('is-active')
  }
  ngOnInit() {
    this.service.parisSubscription.subscribe((e: any)=> {
      this.pari = e.filter(i=> {
        return i.id_auteur == this.service.utilisateur.data.id
      })
    })
    this.service.getparis()
    $('document').ready(function(){
        $('.hamburger').on('click', function(){
           $(this).toggleClass('is-active')
        })
    })
    this.profil = this.service.utilisateur.data
  }
  goback() {
    this.navCtrl.back({ animated: true,
      animationDirection: 'back'})
  }
}
