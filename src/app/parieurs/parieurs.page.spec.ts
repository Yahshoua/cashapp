import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParieursPage } from './parieurs.page';

describe('ParieursPage', () => {
  let component: ParieursPage;
  let fixture: ComponentFixture<ParieursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParieursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParieursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
