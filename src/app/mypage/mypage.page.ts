import { ActivatedRoute } from '@angular/router';
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
  url
  alluser
  constructor(private navCtrl: NavController, private menu: MenuController, private service: ServerService,public toastController: ToastController, private route: ActivatedRoute) { }
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
    this.alluser = this.service.allusers
    console.log('alluser ', this.alluser)
    this.url = this.route.snapshot.queryParams.url
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
    this.navCtrl.navigateBack(this.url, { animated: true,
      animationDirection: 'back'})
  }
  logout() {
      this.service.logout()
      setTimeout(()=> {
          this.navCtrl.navigateBack(['home'])
      }, 1000)
  }
  getFollowme() {
    var q = []
     var users: any = this.alluser.filter(e=> {
        return e.id !== this.profil.id || []
      })
     for(var i=0;i<users.length;i++) {
        if(users[i].followers.id == this.profil.id) {
          q.push(users[i])
        }
     }
     return q.length
  }
  getFollowus() {
    var q = []
    var users: any = this.alluser.find(e=> {
       return e.id == this.profil.id
     })
     console.log('qqqq ', users)
     q = users.followers

    return q.length
  }
}
