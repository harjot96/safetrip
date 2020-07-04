import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  forgetpassword: FormGroup
  constructor(private router: Router, private location: Location, public Api: ApiService, public toastController: ToastController) { }

  ngOnInit() {
    this.forgetPasswordInit()
    localStorage.clear();
  }

  sendOTP() {
    let data = {
      phoneNo: this.forgetpassword.controls.mobile.value
    }

    this.Api.forgetPassword(data).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('userId', res.result.data.id);
      localStorage.setItem('number', this.forgetpassword.controls.mobile.value)
      localStorage.setItem('otp', res.result.data.otp);
      this.toastController.create({
        message: res.result.data.otp,
        duration: 6000
      }).then((toast) => {
        toast.present();
      });
      this.router.navigate(['/forgetotp']);


    }, error => {
      console.log(error);

    })
  }

  goBack() {
    this.location.back();
  }
  forgetPasswordInit(): void {
    this.forgetpassword = new FormGroup({
      mobile: new FormControl('', Validators.required)
    })
  }

}
