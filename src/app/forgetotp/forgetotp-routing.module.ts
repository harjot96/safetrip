import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetotpPage } from './forgetotp.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetotpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetotpPageRoutingModule {}
