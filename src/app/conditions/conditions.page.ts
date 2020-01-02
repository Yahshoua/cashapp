import { Component, OnInit } from '@angular/core';
declare var $
@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.page.html',
  styleUrls: ['./conditions.page.scss'],
})
export class ConditionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
      $('#pagepilings').pagepiling({
            menu: false,
              direction: 'horizontal',
              verticalCentered: true,
              anchors: [],
              sectionsColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              scrollingSpeed: 200,
              easing: 'swing',
              loopBottom: false,
              loopTop: false,
              css3: true,
              navigation: false,
              normalScrollElements: null,
              normalScrollElementTouchThreshold: 5,
              touchSensitivity: 5,
              keyboardScrolling: false,
              sectionSelector: '.section',
              animateAnchor: false,
          onLeave: function(index, nextIndex, direction){},
          afterLoad: function(anchorLink, index){},
          afterRender: function(){},
        });
        $.fn.pagepiling.setScrollingSpeed(300);
  }
  
}
