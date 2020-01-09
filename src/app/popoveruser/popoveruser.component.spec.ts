import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoveruserComponent } from './popoveruser.component';

describe('PopoveruserComponent', () => {
  let component: PopoveruserComponent;
  let fixture: ComponentFixture<PopoveruserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoveruserComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoveruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
