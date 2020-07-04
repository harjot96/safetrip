import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideHistoryPageRoutingModule } from './ride-history-routing.module';

import { RideHistoryPage } from './ride-history.page';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideHistoryPageRoutingModule
  ],
  declarations: [RideHistoryPage,TimeAgoPipe]
})
export class RideHistoryPageModule {}
