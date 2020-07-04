import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, ActionSheetController, LoadingController } from '@ionic/angular';
import { LoaderService } from '../loader.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  avatarBlob: any = {};
  constructor(private file: File, public loader: LoaderService, public http: HttpClient, public httpNative: HTTP, public platform: Platform, private camera: Camera, public actionSheetCtrl: ActionSheetController) {

  }

  postApi(endpoint, data) {
    const headers = {
      "Content-Type": "application/json"
    };
    return this.http.post(endpoint, data, { headers: headers });
  }


  async presentActionSheet(title: any, buttons: any) {
    const actionSheet = await this.actionSheetCtrl.create({

      subHeader: title,
      buttons: buttons
    });
    await actionSheet.present();
  }
  takeGalPhoto(returnType = 'FILE_URI', quality = 30) {
    const options: CameraOptions = {
      quality: quality,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    }
    return this.camera.getPicture(options);
  }

  uploadPicCamGal() {
    return new Promise((resolve, reject) => {

      this.presentActionSheet("Take Picture", [
        {

          text: 'Gallery',
          handler: () => {
            resolve('Gallery');
          }
        },
        {
          text: 'Camera',
          handler: () => {
            resolve('Camera');
          }
        },
      ]);
    });
  }
  takeCameraPhoto(returnType = 'FILE_URI', quality = 30) {
    const options: CameraOptions = {
      quality: quality,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return this.camera.getPicture(options);
  }

  driverNearby(data) {
    return this.postApi(`${environment.apiUrl}returnNearByDrivers.php`, data);
  }
  forgetPassword(data) {
    return this.postApi(`${environment.apiUrl}forgotPassword.php`, data);
  }
  loginUser(data) {
    return this.postApi(`${environment.apiUrl}login.php`, data);
  }

  registerUser(data) {
    return this.postApi(`${environment.apiUrl}register.php`, data);
  }

  updateUser(data) {
    return this.postApi(`${environment.apiUrl}updateProfile.php`, data);
  }

  resend_OTP(data) {
    return this.postApi(`${environment.apiUrl}resendOtp.php`, data);
  }
  changePassword(data) {
    return this.postApi(`${environment.apiUrl}changePassword.php`, data);

  }
  getuserProfile(data) {
    return this.postApi(`${environment.apiUrl}returnUserProfile.php`, data);

  }
  saveCardDetails(data) {
    return this.postApi(`${environment.apiUrl}addUserCardDetails.php`, data);


  }
  getRideHistory(data) {
    return this.postApi(`${environment.apiUrl}userTripHistory.php`, data);

  }
  updateimage(data) {
    return this.http.post('http://ec2-34-202-4-19.compute-1.amazonaws.com/ws/testImage.php', data);
  }
  verifyOtp(data) {
    return this.postApi(`${environment.apiUrl}verifyOtpForChangePass.php`, data);
    
  }
  getTripById(data){
    return this.postApi(`${environment.apiUrl}returnTripByTripId.php`, data);

    
  }
  uploadGalPic() {

    return new Promise((resolve, reject) => {
      let camerarespone: any = this.takeGalPhoto();
      this.loader.showLoader();
      camerarespone.then(async (fileurl) => {
        // this.avatarBlob= await this.makeFileIntoBlob(fileurl)
        // console.log(this.avatarBlob,'avatarBlobcsccscscs:::::::::::::::::::::::::::::::: cameera');
        let base64Image = 'data:image/jpeg;base64,' + fileurl;

        this.loader.hideLodder();
        await resolve(base64Image);

      },
        (err) => {
          this.loader.hideLodder();
        });
    }).catch((err) => {
      this.loader.hideLodder();

    })
  }
  uploadCameraPic() {
    return new Promise((resolve, reject) => {
      let camerarespone: any = this.takeCameraPhoto();
      this.loader.showLoader();
      camerarespone.then(async (fileurl) => {

        let base64Image = 'data:image/jpeg;base64,' + fileurl;
        //  this.avatarBlob= await this.makeFileIntoBlob(fileurl)
        // console.log(this.avatarBlob,'csccscscs:::::::::::::::::::::::::::::::: cameera');

        this.loader.hideLodder();
        await resolve(base64Image);
      }, err => {
        console.log(err);

        this.loader.hideLodder();
      });

    });
  }


  payRide(data){
    return this.postApi(`${environment.apiUrl}stripePayment.php`, data);

  }
  getDriverLoc(data) {
    return this.postApi(`${environment.apiUrl}driverLocation.php`, data);
  }
  getDriverProfile(data){
    return this.postApi(`${environment.apiUrl}returnDriverProfile.php`, data);
      }

  cancel_current_Ride(data){
    return this.postApi(`${environment.apiUrl}cancelTrip.php`, data);
  }
  logoutuser(data) {

    return this.postApi(`${environment.apiUrl}logout.php`, data);

  }
  DriverRating(data){
    return this.postApi(`${environment.apiUrl}addDriverRatings.php`, data);

  }

  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;

          // get the path..
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          console.log('path', path);
          console.log('fileName', name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          console.log(imgBlob.type, imgBlob.size);

          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }


}