import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisiteprofilPage } from './visiteprofil.page';

describe('VisiteprofilPage', () => {
  let component: VisiteprofilPage;
  let fixture: ComponentFixture<VisiteprofilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteprofilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisiteprofilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
