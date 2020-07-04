import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  otpform: FormGroup;
  isSubmit: boolean = false;
  userReg: any = {};

  constructor(private router: Router, 
              private location: Location,
              public toastController: ToastController) { 
    this.OTPFormInit();
  }

  ngOnInit() {
    let userReg = localStorage.getItem('reguser');
    if(userReg == null)
    {
      this.location.back();
      return;
    }

    this.userReg = JSON.parse(userReg);
  }


  
  createProfile() {
    this.isSubmit = true;
    if(this.otpform.valid) {
      let opt = this.otpform.controls.otp.value;
      
      if(this.userReg.otp != opt)
      {
        this.toastController.create({
          message: "Wrong OTP",
          duration: 2000
        }).then((toast) => {
          toast.present();
        });
        return false;
      }
      this.userReg.isVerified = true;
      localStorage.setItem('reguser', JSON.stringify(this.userReg));
      this.router.navigate(['/create-profile']);  

    }
  }

  goBack() {
    this.location.back();
  }
  OTPFormInit():void{
    this.otpform=new FormGroup({
      otp:new FormControl('',Validators.required),
      })
  }

}
