import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitprofilPage } from './visitprofil.page';

describe('VisitprofilPage', () => {
  let component: VisitprofilPage;
  let fixture: ComponentFixture<VisitprofilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitprofilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitprofilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
