import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgetotp',
  templateUrl: './forgetotp.page.html',
  styleUrls: ['./forgetotp.page.scss'],
})
export class ForgetotpPage implements OnInit {
  changepassowrd: FormGroup;
  isSubmit: boolean = false;
  constructor(private router: Router, public Api: ApiService, public loader: LoadingController,public alert:AlertController) { }

  ngOnInit() {
    this.changePasswordInit()
  }

  gotoHome() {
    this.isSubmit = true;
    if (this.changepassowrd.controls.newPassword.value === this.changepassowrd.controls.confirmPassword.value) {
      if (this.changepassowrd.valid) {
        let verifydata = {
          otp: this.changepassowrd.controls.otp.value,
          phoneNo: localStorage.getItem('number')
        }
        let data = {
          userId: localStorage.getItem('userId'),
          newPassword: this.changepassowrd.controls.newPassword.value,
        }
        let loader = this.loader.create({
          message: 'Please wait verifying otp',
        })
        loader.then((res) => {
          res.present();
        })
        this.Api.verifyOtp(verifydata).subscribe((Res: any) => {

          if (Res.result.status === "1") {
            loader.then((res) => {
              res.dismiss();
            })
            let loadernext = this.loader.create({
              message: 'Saving new password'
            })
            loadernext.then((res) => {
              res.present();
            })
            this.Api.changePassword(data).subscribe((res: any) => {
             if(res.response.status==='1'){
              loadernext.then((res) => {
                res.dismiss();
              })
              
            let alert=this.alert.create({
              message:'Password changed successful',
              buttons:[{text:'Ok',
            role:'close'}]
            })
            alert.then((Res)=>{
              Res.present();
            })
    this.router.navigate(['/login']);


             }
             else{
              loadernext.then((res) => {
                res.dismiss();
              })
             }
            },err =>{
              if(err){
                this.loader.dismiss();
              }
            })
          }
          else{
            this.loader.dismiss();

            let alert=this.alert.create({
              message:'Otp verification failed',
              buttons:[{text:'Ok',
            role:'close'}]
            })
            alert.then((Res)=>{
              Res.present();
            })
          }


        })
      }


    }

  }
  changePasswordInit(): void {
    this.changepassowrd = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required)

    })
  }

}
