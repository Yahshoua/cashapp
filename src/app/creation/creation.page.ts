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
  date1 =''
  date2 =''
  minFin =''
  prix =''
  description = ''
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  constructor(public navCtrl: NavController, public formBuild: FormBuilder, public toastController: ToastController, public alertController: AlertController, public service: ServerService) { }

  titre: String = ''
  messages: String
  ngOnInit() {
    moment.locale('fr');
    this.dates = moment().format("YYYY-MM-DD") 
    console.log('date ', this.dates)
     this.formPari = this.formBuild.group({
      titre: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      date1: ['', Validators.required],
      date2: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required],
      auteur: ''
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
    console.log('date1 ', this.date1 , 'date value ', this.formPari.value, 'parseDate ',moment(this.date1).format("DD-MM-YY"))
    this.minFin = moment(this.date1).format("YYYY-MM-DD")
    let messages = "Entrez la date du debut de votre paris svp !"
    const toast = await this.toastController.create({
      message: messages,
      position: 'top',
      duration: 5000,
      color: "danger"
    });
    if(this.date1.length <= 0 || this.date1.length <= 3 || this.date1 == undefined) {
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
    if(this.date2.length <= 0 || this.date2.length <= 3 || this.date2 == undefined) {
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
            $.fn.pagepiling.moveTo(6);
            console.log(this.formPari.value)
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
    this.myInput.setFocus();
  }
}
