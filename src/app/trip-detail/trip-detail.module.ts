import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripDetailPageRoutingModule } from './trip-detail-routing.module';

import { TripDetailPage } from './trip-detail.page';
import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    IonicRatingModule ,
    CommonModule,
    FormsModule,
    IonicModule,
    TripDetailPageRoutingModule
  ],
  declarations: [TripDetailPage]
})
export class TripDetailPageModule {}
