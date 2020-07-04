import { Injectable } from '@angular/core';
import { Platform, LoadingController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { DashboardPage } from './dashboard/dashboard.page';
import { ApiService } from './service/api.service';
import { HeremapService } from './heremap.service';
import { GeolocationProviderService } from './geolocation-provider.service';
import { DriverCardComponent } from './driver-card/driver-card.component';
import { RatingPage } from './rating/rating.page';
import { PayRidePage } from './pay-ride/pay-ride.page';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {
  playerid: any = '12345678';
  notificationData: any;

  driverInterval;
  constructor(public oneSignal: OneSignal, public modalctrl: ModalController,
    public platform: Platform, public Api: ApiService, public heremap: HeremapService,
    public loader: LoadingController,
    public toast: ToastController,
    public alert: AlertController,
    public modal: ModalController,
    public location: GeolocationProviderService) { }

  OneSignalInit() {
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('c22c384a-0cfd-4d63-950f-0c29611e3a02', '635085363226'); // import APP ID and Project Number
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.setSubscription(true);
      this.oneSignal.getIds().then((deviceid) => {
        this.playerid = deviceid.userId;

        localStorage.setItem('playerid', this.playerid);


      });

      this.oneSignal.handleNotificationReceived().subscribe((res: any) => {
        console.log(res);
        if (res.payload.additionalData.notification_status === "paymentCompleted") {
          this.loader.dismiss();
          let alert = this.alert.create({
            message: 'Thanks For Using SafeTrip. Please Rate Driver',
            mode: 'ios',
            buttons: [{
              text: 'Ok',
              handler: () => {
                let modal = this.modal.create({
                  component: RatingPage
                })
                modal.then((res) => {
                  res.present();
                })
              }
            }]
          })
          alert.then((res: any) => {
            res.present();
          })
        }
        if (res.payload.additionalData.notification_status === "finishTrip") {
          localStorage.setItem('tripdetail', JSON.stringify(res.payload.additionalData.trip))
          localStorage.setItem('tripId', res.payload.additionalData.trip.id)

          let aret = this.alert.create({
            message: "Your trip has been completed!",
            mode: 'ios',
            backdropDismiss: false,
            buttons: [{
              text: 'Ok',
              handler: () => {

                let modal = this.modalctrl.create({
                  component: PayRidePage,
                  mode: 'ios',
                  componentProps: { data: res.payload.additionalData },
                  keyboardClose: false,
                  showBackdrop: true,
                  backdropDismiss: false,
                  cssClass: 'Rating'
                })
                modal.then((res) => {
                  res.present();
                })
                console.log('what to do');

              }
            }]
          })
          aret.then((res) => {
            res.present();
          })
        }
        if (res.payload.additionalData.notification_status === "startTrip") {
          let toast = this.toast.create({
            mode: 'ios',
            message: "Your trip has been started!",
            buttons: [{
              text: 'Close',
              role: 'close'
            }],
            position: 'top'
          })
          toast.then((res) => {
            res.present();
            this.modalctrl.dismiss();
          })
        }

        if (res.payload.additionalData.notification_status === "driverArrival") {
          let toast = this.toast.create({
            mode: 'ios',
            message: 'I am near to your location.',
            buttons: [{
              text: 'Close',
              role: 'close'
            }],
            position: 'top'
          })
          toast.then((res) => {
            res.present();
          })
        }
        if (res.payload.additionalData.notification_status === "bookRide") {
          this.loader.dismiss();
          this.modal.dismiss(null,null,'findingDriver')
          let loader = this.loader.create({
            message: 'Locating Driver please wait',
            mode: 'ios'
          })
          loader.then((res) => {
            res.present();
          })
          console.log(res);
          if (res.payload.additionalData.driver != '' && res.payload.additionalData.ride != '') {
            this.createusermodal(res.payload.additionalData.driver, res.payload.additionalData.ride);
            loader.then((res) => {
              res.dismiss();
            })
          }
         
          localStorage.setItem('driverId', res.payload.additionalData.driver.id)
          let data = {
            driverId: res.payload.additionalData.driver.id
          }
          // here we are removing all marker
          this.heremap.removeallMarker();

          //Dom Maker is set for driver seprate without removing other marker

          this.driverInterval = setInterval(() => {
            this.Api.getDriverLoc(data).subscribe((res: any) => {
              loader.then((res) => {
                res.dismiss();

              })
              this.heremap.addMarker(res.response.data)
            })

          }, 15 * 1000)


        }

        if (res.payload.additionalData.notification_status === "") {

        }

      });



      this.oneSignal.handleNotificationOpened().subscribe((data: any) => {
      });
      this.oneSignal.endInit();
    }
  }


  sendNotificationwithData(data) {


  }

  Interval() {
    clearInterval(this.driverInterval);
    this.heremap.removeallMarker();
  }

  async createusermodal(data, ride) {
    const card = await this.modalctrl.create({
      component: DriverCardComponent,
      animated: true,
      componentProps: { data: data, ride: ride },
      cssClass: 'customCancel',
      showBackdrop: true,
      mode: 'ios',
      keyboardClose: true,

    })
    card.onDidDismiss().then(() => {
      debugger
      // this.Interval();
    })
    return await card.present();
  }




}
