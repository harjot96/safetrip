import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Device } from '@ionic-native/device/ngx';
import { LoaderService } from './loader.service';
import { Camera } from '@ionic-native/camera/ngx';
import { GeolocationProviderService } from './geolocation-provider.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { RouteServiceService } from './route-service.service';
import { OneSignalService } from './one-signal.service';
import { DriverCardComponent } from './driver-card/driver-card.component';
import { File } from '@ionic-native/file/ngx';
import { IonicRatingModule } from 'ionic4-rating';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { RatingPage } from './rating/rating.page';
import { Stripe } from '@ionic-native/stripe/ngx';
import { PaymentMethodPage } from './payment-method/payment-method.page';
import { PayRidePage } from './pay-ride/pay-ride.page';
import { CreditcardmaskPipe } from './creditcardmask.pipe';
import { PipesModule } from './pipe.module';
import { DataServiceService } from './data-service.service';
import { StateService } from './state.service';
import { FindingDriverComponent } from './finding-driver/finding-driver.component';
import { ChooseCarComponent } from './dashboard/choose-car/choose-car.component';


@NgModule({
  declarations: [AppComponent,DriverCardComponent,RatingPage,PaymentMethodPage,PayRidePage,FindingDriverComponent, ChooseCarComponent],
  entryComponents: [DriverCardComponent,RatingPage,PaymentMethodPage,PayRidePage,FindingDriverComponent, ChooseCarComponent],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicRatingModule,
    PipesModule


  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    AuthService,
    AndroidPermissions,
    Device,
    LoaderService,
    Camera,
    CallNumber,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeGeocoder,
    ApiService,
    OpenNativeSettings,
    StateService,
    DataServiceService,
    LocationAccuracy,
    RouteServiceService,
    Stripe,
    Diagnostic,
    GeolocationProviderService,
OneSignalService,
File,
OneSignal,
    Geolocation,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
