import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isSubmit: boolean = false;
  buttondisable=false;


  constructor(private router: Router, 
              private location: Location,
              private device: Device,
              public Api: ApiService,
              public loader:LoaderService,
              private platform: Platform,
              public toastController: ToastController) { 
    this.RegisterFormInit();
  }

  ngOnInit() {
    
  }

  sendOTP() {

    this.isSubmit = true;

    if (this.registerForm.controls.password.value === this.registerForm.controls.confirmPassword.value) {

      if(this.registerForm.valid) {
        this.loader.showLoader();

        let uuid = "0";

        if (!this.platform.is('desktop')) {
          uuid = this.device.uuid;
        }

        let data = {
          mobile: this.registerForm.controls.mobile.value,
          password: this.registerForm.controls.password.value,
          deviceToken: uuid,
          udid: uuid
        }
        localStorage.setItem('Mobile',this.registerForm.controls.mobile.value);

        this.Api.registerUser(data).subscribe((res: any) => {
          console.log(res.response);
          if (res.response.status == 1) {
             this.buttondisable=false;
localStorage.setItem('userId',res.response.data.id)
            this.loader.hideLodder();

            let data = res.response.data;
            localStorage.setItem('reguser', JSON.stringify(data));

            this.toastController.create({
              message: data.otp,
              duration: 5000
            }).then((toast) => {
              toast.present();
            });

            this.router.navigate(['/otp']);
            return;
          } else {
            this.buttondisable=false;

            this.loader.hideLodder();
            this.toastController.create({
              message: res.response.data.message,
              duration: 2000
            }).then((toast) => {
              toast.present();
            });
          }
        }, err => {
          console.log(err);
          this.loader.hideLodder();
        });
      }
      else{
    this.isSubmit = false;

      }
  this.isSubmit = false;

    }
    else{
      this.buttondisable=false;
    }

  }
  ionViewDidEnter(){
   this.buttondisable=false;
  }

  goBack() {
    this.location.back();
  }

  RegisterFormInit(): void {
    this.registerForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });
  }

}
