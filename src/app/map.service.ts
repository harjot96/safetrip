import { Injectable, ElementRef } from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { HereMapComponent } from './here-map/here-map.component';

declare var google;
declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: any;
  markers = [];
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  data: any;
  geoAddress: any;

  isgpsoff: boolean =false;

  lat: any;
  lon: any;

  isGeoReceiving = false;

  lastGeoReceivced: any; 
  mapElement: ElementRef;
  public platform: any;

  constructor(
    public nativegeocoder: NativeGeocoder,
    public diagnose: Diagnostic,
    public loader: LoadingController,
    public geolocation: Geolocation) {

      // this.platform.ready().then(() => {
      //   this.getGeolocation();

      //   setInterval(() => {
      //     if(!this.isGeoReceiving) {

      //     }
      //   }, 10000);
      // })
      this.platform = new H.service.Platform({
        "app_id": "t6BdCL6ImpbmpT4LwERh",
        "app_code": "Xvebz8e72iJHZed-lDYDeQ"
    });
      this.geoAddress=this.platform.getGeocodingService();
  }

  getAddress(query: string) {
    // this.nativegeocoder.reverseGeocode(lat, lng, this.geoencoderOptions)
    //   .then((result: any) => {
    //     this.geoAddress = this.generateAddress(result[0]);
    //     return this.geoAddress;
    //   })
    //   .catch((error: any) => {
    //     alert('Error getting location' + JSON.stringify(error));
    //   });
    return new Promise((resolve, reject) => {
      this.geoAddress.geocode({ searchText: query }, result => {
          if(result.Response.View.length > 0) {
              if(result.Response.View[0].Result.length > 0) {
                console.log(result);
                
                  resolve(result.Response.View[0].Result);
              } else {
                  reject({ message: "no results found" });
              }
          } else {
              reject({ message: "no results found" });
          }
      }, error => {
          reject(error);
      });
  });
  }

  // generateAddress(addressObj) {
  //   let obj = [];
  //   let address = "";
  //   for (let key in addressObj) {
  //     obj.push(addressObj[key]);
  //   }
  //   obj.reverse();
  //   for (let val in obj) {
  //     if (obj[val].length)
  //       address += obj[val] + ', ';
  //   }
  //   return address.slice(0, -2);
  // }

  // checkLocation() {
  //   this.diagnose.getLocationMode()
  //     .then((state) => {
  //       if (state == this.diagnose.locationMode.LOCATION_OFF) {
  //         this.isgpsoff = true;
  //       }
  //     })
  // }

  getGeolocation() {
   return this.geolocation.getCurrentPosition().then((res) => {
      console.log("getGeolocation", res);
      this.lat = res.coords.latitude;
      this.lon = res.coords.longitude;
      this.lastGeoReceivced = moment();
    });

  }

  // load(mapElement) {
  //   this.mapElement =  mapElement;
  //   console.log(this.mapElement);
  //   this.getGeolocation();
  // }


  // loadMap() {
  //   console.log(this.lat, this.lon);
  //   let latLng = new google.maps.LatLng(parseFloat(this.lat), parseFloat(this.lon));
  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     disableDefaultUI: true
  //   }
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //   this.addMarker(this.map);
  // }

  // addMarker(map: any) {
  //   var iconBase = 'https://img.icons8.com/color/48/000000/';
  //   let marker = new google.maps.Marker({
  //     icon: iconBase + 'map-pin.png',
  //     map: map,
  //     animation: google.maps.Animation.DROP,
  //     position: map.getCenter()
  //   });

  //   var circle = new google.maps.Circle({
  //     map: this.map,
  //     radius: 165,    // 10 miles in metres
  //     fillColor: '#FF6600',
  //     fillOpacity: 0.3,
  //     strokeColor: "#FFF",
  //     strokeWeight: 0,
  //   });

  //   circle.bindTo('center', marker, 'position');

  // }

}
