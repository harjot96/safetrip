import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { Observable } from 'rxjs';
import { HeremapService } from './heremap.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocationProviderService {
  latlng: any;
  geoWatch: any;
  geoWatchLive: boolean = false;

  latitude: any = 0;
  longitude: any = 0;
  accuracy: any;
  speed: any;
  
  isLocationAuthorized: boolean = false;
  isLocationAvailable: boolean = false;
  isLocationEnabled: boolean = false;
  locationAccuracyCanReq: boolean = false;
  constructor(
    public platform: Platform,
    public diagnostic: Diagnostic,
    public locationAccuracy: LocationAccuracy,
    public openNativeSettings: OpenNativeSettings,
    public geolocation: Geolocation,
    public here:HeremapService,
    //private backgroundGeolocation: BackgroundGeolocation,
    public zone: NgZone) {

  }

  ////////////////////////////////////////////////////////////
  /////////////////////// GPS ///////////////////////////////
  /////////////////////////////////////////////////////////////


  addConnectivityListeners() {
    return new Observable(observer => {
      setTimeout(() => {
        this.watchOnline().then((isAvailable: any) => {
          observer.next(isAvailable);
        });
      }, 10000, this)
    }
    );
  }

  startGeoWatch() {
    
    let options: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge:0,
      timeout: 60 * 1000
    };

    let geoWatch = this.geolocation.watchPosition(options);

    geoWatch.subscribe((pos: Geoposition) => {
      // Run update inside of Angular's zone
       this.zone.run(() => {
        // console.log("Geo Location Update");
        this.latitude =  pos.coords.latitude;
        this.longitude = pos.coords.longitude;
        this.accuracy = pos.coords.accuracy;
        if(pos.coords.speed == NaN) pos.coords.speed = 0;
        this.speed = pos.coords.speed;
        let data={
          lat:pos.coords.latitude,
          lng:pos.coords.longitude,
        }
        this.here.userCurrentLocation(data);
       });
    });

    this.geoWatchLive = true;

  }

   getGeoLocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
          let latlng={
            lat:resp.coords.longitude,
            lng:resp.coords.latitude
          }
          return latlng;
      }).catch((error) => {
console.log(error);

      });
   
  }

  stopGeoWatch(){
    // to stop watching
    this.geoWatch.unsubscribe();
    this.geoWatchLive = false;
  }

  watchOnline(): any {
    return new Promise((resolve) => {

          this.diagnostic.isLocationAvailable().then((isAvailable) => {
            if (isAvailable === true) {
              this.isLocationAvailable = true;
              console.log("isLocationAvailable true");
              resolve(true);
            }
            else
            {
              this.isLocationAvailable = false;
            }

              this.diagnostic.isLocationEnabled().then((isAvailable) => {
                if (isAvailable === true) {
                  console.log("isLocationEnabled true");
                  this.isLocationEnabled = true;
                  resolve(true);
                } else {
                  this.isLocationEnabled = false;
                }
                  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
                    // if (canRequest) {
                    //   this.locationAccuracyCanReq = true;
                    //   resolve(true);
                    // }
                    // else {
                    //   this.locationAccuracyCanReq = false;
                    // }
                      
                    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((x) => {
                
                        if(x.code === 1) {
                          console.log("locationAccuracy true");
                          resolve(true);
                        } else {
                          resolve(false);
                        }
                    }, (error) => {
                      // this.openNativeSettings.open("location");
                      console.log("openNativeSettings", error);
                      resolve(false);
                    });
                    

                    //////////////////////////
                    // if(this.isLocationAuthorized === false 
                    //   && this.isLocationAvailable === false 
                    //   && this.isLocationEnabled === false
                    //   && this.locationAccuracyCanReq === false)
                    //   {
                    //     resolve(false);
                    //   } else {
                    //     resolve(true);
                    //   }
                    /////////////////////////
                  });
                });
              });
      });
  }
}
