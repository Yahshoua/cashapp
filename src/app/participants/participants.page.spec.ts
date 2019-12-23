import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParticipantsPage } from './participants.page';

describe('ParticipantsPage', () => {
  let component: ParticipantsPage;
  let fixture: ComponentFixture<ParticipantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
