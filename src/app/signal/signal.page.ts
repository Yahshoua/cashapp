import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.page.html',
  styleUrls: ['./signal.page.scss'],
})
export class SignalPage implements OnInit {
  nom
  constructor(private routes: ActivatedRoute ) { }

  ngOnInit() {
    this.nom = this.routes.snapshot.queryParams.nom
  }

}
