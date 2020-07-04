import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-finding-driver',
  templateUrl: './finding-driver.component.html',
  styleUrls: ['./finding-driver.component.scss'],
})
export class FindingDriverComponent implements OnInit {
findingdriver:any;
  constructor(public modal: ModalController, public alert: AlertController) { 
    this.noDriverFound();
  }

  ngOnInit() { }

  cancelRide() {
    this.modal.dismiss(null, null, 'findingDriver')
    clearTimeout(this.findingdriver);
  }

  noDriverFound() {
   this.findingdriver =setTimeout(() => {
      let alert = this.alert.create({
        message: 'No driver available please try after sometime',
        mode: 'ios',
        buttons: [{
          text: 'Ok',
          handler: () => {
          this.modal.dismiss(null, null, 'findingDriver')
          }
        }]
      })
      alert.then((res) => {
        res.present();
      })
    }, 300 * 100)
  }

}
