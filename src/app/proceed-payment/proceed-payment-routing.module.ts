import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProceedPaymentPage } from './proceed-payment.page';

const routes: Routes = [
  {
    path: '',
    component: ProceedPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProceedPaymentPageRoutingModule {}
