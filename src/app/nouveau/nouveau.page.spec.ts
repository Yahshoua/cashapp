import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NouveauPage } from './nouveau.page';

describe('NouveauPage', () => {
  let component: NouveauPage;
  let fixture: ComponentFixture<NouveauPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NouveauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
