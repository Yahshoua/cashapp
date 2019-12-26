import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaodalinscriptionPage } from './maodalinscription.page';

describe('MaodalinscriptionPage', () => {
  let component: MaodalinscriptionPage;
  let fixture: ComponentFixture<MaodalinscriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaodalinscriptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaodalinscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
