import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AddPaymentMethodPage } from './add-payment-method/add-payment-method.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  { 
    path: 'add-payment-method',  
    loadChildren: () => import('./add-payment-method/add-payment-method.module').then(m => m.AddPaymentMethodPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
