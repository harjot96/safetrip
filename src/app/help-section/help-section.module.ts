import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpSectionPageRoutingModule } from './help-section-routing.module';

import { HelpSectionPage } from './help-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpSectionPageRoutingModule
  ],
  declarations: [HelpSectionPage]
})
export class HelpSectionPageModule {}
