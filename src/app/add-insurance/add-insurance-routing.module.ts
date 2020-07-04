import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInsurancePage } from './add-insurance.page';

const routes: Routes = [
  {
    path: '',
    component: AddInsurancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInsurancePageRoutingModule {}
