import { Component } from '@angular/core';

import { Platform, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { OneSignalService } from './one-signal.service';
import { DriverCardComponent } from './driver-card/driver-card.component';
import { RatingPage } from './rating/rating.page';
import { PayRidePage } from './pay-ride/pay-ride.page';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  location=false;
getuserLocation={
  lat:'',
  lng:''
}
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public router: Router,
    private statusBar: StatusBar,
    public auth: AuthService,
    public locationAccuracy: LocationAccuracy,
    public androidPermissions: AndroidPermissions,
    public geolocation: Geolocation,
    public onesignal: OneSignalService,
    public state:StateService,
    public modctrl:ModalController,public navctrl:NavController,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#404F4F')
      this.splashScreen.hide();
      // this.createusermodal();
      
      
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
      this.onesignal.OneSignalInit();
      setInterval(() => {
        if (this.platform.is('android') || this.platform.is('ios')) {
          // this.checkGPSPermission();
          localStorage.setItem('location', 'false')

        }
      }, 1000)

      this.auth.authState.subscribe(state => {
        console.log("state", state);
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
  async createusermodal() {
    const card = await this.modctrl.create({
      component: PayRidePage,
      animated: true,
      componentProps: {},
      cssClass: 'Rating',
      backdropDismiss: false,
      mode: 'ios'
    })
  card.onDidDismiss().then(()=>{
    debugger
    // this.Interval();
  })
    return await card.present();
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          this.askToTurnOnGPS();
        } else {
          this.requestGPSPermission();
        }
      },
      err => {

        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        localStorage.setItem('location', 'false')

        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => {
        if (error) {
        }
      }
    );
  }
  getLocationCoordinates() {
   this.geolocation.getCurrentPosition().then((resp) => {
      if(!this.location){
        if(resp.coords.latitude && resp.coords.longitude)
      {
        this.location=true;
        let data={
          lat:resp.coords.latitude,
          lng:resp.coords.longitude
        }
        this.state.set('userLocation',data);

        
      }
      }

    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }
}


