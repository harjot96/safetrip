import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { LoaderService } from '../loader.service';
import { FindingDriverComponent } from '../finding-driver/finding-driver.component';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
@Input() data;
paymentType:any;
userdata:any;
selected_payment=true;
carddetail=[];  
constructor(public navctrl:NavController,
  public modal:ModalController,public alert:AlertController,
  public Api:ApiService,public loader:LoaderService,public loaderctrl:LoadingController) { }


  
  ngOnInit() {
    this.getuserProfile();
    if (JSON.parse(localStorage.getItem('user')) != null) {
      let user_detail = JSON.parse(localStorage.getItem('user'));

      console.log(user_detail);

      let data = {
        userId: user_detail.id
      }
      this.Api.getuserProfile(data).subscribe((res: any) => {
        this.userdata=res.response.data;
})



    }
    
  }
  getuserProfile(){
    let data={
      userId:localStorage.getItem('userid')
    }
    this.loader.showLoader();
    this.Api.getuserProfile(data).subscribe((res:any) =>{
      console.log(res);
      this.carddetail=res.response.data.cardDetails;
      this.loader.hideLodder();
      },err=>{
        if(err){
          this.loader.hideLodder();
        }
      })

  }

  paymentMehod(data){
    this.selected_payment=false;
    this.paymentType=data;
    console.log('cnjcbkjsjkcbk',data);
  }

  addPaymentMethod(){
    this.navctrl.navigateForward('addcard')
    this.modal.dismiss();
  }

  searchForDriver(){
    if(this.paymentType==='insurance'){
      if(typeof(this.userdata.insurance)!='undefined' && typeof(this.userdata.insurance)!=null ){
        this.loader.showLoader();
        let data={
          carType:this.data.carType, 
    currentAddress:this.data.currentAddress,
    currentLat:this.data.currentLat, 
    currentLon:this.data.currentLon, 
    destinationAddress:this.data.destinationAddress, 
    destinationLat:this.data.destinationLat, 
    destinationLon:this.data.destinationLon, 
    paymentType:this.paymentType, 
    totalFare:this.data.totalFare, 
    userId:this.data.userId, 
        }
           this.Api.driverNearby(data).subscribe((res: any) => {
          console.log(res);
          this.loader.hideLodder();
          this.modal.dismiss();  
        let loader=this.loaderctrl.create({
          message:'Finding Nearby Drive.......',
          mode:'ios'
        })
        loader.then((res)=>{
    res.present();
        })
        })
      }
      else{
        let alert=this.alert.create({
          message:'No Insurance record found want to add',
          mode:'ios',
          buttons:[{
            text:'No',
            role:'close'
          },{
            text:'Yes',
            handler:()=>{
              this.navctrl.navigateForward('add-insurance');
              this.modal.dismiss();
            }
          }]
        });
        alert.then((res)=>{
          res.present();
        })
      }
    }
   
    if(this.paymentType==='cash' || this.paymentType==='card'){
      this.loader.showLoader();
      let data={
        carType:this.data.carType, 
  currentAddress:this.data.currentAddress,
  currentLat:this.data.currentLat, 
  currentLon:this.data.currentLon, 
  destinationAddress:this.data.destinationAddress, 
  destinationLat:this.data.destinationLat, 
  destinationLon:this.data.destinationLon, 
  paymentType:this.paymentType, 
  totalFare:this.data.totalFare, 
  userId:this.data.userId, 
      }
         this.Api.driverNearby(data).subscribe((res: any) => {
        console.log(res);
        this.loader.hideLodder();
        this.modal.dismiss();  
        this.loader.createModal();
        
  //     let loader=this.loaderctrl.create({
  //       message:'Finding Nearby Drive.......',
  //       mode:'ios'
  //     })
  //     loader.then((res)=>{
  // res.present();
  //     })
      })
    }
   
  }



}
