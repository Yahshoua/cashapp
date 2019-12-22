import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParisdetailPage } from './parisdetail.page';

describe('ParisdetailPage', () => {
  let component: ParisdetailPage;
  let fixture: ComponentFixture<ParisdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParisdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParisdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
