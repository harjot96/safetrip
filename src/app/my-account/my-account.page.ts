import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
isReadOnly=true;
data:any;
mobile:any
user={
  firstName:'',
  lastName:'',
  image:'',
  rating:'',
  email:'',
  address:'',
contact:'',
mobile:'',
};

@ViewChild('inputToFocus',{static:true}) inputToFocus;
image="https://w0.pngwave.com/png/163/442/computer-icons-user-profile-icon-design-avatar-png-clip-art-thumbnail.png"

  constructor(public router:Router,public auth:AuthService,public Api:ApiService,public loader:LoaderService) { }

  ngOnInit() {
    this.loader.showLoader();
    if(JSON.parse(localStorage.getItem('user'))!=null){
      let user_detail=JSON.parse(localStorage.getItem('user'));
  
      console.log(user_detail);
      
      let data={
        userId:user_detail.id
      }
    this.Api.getuserProfile(data).subscribe((res:any)=>{
      this.loader.hideLodder();
      console.log(res,'home page response ::::::::::::::::::::::::::::::::');
      this.user.firstName=res.response.data.firstName;
      this.user.lastName=res.response.data.lastName;
      this.user.image=res.response.data.image;
      this.user.rating=res.response.data.rating;
      this.user.email=res.response.data.email;
      this.user.address=res.response.data.address;
      this.user.contact=res.response.data.contact;
      this.user.mobile=res.response.data.mobile;


      
    },err=>{
      if(err){
        this.loader.hideLodder();
      }
    })
      }
  }
  edit(){
    this.isReadOnly=false;
    this.inputToFocus.setFocus();
  }
  save(){
    this.isReadOnly=true;
  }
  editProfile() {
    this.router.navigateByUrl('/edit-profile');
  }
ionViewWillEnter(){
  this.data=JSON.parse(localStorage.getItem("reguser"));
  this.mobile=localStorage.getItem("Mobile");


}
signout(){
  this.auth.logout()
}
}
