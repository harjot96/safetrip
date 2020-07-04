import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FindingDriverComponent } from './finding-driver/finding-driver.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showloader:any

  constructor(public loader:LoadingController,public modal:ModalController) { }

  showLoader(){
    let showloader=this.loader.create({
mode:'ios'
    })
showloader.then((res) => {
res.present();
})
  }
  

  hideLodder(){
  this.loader.dismiss();
  }

  createModal(){
  let modal= this.modal.create({
    component:FindingDriverComponent,
    mode:'ios',
    id:'findingDriver',
    cssClass:'findingDriver'
    })
    modal.then((res)=>{
      res.present();
    })
  }}

