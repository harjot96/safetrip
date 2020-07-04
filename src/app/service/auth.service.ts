import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { ApiService } from './api.service';
import { OneSignalService } from '../one-signal.service';
// import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    public toastController: ToastController,
    public Api:ApiService,
    public onesignal:OneSignalService,
  ) {
    let user = localStorage.getItem('user');
    if(user != null) {
      this.ifLoggedIn();
    }
  }

  ifLoggedIn() {
    this.authState.next(true);
  }

  isAuthenticated() {
    return this.authState.value;
  }

    logout() {
    
    let data={
      userId:localStorage.getItem('userid')
    }
    this.Api.logoutuser(data).subscribe((res)=>{
    console.log(res);
    localStorage.clear();
    this.onesignal.OneSignalInit();
    this.router.navigate(['/login']);
    this.authState.next(false);
    })
    }

  login() {
    this.authState.next(true);
    this.router.navigate(['/home']);
  }

}
