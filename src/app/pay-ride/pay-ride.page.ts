import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pay-ride',
  templateUrl: './pay-ride.page.html',
  styleUrls: ['./pay-ride.page.scss'],
})
export class PayRidePage implements OnInit {
  @Input() data;

  tripdetails: any;
  driverDetails = {
    firstName: '',
    lastName: '',
    mobile: '',
    rating: '',
    cartype: '',
    carnumber: '',
    image: '',
    otp: ''
  }
  constructor(public Api: ApiService, public navctrl: NavController, public modal: ModalController, public loader: LoadingController) { }

  ngOnInit() {
    console.log(this.data, 'Agayyayyaya');
    this.tripdetails = this.data.trip
    this.getRidePrice();

  }












  getRidePrice() {
    let data = {
      driverId: localStorage.getItem('driverId')
    }
    this.Api.getDriverProfile(data).subscribe((res: any) => {
      console.log(res, 'vsdvsbvsfb');
      this.driverDetails.firstName = res.response.data.firstName;
      this.driverDetails.lastName = res.response.data.lastName;
      this.driverDetails.mobile = res.response.data.mobile;
      this.driverDetails.image = res.response.data.profileImage;
      this.driverDetails.rating = res.response.data.rating
      this.driverDetails.carnumber = res.response.data.carNo;
      this.driverDetails.otp = res.response.data.otp;
      this.driverDetails.cartype = res.response.data.carCategory

    })
  }


  AcceptPayment() {
    this.modal.dismiss();
    this.navctrl.navigateForward('proceed-payment');
  }

  CashPayment() {
    this.modal.dismiss();
    let loader = this.loader.create({
      message: 'Checking Payement Status..',
      mode: 'ios'
    })
    loader.then((res) => {
      res.present();
    })

  }



}
