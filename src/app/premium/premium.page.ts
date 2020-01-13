import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.page.html',
  styleUrls: ['./premium.page.scss'],
})
export class PremiumPage implements OnInit {
  badge
  constructor(private service: ServerService) { }

  ngOnInit() {
    this.badge = this.service.utilisateur.data.badge
  }

}
