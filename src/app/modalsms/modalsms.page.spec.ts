import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalsmsPage } from './modalsms.page';

describe('ModalsmsPage', () => {
  let component: ModalsmsPage;
  let fixture: ComponentFixture<ModalsmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalsmsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalsmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
