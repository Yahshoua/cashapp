import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VosparisPage } from './vosparis.page';

describe('VosparisPage', () => {
  let component: VosparisPage;
  let fixture: ComponentFixture<VosparisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VosparisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VosparisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
