import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.page.html',
  styleUrls: ['./add-payment-method.page.scss'],
})
export class AddPaymentMethodPage implements OnInit {

  form: any = {
    paymentmethod : 'cc'
  };

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }

  savePaymentMethod() {
  }
   
  Addcard(){

  }

}
