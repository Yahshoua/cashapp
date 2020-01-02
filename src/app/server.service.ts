import { Injectable } from '@angular/core';
import  { Subject } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
declare var $
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})

export class ServerService {
  auth: boolean
  utilisateur: any
  canBet: Boolean
  server1 = 'http://localhost'
  server2= 'https://kazimo.ga/cashapp'
  url = this.server2+'/phpcashapp/setParis.php';
  url2 = this.server2+'/phpcashapp/setUser.php';
  url3 = this.server2+'/phpcashapp/login.php';
  url4 = this.server2+'/phpcashapp/getallparis.php';
  url5 = this.server2+'/phpcashapp/setParieur.php';
  url6 = this.server2+'/phpcashapp/updatePari.php';
  header = new HttpHeaders({'Content-Type': 'application/json', "Accept": 'application/json'})
  constructor(public http: HttpClient) {
  }
  // private paris=[]
  private paris = []
  parisSubscription = new Subject();
  canBetSubscription = new Subject()
  getparis() {
    this.parisSubscription.next(this.paris)
  }
  getCanBet() {
    this.canBetSubscription.next(this.canBet)
  }
  changeCanbet() {
    this.canBet = true
    this.getCanBet()
  }
  sutoto() {
    this.getparis()
  }
  //requete de creation d'un nouveau pari
  async setPari(paris) {
    let p = $.ajax({
      url: this.url,
      type: 'POST',
      data: paris
    }).done(res=> {
      this.paris.push(paris)
      this.getparis()
      return this.paris
    })
    return await p;
  }
    //requete de creation d'un nouvel user
    async setUser(user) {
      let k = $.ajax({
        method: 'POST',
        url: this.url2,
        data: user
      })
      return await k
    }
    setStorage(user) {
      return new Promise((resolve, reject)=> {
          let log = JSON.parse(localStorage.getItem('user')) || []
          localStorage.setItem('user', JSON.stringify(user))
          this.utilisateur = JSON.parse(localStorage.getItem('user'))
          this.auth = true
          resolve(this.utilisateur)
      }).catch(reject=> {
        alert("une erreur s'est produit "+reject)
      })
    }
    getStorageUser() {
      let user = JSON.parse(localStorage.getItem('user')) || []
      user.length <=0? this.auth= false:this.auth = true
      this.utilisateur = user
      return {
            user: this.utilisateur,
            auth: this.auth
      }
    }
    // Requete pour ajouter un nouveau parieur en BDD
    async setParieur(user, id, date) {
      user.id_pari = id
      user.date = date
      for(var i=0;i <this.paris.length;i++) {
        if(this.paris[i].id_p == id) {
          this.paris[i].participants.push(user)
          break
        }
      }
      this.getparis()
      return new Promise((res, rej)=> {
            const req= $.ajax({
              method: 'POST',
              url: this.url5,
              data: user
            }).done(e=> {
              console.log('envoie reussi...')
            }).fail(err=> {
              console.log('erreur lors de l\'envoie', err)
            })
          return res(req)
      })
  }

   async getallparis() {
      const req= $.ajax({
        method: 'POST',
        url: this.url4
      }).done(e=> {
       // console.log('voila voila ', e)
      let p  = JSON.parse(e)
      this.paris = p.sort((a, b)=> {
            if (a.id_p < b.id_p ) {
            return 1;
          }
          if (a.id_p > b.id_p ) {
            return -1;
          }
          return 0;
      })
        this.getparis()
      }).fail(err=> {
        console.log('erreur ', err)
      })
      return await req
    }
    updatepari(newValue) {
       for(var i=0;i<this.paris.length;i++) {
         console.log('paris ', this.paris[i].id)
         if(this.paris[i].id_p== newValue.idPari) {
           console.log('trouvé ')
           this.paris[i].visible= newValue.visible
           this.paris[i].voirnum= newValue.voirnum
           this.paris[i].noti_invit= newValue.noti_invit
           this.paris[i].nbparticipant= newValue.nbparticipant
           this.paris[i].invitation= newValue.invitation
           break
         }
       }
       this.getparis()
       $.ajax({
         method: 'POST',
         url: this.url6,
         data: newValue,
         dataType: 'json',
         success: function(res) {
           console.log('mise-à-jour effectuées ', res)
         },
         error: function(err) {
            console.log('une erreur s\'est produite durant l\envoie ', err)
         }
       })
    }
    async login(user) {
      let req = $.ajax({
        method: 'POST',
        url: this.url3,
        data: user
          }).done((res: any)=> {

            }).fail(err=> {
      })
      return await (req)
    }
}
