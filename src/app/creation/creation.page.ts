import { ServerService } from './../server.service';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $, moment
@Component({
  selector: 'app-creation',
  templateUrl: './creation.page.html',
  styleUrls: ['./creation.page.scss'],
})
export class CreationPage implements OnInit {
  @ViewChild('myInput', {static: true}) myInput;
  formPari: FormGroup;
  customPickerOptions: any;
  dates
  debut =''
  fin =''
  minFin =''
  prix =''
  description = ''
  utilisateur: any
  formulaire: any
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  constructor(public navCtrl: NavController, public formBuild: FormBuilder, public toastController: ToastController, public alertController: AlertController, public service: ServerService) { }

  titre: String = ''
  messages: String
  ngOnInit() {
    this.dates = moment().format("YYYY-MM-DD") 
    console.log('date ', this.dates)
     this.formPari = this.formBuild.group({
      titre: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      debut: ['', Validators.required],
      fin: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required]
    })
    $('#pagepiling').pagepiling({
      direction: 'horizontal',
      navigation: false,
      scrollingSpeed: 300,
      keyboardScrolling: false,
      sectionsColor: ['#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2']
    });
    $.fn.pagepiling.setAllowScrolling(false);
  }
  async next2() {
    console.log('debut ', this.debut , 'date value ', this.formPari.value, 'parseDate ',moment(this.debut).format("DD-MM-YY"))
    this.minFin = moment(this.debut).format("YYYY-MM-DD")
    let messages = "Entrez la date du debut de votre paris svp !"
    const toast = await this.toastController.create({
      message: messages,
      position: 'top',
      duration: 5000,
      color: "danger"
    });
    if(this.debut.length <= 0 || this.debut.length <= 3 || this.debut == undefined) {
      toast.present();
          } else {
          $.fn.pagepiling.moveTo(3);
      }
  }
  async next3() {
    let messages = "Entrez la date de fin du paris svp !"
    const toast = await this.toastController.create({
      message: messages,
      position: 'top',
      duration: 5000,
      color: "danger"
    });
    if(this.fin.length <= 0 || this.fin.length <= 3 || this.fin == undefined) {
      toast.present();
          } else {
          $.fn.pagepiling.moveTo(4);
      }
  }
  async next4() {
    let messages = "Entrez le prix du gagnant !"
    const toast = await this.toastController.create({
      message: messages,
      position: 'top',
      duration: 5000,
      color: "danger"
    });
    if(this.prix.length <= 0 || this.prix.length <= 3 || this.prix == undefined) {
      toast.present();
          } else {
          $.fn.pagepiling.moveTo(5);
      }
  }
  async next5() {
    let messages = "Decrivez en quelques mots votre pari"
    //Toast
    const toast = await this.toastController.create({
      message: messages,
      position: 'top',
      duration: 5000,
      color: "danger"
    });
    //fin
    // alert
    const alert = await this.alertController.create({
      header: 'Oups !',
      message: 'Une erreur inconnu s\'est produite !',
      buttons: ['OK']
    });
    // fin
    if(this.description.length <= 0 || this.description.length <= 3 || this.description == undefined) {
      toast.present();
          } else {
            moment.locale('fr');
            var date = moment().format('YYYYMMDDhmmssa')
            // moment date relative
            var relatif = moment(date, "YYYYMMDDhmmssa").fromNow();
            // parsing date
            var date1 = moment(this.formPari.value.debut).format('DD-MM-YYYY')
            var date2 = moment(this.formPari.value.fin).format('DD-MM-YYYY')
            console.log('date debut parsé ', date1)
            $.fn.pagepiling.moveTo(6);
            console.log(this.formPari.value)
            this.formulaire = this.formPari
            this.formulaire.value.id = this.utilisateur.id
            this.formulaire.value.auteur = this.utilisateur.nom
            this.formulaire.value.date1 = date1
            this.formulaire.value.date2 = date2
            this.formulaire.value.status = 'en cours'
            this.formulaire.value.createdAt= moment().format('Do MMMM YYYY à HH:mm:ss')
            this.formulaire.value.profil = this.utilisateur.photo
            this.formulaire.value.dateBrut = date
            var tab = []
            this.formulaire.value.participants = tab
            console.log('formulaire à send ', this.formulaire.value)
            this.service.setPari(this.formPari.value).then((res:any)=> {
              console.log('resultait ', res)
            }).catch(async(err)=> {
              console.log('erreur ', err)
              await alert.present();
            })
      }
  }
  async next1() {
    console.log(this.titre)
    console.log(this.myInput)
    let messages = this.titre.length <=0? 'Indiquez le titre svp': "votre texte est trop court"
    const toast = await this.toastController.create({
      message: messages,
      position: 'top',
      duration: 3000,
      color: "danger"
    });
    
    if(this.titre.length <= 0 || this.titre.length <= 3 || this.titre == undefined) {
          toast.present();
    } else {
      $.fn.pagepiling.moveTo(2);
    }
  }
  goback() {
    this.navCtrl.back({ animated: true,
      animationDirection: 'back'})
  }
  ionViewWillEnter(){
    moment.locale('fr');
    this.myInput.setFocus();
    this.utilisateur = this.service.utilisateur.data
    console.log('tu es ', this.utilisateur, ' ton nom est ', this.utilisateur.nom)
  }
}
