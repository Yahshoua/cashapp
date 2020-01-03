import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.page.html',
  styleUrls: ['./conditions.page.scss'],
})
export class ConditionsPage implements OnInit {

  constructor(private route: NavController) { }
  gobacnk() {
    this.route.back()
  }
  ngOnInit() {
      $('#pagepilings').pagepiling({
            menu: false,
              direction: 'horizontal',
              verticalCentered: true,
              anchors: [],
              sectionsColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              scrollingSpeed: 200,
              easing: 'swing',
              css3: true,
              navigation: false,
              keyboardScrolling: false,
              sectionSelector: '.section',
              onLeave: function(index, nextIndex, direction){},
              afterLoad: function(anchorLink, index){},
              afterRender: function(){},
        });
  }
  
}
