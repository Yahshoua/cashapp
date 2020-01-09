import { ServerService } from './../server.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-demande',
  templateUrl: './demande.page.html',
  styleUrls: ['./demande.page.scss'],
})
export class DemandePage implements OnInit {
  profil: any
  paris: any
  user: any
  demande: Boolean
  allusers
  follow
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private service: ServerService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.user = this.service.utilisateur.data
      this.service.allusersubscription.subscribe((p: any)=> {
          this.allusers= p
      })
      this.service.getuserSubcription()
     
    this.profil = JSON.parse(this.route.snapshot.queryParams.profil)
    if(this.route.snapshot.queryParams.paris !== undefined) {
      this.paris = JSON.parse(this.route.snapshot.queryParams.paris)
      console.log('profil ', this.profil, 'paris ', this.paris)

      let findme = this.paris.participants.find(e=> {
          return e.id_part == this.profil.id_exp
      })
      console.log('findme ', findme)
      this.demande = findme.statu == 1?false:true
    }
      //Recupe de tous les users
    const q = this.allusers.find(res=> {
        return res.id == this.user.id
    })
    const follower = q.followers.find(p=> {
      return p.id == this.profil.id_exp
    })
    console.log('le followers ', follower)
    if(follower == undefined) {
        this.follow = false
    } else {
      this.follow = true
    }
    // fin
    $(document).ready(function(){
      var h1 = $('.myblock').height()
      var h2 = $('.heads').height()
      var height = 100 - ($('app-demande').height() - h2)
     // $('.col-info').css({'height': height +'%'})
      console.log('height ', height)
      
    })
  }
  follows () {
    this.follow = !this.follow
    this.service.follow(this.profil.id_exp, this.user.id)
  }
  reponse(rep) {
    this.service.responseParieur(undefined, undefined, this.paris.id_p, rep).then(async (res: any)=> {
      console.log('reponse ', res)
      if (res.response == 'participant ajoué !') {
              const toast = await this.toastCtrl.create({
              message: `Vous avez accepté ${this.profil.nom} à votre Pari !` ,
              duration: 5000,
              position: 'top'
            });
          toast.present();
      } else if(res.response=='supprimé !') {
        const toast = await this.toastCtrl.create({
          message: `Vous avez rejeté ${this.profil.nom} à votre Pari !` ,
          duration: 5000,
          position: 'top'
        });
      toast.present();
      } else if(res.response == 'followers add') {
        const toast = await this.toastCtrl.create({
          message: `Vous avez commencé à suivre ${this.profil.nom}` ,
          duration: 5000,
          position: 'top'
        });
      toast.present();
      }
      
    })
    this.demande = false
  }
  getNumero(numero) {
    if(numero=='' || numero == undefined) {
      let texte = `${this.profil.nom} n 'a pas donné son numéro`
      return  texte
    } else {
      return numero
    }
  }
  myText() {
    if(this.demande == true) {
      return this.profil.nom+" souhaite participer à ton paris <span style=font-family:Oswald>"+ this.paris.titre+"</span>"
    } else {
        if(this.follow == true) {
          return "Vous suivez dèjà "+this.profil.nom
        } else {
          return "Souhaitez-vous suivre "+this.profil.nom +" ?"
        }
    }
    
  }
  goChat() {
    this.navCtrl.navigateForward(['chat'], {queryParams: {'profil': JSON.stringify(this.profil), 'user': JSON.stringify(this.user)}})
  }
}
