import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayRidePage } from './pay-ride.page';

describe('PayRidePage', () => {
  let component: PayRidePage;
  let fixture: ComponentFixture<PayRidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayRidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
