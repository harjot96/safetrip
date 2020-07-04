import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { LoaderService } from '../loader.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    image: ''
  };
  rate: any;



  constructor(private menu: MenuController, public loader: LoaderService, public authService: AuthService, private navCrtl: NavController, public Api: ApiService) {

  }

  ngOnInit() {
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem('user')) != null) {
        let user_detail = JSON.parse(localStorage.getItem('user'));

        console.log(user_detail);

        let data = {
          userId: user_detail.id
        }
        this.Api.getuserProfile(data).subscribe((res: any) => {
          console.log(res, 'home page response ::::::::::::::::::::::::::::::::');
          this.user.firstName = res.response.data.firstName;
          this.user.lastName = res.response.data.lastName;
          this.user.image = res.response.data.image;
          this.rate = res.response.data.rating;

        })



      }
      if (localStorage.getItem('userId') != null) {
        let user_detail = JSON.parse(localStorage.getItem('userId'));

        console.log(user_detail);

        let data = {
          userId: user_detail
        }

        this.Api.getuserProfile(data).subscribe((res: any) => {
          console.log(res, 'home page response ::::::::::::::::::::::::::::::::');
          this.user.firstName = res.response.data.firstName;
          this.user.lastName = res.response.data.lastName;

          console.log(user_detail);

          let data = {
            userId: user_detail.id
          }

          this.Api.getuserProfile(data).subscribe((res: any) => {
            console.log(res, 'home page response ::::::::::::::::::::::::::::::::');
            this.user.firstName = res.response.data.firstName;
            this.user.lastName = res.response.data.lastName;

          });
        });
      }
    }, 1000);
  }


  closeMenu() {
    this.menu.close();
  }


  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  Logout() {
    this.authService.logout();
  }

  ionViewWillEnter() {
    this.loader.hideLodder();
  }

  onRateChange(e) {

  }
}
