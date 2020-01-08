import { Injectable } from '@angular/core';
import  { Subject, from } from 'rxjs';
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
  url7 = this.server2+'/phpcashapp/getNotification.php';
  url8 = this.server2+'/phpcashapp/pusher.php';
  url9 = this.server2+'/phpcashapp/getChat.php';
  url10 = this.server2+'/phpcashapp/setChat.php';
  url11 = this.server2+'/phpcashapp/changeEtatNotification.php';
  // option = new RequestOptions();
  header = new HttpHeaders({'Content-Type': 'application/json', "Accept": 'application/json'})
  constructor(public http: HttpClient) {
  }
  // private paris=[]
  public paris = []
  parisSubscription = new Subject();
  canBetSubscription = new Subject();
  badgeSubscription = new Subject();
  notifSubscriber = new Subject();
  notifications: any
  chatSubscription = new Subject()
  chat = []
  badgeUser

  getChatSubsciption() {
    this.chatSubscription.next(this.chat)
  }
  getNotif() {
    this.notifSubscriber.next(this.notifications)
  }
  getBadge() {
    this.badgeSubscription.next(this.badgeUser)
  }
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
    
   getChat(idExp, idRecp) {
     return new Promise((resolve, reject)=> {
        $.ajax({
            method: 'POST',
            url: this.url9,
            dataType: 'json',
            data: {Exp: idExp, Recep: idRecp},
            success: (res)=>{
              this.chat = res
              this.getChatSubsciption()
              resolve(res)
            },
            error: (err)=> {
                reject("Une erreur s'est passé durant la requete du chat de recuperation du chat "+ err)
            }
          })
     })
       
  }
  changeEtat(id) {
    $.post(this.url11, {'id': id}).done(function(){
        console.log('l\'etat a été changé avec succès !')
    })
    for(var i=0;i<this.notifications;i++) {
      if(this.notifications[i]==id) {
        this.notifications[i].etat=1
        break
      }
    }
    this.getNotif()
    console.log('noooo ', this.notifications)
  }
  setChat(idExp, idRecep, message, dates, chaine,nom, photo, token, senderName, chaine2, dateMoment) {
      $.ajax({
        method: 'POST',
        url: this.url10,
        dataType: 'json',
        data: {'idExp': idExp, 'idRecep': idRecep, 'message': message, 'dates': dates, 'chaine': chaine, 'nom': nom, 'photo': photo, 'chaineRecep': chaine2, 'dateMoment': dateMoment},
        success: (res)=>{
          console.log('message envoyé avec success ! ', res)
          this.sendNotification(token, 'Message de '+nom, senderName+', vous avez reçu un message de '+nom)
        },
        error: (err)=> {
            console.error("Une erreur s'est passé durant la requete du chat de recuperation du chat "+ err)
        }
      })
  }
  sendNotification(token, titre, description) {
    let key="AAAAeNM_Aek:APA91bGwSDIqncH7GHoJxKoLP8iq5OBxkxzO5eO2PJVvlvAraZ8IE7ffUcDw8yelPK94bGvQI57LUXHTaDUEVBe2PfKzE2eajvHC5A8Ssz69ZfecAxNJXtgsC_D5ddkob9vKYkRY8NOh";
    $.ajax({        
      type : 'POST',
      url : "https://fcm.googleapis.com/fcm/send",
      headers : {
          Authorization : 'key=' + key
      },
      contentType : 'application/json',
      dataType: 'json',
      data: JSON.stringify({"to": token, "priority": "high", "notification": {"title":titre,"body":description, "forceStart": "1"}}),
      success : function(response) {
          console.log(response);
      },
      error : function(xhr, status, error) {
          console.log(xhr.error);                   
      }
  });
}
  setPusher() {
    $.ajax({
      method: 'POST',
      url: this.url8,
      data: {'data': 'salut toi'}
    }).done(res=> {
      console.log('success ', res)
    }).fail(err=> {
        console.log('erreur pusher ', err)
    })
  }
     updateRegistration(senderID) {
        return new Promise((resolve, reject)=> {
            $.ajax({
                method: 'POST',
                url: 'https://kazimo.ga/cashapp/phpcashapp/registration.php',
                dataType: 'json',
                data: {registration: senderID, user: this.utilisateur.data.id}
            }).done(res=> {
              resolve(res)
            }).fail(err=> {
              reject('erreur '+ err)
            })
        })
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
      let data = JSON.parse(res)
      let monpari = data[0]
      monpari.participants = []
      this.paris.push(monpari)
      this.paris = this.paris.sort((a, b)=> {
        if (a.id_p < b.id_p ) {
        return 1;
          }
          if (a.id_p > b.id_p ) {
            return -1;
          }
          return 0;
      })
      this.getparis()
      console.log('le paris ', this.paris , 'resultat ', data)
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
    // MAJ des notifs
    setNotifications(notifs) {
      this.notifications = notifs
      this.getNotif()
    }
    // Recuperation des notifications
    getNotification() {
      let id = this.utilisateur.data.id
      let chaine = this.utilisateur.data.chaine_notif
      return new Promise((resolve, reject)=> {
          $.ajax({
              method: "POST",
              url: this.url10,
              dataType: 'json',
              data: {'id_user': id, 'chaine': chaine}
          }).done(rs=> {
            this.notifications = rs.notifications
            resolve(rs)
          }).fail(err=> {
            reject('une erreur est arrivée durant la recuperation des notifications '+ err)
            this.notifications = []
          })
      })
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
    async badge(pari) {
      console.log('le pariii ', pari)
        let e = pari.participants.find((e: any)=> {
        let i = e.id_part ==  this.utilisateur.data.id? true : false
        this.badgeUser = i
        this.getBadge()
       return i
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
    async setParieur(user, id, date, token) {
      user.id_pari = id
      user.date = date
      user.statu = '0'
      for(var i=0;i <this.paris.length;i++) {
        if(this.paris[i].id_p == id) {
          this.paris[i].participants.status = 0
          this.paris[i].participants.push(user)
          break
        }
      }
      this.getparis()
      this.badgeUser = true
      this.getBadge()
      return new Promise((res, rej)=> {
            const req= $.ajax({
              method: 'POST',
              url: this.url5,
              data: user
            }).done(e=> {
              this.sendNotification(token,'Paticipation', user.nom+' veut participer à ton paris')
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
