import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})

export class SettingPage implements OnInit {
  newpassword: FormGroup;
  isSubmit: boolean = false;

  user = JSON.parse(localStorage.getItem('user'));
  constructor(private alert: AlertController, private api: ApiService, public loader: LoaderService, public stoploader: LoadingController) { }

  ngOnInit() {
    this.passwordInit();
  }

  passwordInit(): void {
    this.newpassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    })
  }
  submit() {
    this.isSubmit = true;

    if (this.newpassword.valid) {
      if (this.newpassword.controls.password.value === localStorage.getItem('password')) {
        if (this.newpassword.controls.newPassword.value === this.newpassword.controls.ConfirmPassword.value) {
          this.loader.showLoader();
          let data = {
            userId: this.user.id,
            newPassword: this.newpassword.controls.newPassword.value,
          }
          localStorage.setItem('password', this.newpassword.controls.newPassword.value)
          this.api.changePassword(data).subscribe((res: any) => {
            this.loader.hideLodder();
            console.log(res);
            let alert = this.alert.create({
              message: res.response.data.message,
              buttons: [{
                text: 'Ok',
                role: 'close'
              }],
              mode: 'ios'
            })
            alert.then((Res) => {
              Res.present();
            })


          }, err => {
            if (err) {
              this.loader.showLoader();
            }
          })

        }
        else {
          let alert = this.alert.create({
            message: 'New password not matched.',
            buttons: [{
              text: 'Ok',
              role: 'close'
            }],
            mode: 'ios'
          })
          alert.then((Res) => {
            Res.present();
          })
        }
      }
      else {
        let alert = this.alert.create({
          message: 'Current password is not valid.',
          buttons: [{
            text: 'Ok',
            role: 'close'
          }],
          mode: 'ios'
        })
        alert.then((Res) => {
          Res.present();
        })
      }
      this.stoploader.dismiss();



    }
    else {
    }

  }

}
