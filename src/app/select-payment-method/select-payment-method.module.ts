import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SelectPaymentMethodPageRoutingModule } from './select-payment-method-routing.module';

import { SelectPaymentMethodPage } from './select-payment-method.page';
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    ReactiveFormsModule,
    
    SelectPaymentMethodPageRoutingModule
  ],
  declarations: [SelectPaymentMethodPage]
})
export class SelectPaymentMethodPageModule {}
