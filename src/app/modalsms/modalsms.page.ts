import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalsms',
  templateUrl: './modalsms.page.html',
  styleUrls: ['./modalsms.page.scss'],
})
export class ModalsmsPage implements OnInit {
  code
  timer = 30
  temps
  resend: Boolean
  numero
  indicatif
  constructor(private navParam: NavParams, private navCtrl: NavController, public loadingController: LoadingController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.numero = this.navParam.get('numero')
    this.indicatif = this.navParam.get('indicatif')
    console.log('numero ', this.numero, ' ind ', this.indicatif)
    this.generatCode()
  }

  generatCode() {
    this.code = 1 * Math.floor(Math.random() * 90000) + 10000
    var xhr = new XMLHttpRequest();
          var numero = this.indicatif
           numero += this.numero
           console.log('le numero envoyé ', numero)
					var xhr = new XMLHttpRequest();
					xhr.open("GET", "https://platform.clickatell.com/messages/http/send?apiKey=wZVF4h99RBKJM1CeNLDBWQ==&to="+numero+"&content="+this.code, true);
					xhr.onreadystatechange = function(){
					    if (xhr.readyState == 4 && xhr.status == 200) {
					        console.log('success');
					    }
					};
					xhr.send();
   
    console.log('code ', this.code)
    this.countdown()
  }
  countdown() {
  this.resend = false
   this.temps =  setInterval(()=> {
        this.timer --
        if(this.timer == 0) this.clearCountdown()
    }, 1000)
  }
  clearCountdown() {
    clearInterval(this.temps)
    this.resend = true
    this.timer = 30
  }
  resends() {
    this.generatCode()
    console.log('nouveau code ', this.code)
  }
  goback(res) {
    this. clearCountdown()
    this.modalCtrl.dismiss({
      component : [ModalsmsPage],
      componentProps: {'etat': res},
      'dismissed': true
    });
  }
  async type() {
    let text = event.detail.target.value
    console.log('type ', text)
    if(text == this.code && this.resend == false) {
      this.clearCountdown()
      const loading = await this.loadingController.create({
        message: 'Code accepté !',
        duration: 3000
      });
      await loading.present();
      loading.onDidDismiss().then(e=> {
        console.log('fermeture !')
        this.goback(true)
      })
    }
  }
}
