import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.page.html',
  styleUrls: ['./explorer.page.scss'],
})
export class ExplorerPage implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(()=> {
      var img1 = document.getElementById('img1')
      console.log('img ', $(img1))
    })
  }

}
