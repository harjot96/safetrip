import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ToastController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { LoaderService } from '../loader.service';
import { AuthService } from '../service/auth.service';
import * as moment from 'moment';
import {Location} from '@angular/common';
import { Stripe } from '@ionic-native/stripe/ngx';
import{environment} from '../../environments/environment'

@Component({
  selector: 'app-credit-debit-card',
  templateUrl: './credit-debit-card.page.html',
  styleUrls: ['./credit-debit-card.page.scss'],
})
export class CreditDebitCardPage implements OnInit {
  cardform:FormGroup;
  
  passwordType: string = 'password';
  passwordIcon: string = 'SHOW';

  datePickerObj:any = {
    inputdate: moment(new Date('2019-02')),
    closeOnSelect: true,
    titleLabel: 'Select Valid Date ',

    monthsList: [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ],
    showTodayButton: false,
    weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    dateFormat: 'MM/YYYY',
    clearButton: true
  };
  
  Insuranceform:FormGroup;
  form: {
    paymentmethod: 'insurance' | 'cc'
  } = {
    paymentmethod : 'cc'
  };

  isSubmit: boolean = false;
  userReg: any = {};

  constructor(private router: Router, 
    
              public Api: ApiService,
              public Stipe:Stripe,
              public toastController: ToastController,
              public location: Location,
              public alert:AlertController,

              public loader:LoadingController,
              public navctrl:NavController,
              public authService: AuthService) {
                
                let userReg = localStorage.getItem('reguser');
                if(userReg == null)
                {
                  this.location.back();
                  return;
                }
            
                this.userReg = JSON.parse(userReg);
  }

  ngOnInit() {
    this.cardFormInit();
    this.InsuranceForm_Init();
    this.Stipe.setPublishableKey(environment.stripe_my_publishable_key)



  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'SHOW' ? 'HIDE' : 'SHOW';
}


  savePaymentMethod() {
    this.isSubmit = true;
    let loader=this.loader.create({
      message:'Please Validating you Card.',
      mode:'ios',

    })
    loader.then((res)=>{
      res.present();
    })

    console.log(this.form.paymentmethod);


    if(this.form.paymentmethod == 'cc') {
      if(this.cardform.valid) {
const getDate = string => (([month,year]) => ({  month, year }))(string.split('/'));
let dateStripe=getDate(this.cardform.controls.date.value)

let card={
  number: this.cardform.controls.cardnumber.value,
  expMonth: dateStripe.month,
  expYear: dateStripe.year,
  cvc: this.cardform.controls.cvc.value
}
        let data={
          userId:localStorage.getItem('userid'),
          cardName:this.cardform.controls.holdername.value,
          cardNumber:this.cardform.controls.cardnumber.value,
          cvc:this.cardform.controls.cvc.value,
          expiryDate:this.cardform.controls.date.value,
        }
this.Stipe.createCardToken(card).then((res)=>{
  console.log(res);
  let data={
    userId:localStorage.getItem('userid'),
    cardName:this.cardform.controls.holdername.value,
    cardNumber:this.cardform.controls.cardnumber.value,
    cvc:this.cardform.controls.cvc.value,
    expiryDate:this.cardform.controls.date.value,
    stripeToken:res.id
  }
  this.Api.saveCardDetails(data).subscribe((res) => {
loader.then(res=>{
  res.dismiss();
})
    let alert=this.alert.create({
      message:'Card Added sucessfully',
      mode:'ios',
      buttons:[{
        text:'Ok',
        role:'close'
      }]
    })
    alert.then((res:any) =>{
      res.present();
    })
  
  })

  
},err =>{
  alert(err)
  loader.then((res) =>{
    res.dismiss();
  })
})
        console.log(data);
    //     this.Api.saveCardDetails(data).subscribe((res:any)=>{
    //       console.log(res);
    // this.loader.hideLodder();
    // this.navctrl.back();
   

          
    //     },err=>{
    //       if(err){
    //         console.log(err);

    //         this.loader.hideLodder();
            
    //       }
    //     })
      }
    } else {
      if(this.Insuranceform.valid) {
        
        let Insurancedata = {
          insuranceNo:this.Insuranceform.controls.insuranceNo.value,
        }
        console.log(Insurancedata); 
      }
    }


  }
 

  cardFormInit():void{
    this.cardform=new FormGroup({
      holdername:new FormControl('',Validators.required),
      cardnumber:new FormControl('',Validators.required),
      cvc:new FormControl('',Validators.required),
      date:new FormControl('',Validators.required)

    })
  }

  InsuranceForm_Init(){
    this.Insuranceform=new FormGroup({
      insuranceNo:new FormControl('',Validators.required)
    })
  }

}
