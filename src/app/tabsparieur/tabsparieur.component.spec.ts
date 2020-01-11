import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsparieurComponent } from './tabsparieur.component';

describe('TabsparieurComponent', () => {
  let component: TabsparieurComponent;
  let fixture: ComponentFixture<TabsparieurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsparieurComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsparieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
