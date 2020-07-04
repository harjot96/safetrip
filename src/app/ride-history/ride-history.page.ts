import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ApiService } from '../service/api.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.page.html',
  styleUrls: ['./ride-history.page.scss'],

})
export class RideHistoryPage implements OnInit {
data=[];
user=JSON.parse(localStorage.getItem('user'))

constructor(public navCtrl:NavController,public Api:ApiService, public loader:LoaderService) { }

  ngOnInit() {
  this.getrideHistory();
  }

  tripDetail(data) {
  let navigationExtras: NavigationExtras = {
  queryParams: {
  data: JSON.stringify(data),
  }
  };
  this.navCtrl.navigateForward(['trip-detail'], navigationExtras)
  }
  getrideHistory(){
    this.loader.showLoader();
  let data={
    userId:this.user.id
  }
  this.Api.getRideHistory(data).subscribe((res:any)=> {
    this.data=res.response.data;
    console.log(res.response.data);
    this.loader.hideLodder();
    
  },err =>{
    if(err){
      this.loader.hideLodder();
    }
  })

  }


}
