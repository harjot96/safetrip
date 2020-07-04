import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { GeolocationProviderService } from '../geolocation-provider.service';
@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss'],
})
export class DriverCardComponent implements OnInit {
  @Input() data;
  @Input() ride;
  card={
    number:'',
    expiry:'',
    cvv:''
  }
  driverDetails={
    firstName:'',
    lastName:'',
    mobile:'',
    rating:'',
    cartype:'',
    carnumber:'',
    image:'',
    otp:''
  }
  constructor( public location:GeolocationProviderService, public api:ApiService,public modal:ModalController,private callNumber: CallNumber,public alertctrl:AlertController,public loader:LoadingController) { }

  ngOnInit() {
    console.log(this.ride,'riding data all is here');
    this.location.startGeoWatch();
    
    console.log(this.data);
    let data={
      driverId:this.ride.driverId
    }
this.api.getDriverProfile(data).subscribe((res:any) =>{
  console.log(res,'vsdvsbvsfb');
  this.driverDetails.firstName=res.response.data.firstName;
  this.driverDetails.lastName=res.response.data.lastName;
  this.driverDetails.mobile=res.response.data.mobile;
  this.driverDetails.image=res.response.data.profileImage;
  this.driverDetails.rating=res.response.data.rating
  this.driverDetails.carnumber=res.response.data.carNo;
  this.driverDetails.otp=res.response.data.otp;
  this.driverDetails.cartype=res.response.data.carCategory
})
}

  cancelRide(){
    let loader=this.loader.create({
      message:'please wait cancelling your ride',
      mode:'ios'
    })
    let alert=this.alertctrl.create({
      message:'Are you sure to cancel booking',
      mode:'ios',
      buttons:[{
        text:'yes',
        handler:() =>{
          loader.then((res)=>{
            res.present();
          })
          let data={
            tripId:this.ride.id
          }
          this.api.cancel_current_Ride(data).subscribe((res)=>{
            console.log(res);

            loader.then((res)=>{
              res.dismiss();
            })
            this.modal.dismiss();
            
          })
        }
      },
    {text:'No',
  role:'cancel'}]
    })
alert.then((res) =>{
  res.present();
})

  }

  onRateChange(e){
    
  }

  callDriver(){
    this.callNumber.callNumber(this.driverDetails.mobile,true).then((res) =>{
      console.log(res);
      })
  }
  

}
