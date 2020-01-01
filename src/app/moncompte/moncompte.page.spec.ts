import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoncomptePage } from './moncompte.page';

describe('MoncomptePage', () => {
  let component: MoncomptePage;
  let fixture: ComponentFixture<MoncomptePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoncomptePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoncomptePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
