import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MesparisPage } from './mesparis.page';

describe('MesparisPage', () => {
  let component: MesparisPage;
  let fixture: ComponentFixture<MesparisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesparisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MesparisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
