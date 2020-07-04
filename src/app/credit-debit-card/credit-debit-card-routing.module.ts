import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditDebitCardPage } from './credit-debit-card.page';

const routes: Routes = [
  {
    path: '',
    component: CreditDebitCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditDebitCardPageRoutingModule {}
