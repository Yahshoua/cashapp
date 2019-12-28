import { Injectable } from '@angular/core';
import  { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  auth: boolean
  utilisateur: any
  url = 'http://localhost/phpcashapp/setParis.php';
  url2 = 'http://localhost/phpcashapp/setUser.php';
  url3 = 'http://localhost/phpcashapp/login.php';
  url4 = 'http://localhost/phpcashapp/getallparis.php';
  header = new HttpHeaders({'Content-Type': 'application/json'})
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
  setPari(paris) {
    const req = new Promise((resolve, reject)=> {
      this.http.post(this.url, paris, {headers: this.header})
      .toPromise()
      .then(res => {
          this.paris.push(paris)
          this.getparis()
          resolve(this.paris)
      })
    })
    return req;
  }
    //requete de creation d'un nouvel user
    setUser(user) {
      const req = new Promise((resolve, reject)=> {
        this.http.post(this.url2, user, {headers: this.header})
        .toPromise()
        .then(res => {
            resolve(user)
        }).catch((err: any)=> {
           reject(err)
        })
      })
      return req;
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
    getallparis() {
      return new Promise((resolve, reject)=> {
        this.http.post(this.url4, {headers: this.header})
        .toPromise()
        .then((res: any) => {
          this.paris = res
          this.getparis()
          resolve(this.paris)
        })
      })
    }
    login(user) {
      return new Promise((resolve, reject)=> {
        this.http.post(this.url3, user, {headers: this.header})
        .toPromise()
        .then(res => {
            resolve(res)
        })
      })
    }
}
