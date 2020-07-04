import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Platform, ToastController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { Location } from '@angular/common';
import { LoaderService } from '../loader.service';
import { OneSignalService } from '../one-signal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmit: boolean = false;

  constructor(
    private router: Router, 
    private location: Location,
    private device: Device,
    public Api: ApiService,
    private platform: Platform,
    public loader:LoaderService,
    public authService: AuthService,
    public onesignal:OneSignalService,
    public toastController: ToastController
    ) {
   }

  ngOnInit() {
    this.LoginFormInit();
  this.onesignal.OneSignalInit();
  }

  gotoSignup() {
    this.router.navigate(['/register']);
  }

  login() {
    // this.authService.login();

    this.isSubmit = true;

    if(this.loginForm.valid) {
      this.loader.showLoader();

        let uuid = "0";

        if(!this.platform.is('desktop'))
        {
          uuid = this.device.uuid;
        }

        let data = {
          mobile: this.loginForm.controls.mobile.value,
          password: this.loginForm.controls.password.value,
          udid: uuid,
          // udid: '6713384966da7354',
          // playerId:'dcdssvsfvfg342'

          playerId:localStorage.getItem('playerid')

        }
        localStorage.setItem('password',data.password)


        this.Api.loginUser(data).subscribe((res:any) => {
          console.log(res);
          if(res.response.status == -1) {
            this.loader.hideLodder();

          }

          if(res.response.status == 1) {
          
            this.loader.hideLodder();

            let user = res.response.data.userDetails;
            let data ={
              userId:user.id
            }
            localStorage.setItem('userid',user.id);
            localStorage.setItem('user', JSON.stringify(user));


            this.Api.getuserProfile(data).subscribe((res:any)=>{
              console.log('userdata:::::::::::::::::::::::::::',res);
            localStorage.setItem('reguser', JSON.stringify(res.response.data));

              
            })
            console.log(res);
            this.authService.login();

          } else {
            this.loader.hideLodder();
            
            this.toastController.create({
              message: res.response.data.message,
              duration: 2000
            }).then((toast) => {
              toast.present();
            });  
          }
        },err => {
          this.loader.hideLodder();

          console.log(err);
          
        })
    }
  
  }

  gotoForgetPage() {
    this.router.navigate(['/forget-password']);
  }

  LoginFormInit(): void {
    this.loginForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });
  }

}
