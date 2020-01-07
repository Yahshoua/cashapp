import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
declare var moment, $
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notification: any
  //signifit un tableau de chaine
  week: Array<string> = []
  month: Array<string> = []
  url
  constructor(private service: ServerService,private navCtrl: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.week = []
    this.month = []
    this.url = this.route.snapshot.queryParams.url
      moment.locale('fr')
      moment.updateLocale('fr', {
        relativeTime : {
          future: "%s dans",
          past:   "%s ",
          s: function (number, withoutSuffix, key, isFuture){
              return '00:' + (number<10 ? '0':'') + number + ' mins';
          },
          m:  "01:00 minutes",
          mm: function (number, withoutSuffix, key, isFuture){
              return (number<10 ? '0':'') + number + ':00' + ' mins';
          },
          h:  "1 h",
          hh: "%d h",
          d:  "1 jr",
          dd: "%d jrs",
          M:  "1 mois",
          MM: "%d mois",
          y:  "1 an",
          yy: "%d ans"
        }
    });
            this.notification = this.service.notifications
            for(var i=0;i<this.notification.length;i++) {
              var dates = moment(this.notification[i].createdAt).format('YYYY, MMMM, DDDD')
              var today= moment().format('YYYY, MMMM, DD')
              var relative = moment(this.notification[i].createdAt).fromNow()
              this.notification[i].relative = relative
              var a = moment([today]);
              var b = moment([dates]);
              var diff = a.diff(b, 'days')
              if(diff <=7) {
                this.week.push(this.notification[i])
              } else {
                this.month.push(this.notification[i])
              }
            }
            console.log('les notifs ', this.notification, 'les weeks ', this.week)
  }

  goTovist(id) {
    this.navCtrl.navigateForward(['visitprofil'], {queryParams: {'idpari': id}})
  }
  goback() {
    this.navCtrl.navigateBack(this.url, { animated: true,
      animationDirection: 'back'})
  }
  ngAfterViewInit() {
}
goProfiler(id, idpari) {
  this.navCtrl.navigateForward(['visitprofil'], {queryParams: {'id': id, 'idpari': idpari}})
}
}
