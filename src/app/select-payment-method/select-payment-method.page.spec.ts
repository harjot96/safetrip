import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectPaymentMethodPage } from './select-payment-method.page';

describe('SelectPaymentMethodPage', () => {
  let component: SelectPaymentMethodPage;
  let fixture: ComponentFixture<SelectPaymentMethodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPaymentMethodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPaymentMethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
