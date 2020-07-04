import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { HeremapService } from './heremap.service';

@Injectable({
  providedIn: 'root'
})
export class RouteServiceService {
  startingLat:any;
  startingLng:any;
  destinationLat:any;
  destinationLng:any;
TotalDistance:any;
totalDistance:any;
  constructor(public heremap:HeremapService) { }

saveValue(data){

}
intialLoc(data,map){
  this.startingLat=data.lat;
  this.startingLng=data.lng;
  this.heremap.setOrgin(data.lat,data.lng,map)
}
destinationLoc(data,map){
  this.destinationLat=data.lat;
  this.destinationLng=data.lon;
   this.heremap.setDestination(data.lat, data.lon,map)
    //  this.searchform.controls.to.setValue(data.title)
  }

distanceCovered(value) {
this.TotalDistance=value;
}

}
