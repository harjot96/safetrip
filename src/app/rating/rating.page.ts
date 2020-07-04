import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NavController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
@Input() data;
driverdata:any;
tripdetails:any;
driverate='';
comment='';
  constructor(public Api:ApiService,public navctrl:Router,public loader:LoadingController,public modal:ModalController,public alert:AlertController) { }

  ngOnInit() {
    this.tripdetails=JSON.parse(localStorage.getItem('tripdetail'))
    console.log('this data is from dta from onesignal',this.data);
    let data={
      driverId:localStorage.getItem('driverId')
    }
this.Api.getDriverProfile(data).subscribe((res:any) =>{
  console.log(res);
  this.driverdata=res.response.data
  
})
    
  }
  onRateChange(data){

    // this.driverate=data;
  }
  submit(){
let loader=this.loader.create({
  mode:'ios',
  message:'Saving your response'
})
loader.then((res)=>{
  res.present();
})
    let data={
      driverId:localStorage.getItem('driverId'),
      rating:this.driverate,
      tripId:this.tripdetails.id,
      comments:this.comment

    }
    console.log(data);
    
    this.Api.DriverRating(data).subscribe((res:any)=>{
      loader.then((res)=>{
        res.dismiss();
      })
      this.modal.dismiss();
      localStorage.setItem('tripId','');
      localStorage.setItem('driverId',''),
      localStorage.setItem('tripdetail',''),
      this.alert.dismiss();
      this.navctrl.navigate(['/home']);


      console.log(res);
     
      
    })
  }

}
