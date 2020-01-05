import { ServerService } from './../server.service';
import { AlertController, ToastController, NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var moment
@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.page.html',
  styleUrls: ['./opinion.page.scss'],
})
export class OpinionPage implements OnInit {
  formOp: FormGroup
  @Input() idPari: any;
  @Input() canMacth: Boolean
  id
  auteur
  participation
  op: any
  constructor(private formBuild: FormBuilder, private toastCtrl: ToastController, private navParam: NavParams, private service: ServerService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.id = this.navParam.get('idPari');
    this.auteur = this.navParam.get('auteur')
    this.participation = this.navParam.get('participation')
    this.formOp = this.formBuild.group({
      opinion: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
    })
  }
  async sender(form) {
      if(this.formOp.status == "INVALID") {
        const toast = await this.toastCtrl.create({
          message: 'Vous n\'avez rien proposer ! ',
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        });
      toast.present();
      return
      }
      this.setParieur(form)
  }
  async setParieur(opinion) {
    const toast = await this.toastCtrl.create({
      message:`Vous avez pariez ! ${this.auteur} examinera votre votre demande avant de vous ajouter à son paris`,
      duration: 7000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
    var date = moment().format()
    this.op = opinion
    this.op.status = 0
    this.service.utilisateur.data.opinion = this.op.value.opinion
    this.service.utilisateur.data.status = this.op.value.status
    this.service.setParieur(this.service.utilisateur.data, parseInt(this.id), date).then((e)=> {
      console.log('dismissed !')
      this.canMacth= true
      this.service.changeCanbet()
      this.modalCtrl.dismiss({
        component : OpinionPage,
        'dismissed': true,
        componentProps: {
          'closed': this.id
        }
      });
    })
  }
}
