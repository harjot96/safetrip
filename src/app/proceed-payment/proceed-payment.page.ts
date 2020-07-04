import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { ApiService } from '../service/api.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import{environment} from '../../environments/environment'
import { AlertController, NavController, ModalController, LoadingController } from '@ionic/angular';
import { RatingPage } from '../rating/rating.page';

@Component({
  selector: 'app-proceed-payment',
  templateUrl: './proceed-payment.page.html',
  styleUrls: ['./proceed-payment.page.scss'],
})
export class ProceedPaymentPage implements OnInit {
  cards=[];
  tripdetials:any;
  carddetail:any;
  disablebutton=true;

  constructor(public loader:LoaderService,public loaderctrl:LoadingController, public Api:ApiService,public stripe:Stripe,public alert:AlertController,public modal:ModalController,public Navctrl:NavController) { }

  ngOnInit() {
    this.getuserProfile();
    this.tripdetials=JSON.parse(localStorage.getItem('tripdetail'))
    this.stripe.setPublishableKey(environment.stripe_my_publishable_key)

  }
  getuserProfile(){
    let data={
      userId:localStorage.getItem('userid')
    }
    this.loader.showLoader();
    this.Api.getuserProfile(data).subscribe((res:any) =>{
      console.log(res);
      this.cards=res.response.data.cardDetails;
      console.log(this.cards);
      this.loader.hideLodder();
      },err=>{
        if(err){
          this.loader.hideLodder();
        }
      })

  }




  selectedCard(data){
    console.log(data);
    this.disablebutton=false;
    this.carddetail=data;
    }

  payRide(){
    let loader=this.loaderctrl.create({
      message:'Please wait making payment',
      mode:'ios'
    })
    loader.then((res) =>{
      res.present();
    })
    
const getDate = string => (([month,year]) => ({  month, year }))(string.split('/'));
console.log(this.carddetail);

let carddate=getDate(this.carddetail.expiryDate)
let card={
  number: this.carddetail.cardNumber,
  expMonth:carddate.month,
  expYear: carddate.year,
  cvc: this.carddetail.cvc
}
this.stripe.createCardToken(card).then((res)=>{
  let stripeToken=res.id;
  let data={
    stripeToken:stripeToken,
    totalFare:this.tripdetials.totalFare,
    tripId:this.tripdetials.id
  }
  this.Api.payRide(data).subscribe((res:any)=>{
    console.log(res);
    
    // alert(JSON.stringify(res));
    if(res.response.status==='1') {
      loader.then((res)=>{
        res.dismiss();
      })
    let alert=this.alert.create({
      message:'Thanks For Using SafeTrip. Please Rate Driver',
      mode:'ios',
      buttons:[{
        text:'Ok',
        handler:() =>{
         let modal= this.modal.create({
            component:RatingPage
          })
modal.then((res)=>{
  res.present();
})
        }
      }]
    })
alert.then((res:any) =>{
  res.present();
})
  }
  },err=>{
    if(err){
      loader.then((res)=>{
        res.dismiss();
      })
    }
  })

})


  }
  

}
