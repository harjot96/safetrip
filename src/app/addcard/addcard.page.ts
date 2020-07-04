import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NavController } from '@ionic/angular';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.page.html',
  styleUrls: ['./addcard.page.scss'],
})
export class AddcardPage implements OnInit {
cards=[];
  constructor(public Api:ApiService,public navctrl:NavController,public loader:LoaderService) { }

  ngOnInit() {
    this.getuserProfile();
  }
 

  getuserProfile(){
    let data={
      userId:localStorage.getItem('userid')
    }
    this.loader.showLoader();
    this.Api.getuserProfile(data).subscribe((res:any) =>{
      console.log(res);
      this.cards=res.response.data.cardDetails;
      console.log(this.cards);
      this.loader.hideLodder();
      },err=>{
        if(err){
          this.loader.hideLodder();
        }
      })

  }
  
  addCard(){
this.navctrl.navigateForward('credit-debit-card');
  }

}
