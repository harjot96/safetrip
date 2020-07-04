import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { LoaderService } from '../loader.service';
import * as moment from 'moment';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.page.html',
  styleUrls: ['./select-payment-method.page.scss'],
})
export class SelectPaymentMethodPage implements OnInit {
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
    dateFormat: 'DD/YY',
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
              public toastController: ToastController,
              public location: Location,
              public alert:AlertController,
              public loader:LoaderService,
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



  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'SHOW' ? 'HIDE' : 'SHOW';
}


  savePaymentMethod() {
    this.isSubmit = true;

    console.log(this.form.paymentmethod);


    if(this.form.paymentmethod == 'cc') {
      if(this.cardform.valid) {
this.loader.showLoader();
        let data={
          userId:localStorage.getItem('userId'),
          cardName:this.cardform.controls.holdername.value,
          cardNumber:this.cardform.controls.cardnumber.value,
          cvc:this.cardform.controls.cvc.value,
          expiryDate:this.cardform.controls.date.value,
        }
        console.log(data);
        this.Api.saveCardDetails(data).subscribe((res:any)=>{
          console.log(res);
          
        })
      }
    } else {
      if(this.Insuranceform.valid) {
        this.loader.showLoader();
        let Insurancedata = {
          insuranceNo:this.Insuranceform.controls.insuranceNo.value,
        }
        console.log(Insurancedata); 
      }
    }
    this.loader.hideLodder();
     localStorage.setItem('user', JSON.stringify(this.userReg));
     let al=this.alert.create({
       message:'Account Created successfully',
       buttons:[{
         text:'Ok',
         role:'close'
       }],
       mode:'ios'
     });
     al.then((res) => {
      res.present();
    })
    this.authService.logout();

  }
  Skip(){
    let al=this.alert.create({
      message:'Account Created successfully',
      buttons:[{
        text:'Ok',
        role:'close'
      }],
      mode:'ios'
    });
    al.then((res) => {
     res.present();
   })
    this.authService.logout();

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
