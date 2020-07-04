import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProceedPaymentPageRoutingModule } from './proceed-payment-routing.module';

import { ProceedPaymentPage } from './proceed-payment.page';
import { CreditcardmaskPipe } from '../creditcardmask.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProceedPaymentPageRoutingModule
  ],
    declarations: [ProceedPaymentPage]
})
export class ProceedPaymentPageModule {}
