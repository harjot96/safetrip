import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditDebitCardPageRoutingModule } from './credit-debit-card-routing.module';

import { CreditDebitCardPage } from './credit-debit-card.page';
import { LiIonic4DatepickerDirective } from '@logisticinfotech/ionic4-datepicker/lib/li-ionic4-datepicker.directive';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    
    CreditDebitCardPageRoutingModule
  ],
  declarations: [CreditDebitCardPage]
})
export class CreditDebitCardPageModule {}
