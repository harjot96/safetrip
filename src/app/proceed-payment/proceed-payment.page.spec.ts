import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProceedPaymentPage } from './proceed-payment.page';

describe('ProceedPaymentPage', () => {
  let component: ProceedPaymentPage;
  let fixture: ComponentFixture<ProceedPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProceedPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
