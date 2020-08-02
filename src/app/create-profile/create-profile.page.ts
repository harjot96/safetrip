import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ToastController, AlertController, Platform, ActionSheetController } from '@ionic/angular';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {

  profileform: FormGroup;
  isSubmit: boolean = false;
  userReg: any = {};
  userImgae=''
  image="https://w0.pngwave.com/png/163/442/computer-icons-user-profile-icon-design-avatar-png-clip-art-thumbnail.png"

  constructor(private router: Router,public platform:Platform, public Api: ApiService,
    public toastController: ToastController,
    public alert:AlertController,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public zone: NgZone,
    public loader: LoaderService,
    public location: Location) { }

  ngOnInit() {
    setInterval(() => {
      if(localStorage.getItem('image')!=null )
      {
      let img=localStorage.getItem('image')
        this.image=img;
        
      }
    
    },100)
    
    let userReg = localStorage.getItem('reguser');
    console.log(userReg);
    if (userReg == null) {
      this.location.back();
      return;
    }

    this.userReg = JSON.parse(userReg);
    this.profileFormInit();
  }

  createProfile() {

    this.isSubmit = true;
    if(this.profileform.valid){

  this.loader.showLoader();
  let data = {
    firstName: this.profileform.controls.firstname.value,
    lastName: this.profileform.controls.lastname.value,
    gender: this.profileform.controls.type.value,
    userId: this.userReg.id,
    email: this.profileform.controls.email.value,
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

      this.userReg = Object.assign(this.userReg, data);
      localStorage.setItem('reguser', JSON.stringify(data));
      this.router.navigate(['/select-payment-method']);
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

  }

  profileFormInit(): void {
    this.profileform = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      address:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),

    })
  }

//   click_Image() {

//     let selection: any = this.Api.uploadPicCamGal();
//     selection.then((res) => {
//       if (res == 'Gallery') {

//         this.Api.uploadGalPic().then((res: any) => {
//           this.userImgae = res;
//           localStorage.setItem('image', res);
//           console.log(res);
//           }, 
//           (err) => {
//           console.log(err, '1222');
//           });
//           }
//       if (res == 'Camera') {


// this.Api.uploadCameraPic().then((res: any) => {
//           if (res) {
//             localStorage.setItem('image', res);
//             this.userImgae = res;
//           console.log(res);



//           }

//         }, (err) => {
//           console.log(err);

//         });
//       }
//     }, err => {
//       console.log(err, '5252');

//     });
//   }



  openCamera(sourceType) {
    const options: CameraOptions = {
      quality: 30,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      // encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.userImgae = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      alert(JSON.stringify(err))
    });

  }
  async click_Image() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.openCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.openCamera(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

}
