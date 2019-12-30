import { ServerService } from './../server.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { SMS } from '@ionic-native/sms/ngx';
declare var moment
@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})
export class InvitationsPage implements OnInit {
  nom: String
  contact
  pari: any
  id
  titre
  constructor(private contacts: Contacts, private alrtCtrl: AlertController, private sms: SMS, private routes: ActivatedRoute, private service: ServerService, private toastController: ToastController) { }
  ngOnInit() {
    moment().locale('fr')
    this.id = this.routes.snapshot.params.id
    this.service.parisSubscription.subscribe((e:any)=> {
      this.pari = e.find((i)=> {
          return i.id_p == this.id
      })
    })
    this.service.getparis()
  }
  async pick() {
    
    this.contacts.pickContact().then((res: any)=> {
      console.log('voici le contatc ', res)
      this.nom = res.displayName
      this.contact = res.phoneNumbers[0].value
      this.send(this.contact)
    }).catch(err=> {
      
    })
  }
  async send(number) {
    this.nom = 'Toto'
   var dataParse = moment(this.pari.debut).format('DD MMMM YYY à HH:mm')
    var message = `En cliquant sur oui, ${this.nom} recevra un sms d\'invation de votre part à participer à ce paris `
        const alert = await this.alrtCtrl.create({
          header: 'Invitation',
          subHeader: 'Etes vous sure vouloir inviter '+ this.nom +' ?',
          message: message,
          buttons: [{
            text: 'Non',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Annulation ...')
          }
          },
          {
            text: 'Oui',
            handler: (send)=> {
              console.log('envoi du sms...');
              this.sms.send(number, 'Salut. Je t\'invite à participer au paris de '+this.pari.auteur +' appelé '+this.pari.titre+ ' qui commence le '+ dataParse +'. Télecharge Cash app sur Google Play et gagne de l\'argent si tu gagne ce pari ( plus de '+ this.pari.prix +' Fcfa)');
            }
          }
        ]
        });
        await alert.present();
        const toast = await this.toastController.create({
          message: 'Vous avez envoyé un sms à '+ this.nom,
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        toast.present();
  }
}
