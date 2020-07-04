import { MapService } from './../map.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { HereMapComponent } from '../here-map/here-map.component';
import { FormGroup, FormControl } from '@angular/forms';
import { HeremapService } from '../heremap.service';
import { GeolocationProviderService } from '../geolocation-provider.service';
import { RouteServiceService } from '../route-service.service';
import { LoaderService } from '../loader.service';
import { Ride } from '../Modal/RideModal';
import { ApiService } from '../service/api.service';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { PaymentMethodPage } from '../payment-method/payment-method.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('pleaseConnect', { static: false }) pleaseConnect: ElementRef;
  map: any;
  slectcar=true;
  searchRide = new Ride();
  Selectride: any = [];
  user_credential = JSON.parse(localStorage.getItem('user'))
  selectedcar=0;
  location: {
    current: any,
    destination: any
  } = {
      current: '',
      destination: ''

    }
  from: any
  searchform: FormGroup;
  searchresult: any = [];
  hidelist1: boolean = true;
  hidelist2: boolean = true;
  staringPoint: any;
  endpoint: any;
  isPleaseWait = true;

  originFromCurrent = true;
  isMapLoad = false;
  etaShow = false;
  etaText = '';
  price = JSON.parse(localStorage.getItem('distance'));
  ride = {
    from_lat: '',
    from_lng: '',
    from_address: 'Your Location',
    to_lat: 0,
    to_lng: 0,
    to_address: ''
  };
  // Creating Array for cars in which price will be dynamic
  whereto: any = [];
  origin: { lat: any; lng: any; };
  destination: { lat: any; lon: any; };
  fromValue = '';
  destinationValue = '';
  isSelectRideListDisplay: boolean = false;
  iscarlistdiplay: boolean = false;
  isenablelocdisplay: boolean = false;
  isRideSelected: boolean = false;
  isConfirmRequest: boolean = false;
  isDriverSelectDisplay: boolean = false;
  isfindcar: boolean = false;


  stageOnRide = false;
  stagePayToRide = false;
  stageFeedback = false;

  constructor(private router: Router, public Api: ApiService, private menu: MenuController, public routingService: RouteServiceService,
    public hereMap: HeremapService, public geolocation: GeolocationProviderService, public nativeGeocoder: NativeGeocoder,
    private navCrtl: NavController,public alert:AlertController,public modal:ModalController,
    private loadingController: LoadingController, public loader: LoaderService) {

    setInterval(() => {
     if(localStorage.getItem('isRideSelected')==='true'){
       this.isRideSelected=true;
       console.log('1');
       
     }
     else{
       console.log('2');
       
      this.isRideSelected=false;

     } 
      if (localStorage.getItem('location')) {

        this.isenablelocdisplay = false;
      }
      else {
        this.isenablelocdisplay = true;

      }
    }, 1000)



  }

  currentLocation(quer: any, type) {
    this.isRideSelected = false;

    this.isSelectRideListDisplay = false;
    if (type === 'current') {
      this.location.current = quer;
      this.hereMap.searchPlace(this.location.current).then((res: any) => {
        this.searchresult = <Array<any>>res
        this.hidelist1 = false;
        console.log(this.searchresult);

      })
    }
    else if (type === 'destination') {
      this.location.destination = quer;
      this.hereMap.searchPlace(this.location.destination).then((res: any) => {
        console.log(res);

        this.whereto = <Array<any>>res
        this.hidelist2 = false;
      })
    }
    console.log(this.location);
  }

  ngAfterViewInit() {
    // this.loader.showLoader();
    setTimeout(() => {
      if(localStorage.getItem('userLocation')!=null)
      {
        let latlng:any=JSON.parse(localStorage.getItem('userLocation'))
        this.hereMap.initMap(this.mapElement.nativeElement, latlng);
        this.hereMap.centerMap(latlng);
        // this.geolocation.startGeoWatch();
        this.loader.hideLodder();
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(latlng.lat, latlng.lng, options).then((res: NativeGeocoderResult[]) => {
          let data = {
            title: res[0].locality,
            position: [latlng.lat, latlng.lng]
          }
          this.fromLocation(data);
        })  
      }
      else{

        let latlng={
          lat:40.7128,
          lng:74.0060
        }
        this.hereMap.initMap(this.mapElement.nativeElement, latlng);
        this.hereMap.centerMap(latlng);
        // this.geolocation.startGeoWatch();
        this.loader.hideLodder();
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(latlng.lat, latlng.lng, options).then((res: NativeGeocoderResult[]) => {
          let data = {
            title: res[0].locality,
            position: [latlng.lat, latlng.lng]
          }
          this.fromLocation(data);
        })  
      }
        


        
    }, 2000)


  }

  

  ngOnInit() {
    //this.mapService.load(this.mapElement) 
    // this.map.getGeolocation();
    this.FormInit();
  }

  ionViewDidEnter() {
    // this.mapService.load(this.mapElement) 
    this.isenablelocdisplay = true;
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  enablelocation() {
    this.isenablelocdisplay = false;
    // this.iscarlistdiplay = true;
  }

  detectForm() {

    if (this.fromValue != '' && this.destinationValue != '') {
      this.isRideSelected=false;
      localStorage.setItem('isRideSelected','false')
      this.price = JSON.parse(localStorage.getItem('distance'))
      console.log(this.price);
      this.Selectride = [{
        name: 'Premium Car',
        img: '../../assets/images/cars/pump car.svg',
        price: (this.price * 1).toPrecision(4) + '$'
      },
      {
        name: 'SUV',
        img: '../../assets/images/cars/sports-car.svg',
        price: (this.price * 2).toPrecision(4) + '$'

      },
      {
        name: 'Wheelchair Van',
        img: '../../assets/images/cars/van-ambu.svg',
        price: (this.price * 3).toPrecision(4) + '$'

      },
      {
        name: 'Ambulance',
        img: '.../../assets/images/cars/van.svg',
        price: (this.price * 4).toPrecision(4) + '$'

      }
      ]


      this.isSelectRideListDisplay = true;
      console.log(this.searchform);
      // this.hereMap.eta(this.origin,this.destination);

      // this.iscarlistdiplay = false;
      // this.isenablelocdisplay = false;

    }
  }


  loadHereMap() {

    this.hereMap.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((res) => {
      if (res === false) {
        return;
      }
      this.map = res;
      if (this.searchform.controls.from.value != '') {
        console.log('setorgin 1');
        // this.hereMap.setOrgin(this.ride.from_lat, this.ride.from_lng, this.map);
      }
      if (this.searchform.controls.to.value! != '') {
        console.log('setorgin 2');
        // this.hereMap.setDestination(this.ride.to_lat, this.ride.to_lng, this.map);
      }
      this.isMapLoad = true;
    }).catch((e) => {
      console.log("Map loading error");
    });
  }

  destinationLocation(data) {
    this.hidelist2 = true;
    console.log(data);
    this.destinationValue = data.title;
    this.searchRide.destinationAddress = data.title;

    this.endpoint = data.position[0] + ',' + data.position[1];
    this.destination = {
      lat: data.position[0],
      lon: data.position[1],
    }
    this.searchRide.desLat = data.position[0],
      this.searchRide.desLng = data.position[1],
      console.log(this, this.searchRide);
    this.routingService.destinationLoc(this.destination, this.mapElement.nativeElement);
  }

  fromLocation(data) {
    this.hidelist1 = true;
    console.log(data);
    this.fromValue = data.title;
    this.searchRide.currentAddress = data.title;
    this.staringPoint = data.position[0] + ',' + data.position[1];
    this.origin = {
      lat: data.position[0],
      lng: data.position[1]
    }
    this.searchRide.startLat = data.position[0],
      this.searchRide.startLng = data.position[1]
    this.routingService.intialLoc(this.origin, this.mapElement.nativeElement);
    console.log(this.staringPoint);
    this.searchform.controls.from.setValue(data.title)
  }

  /// here we are getting nearby driver

  rideSelected() {
    localStorage.setItem('ride','newridestart')
    let data = {
      userId: this.user_credential.userId,
      currentLat: this.searchRide.startLat,
      currentLon: this.searchRide.startLng,
      carType: this.searchRide.carType,
      destinationLat: this.searchRide.desLat,
      destinationLon: this.searchRide.desLng,
      destinationAddress: this.searchRide.destinationAddress,
      currentAddress: this.searchRide.currentAddress,
      paymentType: 'cash',
      totalFare:this.searchRide.price
    }
    // this.Api.driverNearby(data).subscribe((res: any) => {
    //   console.log(res);
    //   this.presentLoading();
    //   this.isSelectRideListDisplay = false;
    // })
    let modal=this.modal.create({
      component:PaymentMethodPage,
      componentProps:{data:data},
      mode:'ios',
      cssClass:'payment',

    })
    modal.then((res)=>{
      res.present();
      this.isSelectRideListDisplay=false;
    })
  }

  addPaymentMethod() {
    this.navCrtl.navigateForward(['/home/add-payment-method']);
    // this.router.navigate(['/home/add-payment-method']);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait, searching for driver...',
      duration: 5000,
      animated: true,
      mode: 'ios'

    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  searchForDriver() {
    this.presentLoading();
    setTimeout(() => {
      this.onDriverSelect();
    }, 5000);
  }


  carSelected(data) {
    console.log(data);
    this.slectcar=false;
    this.searchRide.carType = data.name;
    this.searchRide.price=data.price; 
    this.isRideSelected = true;
  }

  CallSOS(){
    let alert=this.alert.create({
    message:'Are you sure to use helpline number',
    mode:'ios',
    buttons:[{
      text:'Yes',
      handler:() =>{

      }
    },{
      text:'No',
      role:'Close'
    }]
    })
    alert.then((res) =>{
      res.present();
    })

  }

  callDriver(){
    let alert=this.alert.create({
      message:'Want to call driver',
      mode:'ios',
      buttons:[{
        text:'Yes',
        handler:() =>{
  
        }
      },{
        text:'No',
        role:'Close'
      }]
      })
      alert.then((res) =>{
        res.present();
      })
  }

  onDriverSelect() {
    this.isConfirmRequest = false;
    this.isDriverSelectDisplay = true;
    this.stageOnRide = true;
    setTimeout(() => {
      this.payToRide();
    }, 5000);
  }

  payToRide() {
    this.isDriverSelectDisplay = false;
    this.stagePayToRide = true

    setTimeout(() => {
      this.feedback();
    }, 5000);
  }

  feedback() {
    this.stagePayToRide = false;
    this.stageFeedback = true;
  }

  saveFeedback() {
    this.isSelectRideListDisplay = false;
    this.isenablelocdisplay = false;
    this.isRideSelected = false;
    this.isConfirmRequest = false;
    this.isDriverSelectDisplay = false;
    this.isfindcar = false;
    this.stageOnRide = false;
    this.stagePayToRide = false;
    this.stageFeedback = false;
    // this.iscarlistdiplay = true;
  }
  FormInit(): void {
    this.searchform = new FormGroup({
      from: new FormControl(""),
      to: new FormControl(""),
    })
  }

  cancelRide() {
    
  }
}
