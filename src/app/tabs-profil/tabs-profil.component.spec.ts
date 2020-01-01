import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsProfilComponent } from './tabs-profil.component';

describe('TabsProfilComponent', () => {
  let component: TabsProfilComponent;
  let fixture: ComponentFixture<TabsProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsProfilComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
