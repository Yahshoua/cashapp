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
  server1 = 'http://localhost'
  server2= 'https://kazimo.ga/cashapp'
  url = this.server2+'/phpcashapp/setParis.php';
  url2 = this.server2+'/phpcashapp/setUser.php';
  url3 = this.server2+'/phpcashapp/login.php';
  url4 = this.server2+'/phpcashapp/getallparis.php';
  url5 = this.server2+'/phpcashapp/setParieur.php';
  header = new HttpHeaders({'Content-Type': 'application/json', "Accept": 'application/json'})
  constructor(public http: HttpClient) {
  }
  // private paris=[]
  private paris = []
  parisSubscription = new Subject();
  getparis() {
    this.parisSubscription.next(this.paris)
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
    setParieur(user, id, date) {
      user.id_pari = id
      user.date = date
      const req= $.ajax({
        method: 'POST',
        url: this.url5,
        data: user
      }).done(e=> {
        console.log('envoie reussi...')
      }).fail(err=> {
        console.log('erreur lors de l\'envoie', err)
      })
    
      for(var i=0;i <this.paris.length;i++) {
        if(this.paris[i].id_p == id) {
          this.paris[i].participants.push(user)
          break
        }
      }
      this.getparis()
  }

   async getallparis() {
      const req= $.ajax({
        method: 'POST',
        url: this.url4
      }).done(e=> {
       // console.log('voila voila ', e)
        this.paris = JSON.parse(e)
        this.getparis()
      }).fail(err=> {
        console.log('erreur ', err)
      })
      return await req
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
