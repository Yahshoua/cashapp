import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllparisPage } from './allparis.page';

describe('AllparisPage', () => {
  let component: AllparisPage;
  let fixture: ComponentFixture<AllparisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllparisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllparisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
