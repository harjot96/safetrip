import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetotpPageRoutingModule } from './forgetotp-routing.module';

import { ForgetotpPage } from './forgetotp.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ForgetotpPageRoutingModule
  ],
  declarations: [ForgetotpPage]
})
export class ForgetotpPageModule {}
