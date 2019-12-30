import { ServerService } from './../server.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var moment
@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {
  id
  pari
 badge: Boolean
  constructor(public route: ActivatedRoute, public service: ServerService) { }

  ngOnInit() {
    moment.locale('fr')
    let id = this.route.snapshot.queryParams.id
    console.log(this.route.snapshot)
    this.id = id
    this.service.parisSubscription.subscribe((e:any)=> {
      this.pari = e.find((i)=> {
          return i.id_p == id
      })
    
    
    })
    this.service.getparis()
    console.log('paris current ', this.pari)
    var e = this.pari.participants.filter(e=> {
      console.log('id partic', this.service.utilisateur.data)
      this.badge = parseInt(e.id_part) ==  this.service.utilisateur.data.id?true: false
   })
    console.log('checking...', e)
  }
    
  timer(date) {
    var m = moment(date).format("YYYYMMDDhmmssa")
     return moment(m, "YYYYMMDDhmmssa").fromNow();
  }
}
