import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpSectionPage } from './help-section.page';

const routes: Routes = [
  {
    path: '',
    component: HelpSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpSectionPageRoutingModule {}
