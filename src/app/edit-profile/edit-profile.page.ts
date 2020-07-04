import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../loader.service';
import { ToastController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profileform: FormGroup;
  isSubmit: boolean = false;
  userReg: any = {};
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
  
  userImgae:any;
  image="https://w0.pngwave.com/png/163/442/computer-icons-user-profile-icon-design-avatar-png-clip-art-thumbnail.png"

  constructor(private router: Router, public Api: ApiService,
    public toastController: ToastController,
    public alert:AlertController,
    public platfrom:Platform,
    public loader: LoaderService,
    public location: Location) {
    
   
     }
     ionViewDidLeave(){
   
     }
     ngAfterViewInit(){
      let userReg =  JSON.parse(localStorage.getItem('reguser'));
    

  
     }

  ngOnInit() {
  this.profileFormInit();

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

this.profileform.patchValue(res.response.data)
      
    },err=>{
      if(err){
        this.loader.hideLodder();
      }
    })
      }

  
  
    // this.profileform.patchValue(this.user)
  // this.profileform.controls.firstName.setValue(this.user.firstName);
  // this.profileform.controls.lastName.setValue(this.user.lastName);
  // this.profileform.controls.address.setValue(this.user.address);
  // this.profileform.controls.email.setValue(this.user.email);
  }

  createProfile() {
    this.isSubmit = true;
    if(this.profileform.valid){
if(this.userImgae!=''){

  this.loader.showLoader();
  // let formdata=new FormData();
  // formdata.append('firstName',this.profileform.controls.firstName.value),
  // formdata.append('lastName',this.profileform.controls.lastName.value),
  // formdata.append('gender',this.profileform.controls.gender.value),
  // formdata.append('userId', ),
  // formdata.append('email',this.profileform.controls.email.value),
  // formdata.append('image',this.userImgae.imgBlob,this.userImgae.fileName),
  // formdata.append('address',this.profileform.controls.address.value)
  // console.log(formdata);
   
  // this.Api.updateUser(formdata).subscribe((res: any) => {
    let data = {
      firstName: this.profileform.controls.firstName.value,
      lastName: this.profileform.controls.lastName.value,
      gender: this.profileform.controls.gender.value,
      userId: localStorage.getItem('userid'),
      email: this.profileform.controls.email.value,
      imageType:'1',
      image:this.userImgae,
  
      // email: this.userReg.email ? this.userReg.email : '',
      address:this.profileform.controls.address.value,
    }
     
    this.Api.updateUser(data).subscribe((res: any) => {
    if (res.response.status == 1) {
      this.loader.hideLodder();
      this.toastController.create({
        message: res.response.data.message,
        duration: 2000
      }).then((toast) => {
        toast.present();
      });

      // this.userReg = Object.assign(this.userReg, data);
      // localStorage.setItem('reguser', JSON.stringify(data));
    } else {
      this.loader.hideLodder();
      this.toastController.create({
        message: res.response.data.message,
        duration: 2000
      }).then((toast) => {
        toast.present();
      });
    }
  }, err => {
    console.log(err);
    this.loader.hideLodder();

  });
}
else{
  let alert=this.alert.create({
    message:'please select proile image',
    buttons:[{
      text:'Ok',
      role:'Close',

    }],
    mode:'ios'
  });
  alert.then((res)=>{
  res.present();
  })
}
     
    }

  }

  profileFormInit(): void {
    this.profileform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      address:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),

    })
  }

  click_Image() {
    this.user.image='';

    let selection: any = this.Api.uploadPicCamGal();
    let token = localStorage.getItem('token');
    selection.then((res) => {
      if (res == 'Gallery') {

        this.Api.uploadGalPic().then((res: any) => {
this.userImgae=res;
this.user.image=res;
localStorage.setItem('image',res);

          

        }, (err) => {

          console.log(err,'1222');
        });
      }
      if (res == 'Camera') {


        this.Api.uploadCameraPic().then((res: any) => {
          if (res) {


            console.log('ehhh set karna',res);
            
            localStorage.setItem('image',res);
this.userImgae=res
this.user.image=res;


          }

        }, (err) => {
          console.log(err);

        });
      }
    },err => {
      console.log(err,'5252');
      
    });
  }

}
