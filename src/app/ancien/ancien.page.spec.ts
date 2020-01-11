import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AncienPage } from './ancien.page';

describe('AncienPage', () => {
  let component: AncienPage;
  let fixture: ComponentFixture<AncienPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AncienPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AncienPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
