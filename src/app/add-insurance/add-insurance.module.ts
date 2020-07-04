import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInsurancePageRoutingModule } from './add-insurance-routing.module';

import { AddInsurancePage } from './add-insurance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInsurancePageRoutingModule
  ],
  declarations: [AddInsurancePage]
})
export class AddInsurancePageModule {}
