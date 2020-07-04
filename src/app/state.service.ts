import { Injectable } from '@angular/core';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  userLocation: any = {}

  constructor(public dataService: DataServiceService) {

  }

  set(name, data) {
      this[name] = data;
      this.dataService.setLocal(name, data);
  }

  get(name) {
    if(typeof this[name] == 'undefined') {
      this[name] = this.dataService.getLocal(name);
    }
debugger    
    return this[name];
  }

  unset(name) {
    // if(name == 'all')
    // {
    //   this.dataService.clearAll();
    //   this.reset();
    // }
  }

  reset() {
    // this.user = {};
    // this.pincodes = [];

    // this.fetchingProducts = false;
    // this.productFetchRecord= {};

    // this.cartProducts = [];
    // this.wishlist = [];
    // this.save4later = [];

  }


  load(name) {
    this[name] = this.dataService.getLocal(name);
    return this[name];
  }
}