import { Injectable } from '@angular/core';
//import { Geolocation,  Geoposition, GeolocationOptions} from '@ionic-native/geolocation';
// $ ionic cordova plugin add cordova-plugin-network-information
// $ npm install --save @ionic-native/network@4
// import { Observable } from 'Rxjs/rx';
import { Platform, LoadingController } from '@ionic/angular';
import { GeolocationProviderService } from './geolocation-provider.service';
declare var H;

@Injectable({
  providedIn: 'root'
})
export class HeremapService {
  app_id = 'dvqdsegA1jJuYN0qzW1p';
  app_code = 'jrkMW5QR337JhQc8tQ6EAA';
  platformH: any;
  mapElement: any;
  pleaseConnect: any;
  map: any;
  geocoder: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  Markers: any = {};
  directionsService: any;
  directionsDisplay: any;
  origin: any;
  destination: any;
  isOriginSet = false;
  isDestinationSet = false;
  isRoutePathSet = false;
  geoWatch: any;
  lastCalculate: any = 0;
  marker: any;
  user = `<svg enable-background="new 0 0 80 240" id="Layer_1" version="1.1" viewBox="0 0 80 240" xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg" width="44.000000pt" height="44.000000pt" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path 
   d="M13.4,105c0,0,1,9.1,1.3,12.3s1.3,5.5,2.1,7.3s4.5,6.2,5,5.9c0.5-0.3-0.3-2.1-0.3-2.5  
    c0-0.4,0.4-1.7-0.2-2.5c-0.6-0.7-1.7-4-1.6-4.7c0.1-0.7,1.4-0.9,1.5-1.4c0.1-0.5,0.1-0.5,0.1-0.5s-3.6-6-3.6-8.6
       c0-2.7-0.1-6.1-0.1-6.1s-0.6-0.3-2,0C14.2,104.4,13.4,105,13.4,105z" fill="#FBD7C7"/><path d="M28.1,216.9c0.6,1.8-6.7,11.8,7.1,13.5c20.6,2.7,21.6-13.7,29.3-18.2   c13.9-8.1-3.1-14.1-22.5-14.1c-16.3,0.1-30.5,1.9-29.4,10.1C13.3,214.3,27.2,213.8,28.1,216.9z" fill="#262626" opacity="0.3"/><path d="M34,200.2c0,0-1.6,1.2-5.5,1.1s-7.3-0.8-11.4,1.5c-4.8,2.7-1.2,7,0.1,7.4c1.3,0.4,18.1,0.9,21.2,0.7   s2.1-8.2,2.1-8.2L34,200.2z" fill="#762C07"/><path d="M39.4,209.1c-1.5,0.1-9,0.6-13.5,0.5c-5-0.1-6.4-0.5-7.8-1c-1.7-0.6-3.2-1.4-3.3-3.1   c-0.5,2.2,0.9,4.1,2.5,4.6c1.5,0.5,3.3,0.9,8.6,1.1c4.2,0.1,11.3-0.3,12.6-0.4c0.8-0.1,1.4-0.7,1.7-1.6   C39.8,209.5,39.7,209.1,39.4,209.1z" fill="#262626"/><path d="M39.7,211c0,0-3.9,4.4-6.6,7.6c-2.7,3.2-3.8,5.6-3.6,7.9s3.5,3.4,8,3.4s9.3-2.8,11.5-5.9   c2.3-3.1,5.6-5.9,5.6-7.4c0-1.5-0.1-6.2-0.1-6.2L39.7,211z" fill="#762C07"/><path d="M54.6,210.4l-0.5,0c0,1.5,0.1,3.3,0.1,4.1c0,1.5-3.4,4.3-5.6,7.4c-2.3,3.1-7,5.9-11.5,5.9   c-3.5,0-6.3-0.6-7.4-2c0,0.2,0,0.4,0,0.6c0.1,2.3,3.5,3.4,8,3.4c4.6,0,9.3-2.8,11.5-5.9c2.3-3.1,5.6-5.9,5.6-7.4   C54.7,215.1,54.6,210.4,54.6,210.4z" fill="#262626"/><path d="M19.7,114.3c0,0-0.5,13,1.6,23.9c2.1,10.9,9.5,26.4,9.5,31.1s2.3,19,2.1,22.8c-0.1,3.8-0.9,8.6-0.9,8.6   s2.7,5,6.2,6.7c3.5,1.7,7.2-0.4,7.2-0.4l-6.4-90.5L19.7,114.3z" fill="#3399CC"/><path d="M19.7,114.3c0,0-0.5,13,1.6,23.9c2.1,10.9,9.5,26.4,9.5,31.1s2.3,19,2.1,22.8c-0.1,3.8-0.9,8.6-0.9,8.6   s2.7,5,6.2,6.7c3.5,1.7,7.2-0.4,7.2-0.4l-6.4-90.5L19.7,114.3z" opacity="0.2"/><path d="M31.1,119.4c0,0,0.3,14.3-0.3,25.6c-0.5,11.3,2.3,21.7,3.4,25.3c1.1,3.6,1.5,9.7,1.5,15.2   c0,5.5,0.2,26.2,1,27c0.8,0.8,5.2,3.6,10.9,4c4.3,0.3,9-2.4,9-3.1s1.5-16.4,0.3-29.1c-1.2-12.7-3.8-19.3-3.6-21.3   c0.1-2,3.1-29.1,2.8-34.7c-0.3-5.6-2-18.4-2-18.4L31.1,119.4z" fill="#3399CC"/><path d="M17.9,69.4c0,0-2.2,7.4-3.6,17.6c-1.5,10.7-0.7,25.3-0.7,25.3s2.1-1.6,6.2-1.6S17.9,69.4,17.9,69.4z" fill="#FFCC00"/><path d="M17.9,69.4c0,0-2.2,7.4-3.6,17.6c-1.5,10.7-0.7,25.3-0.7,25.3s2.1-1.6,6.2-1.6S17.9,69.4,17.9,69.4z" opacity="0.2"/><path d="M51.5,127c0,0-0.4,2.9-2.3,5.1c-1.9,2.1-3.5,5.8-3.5,7.3c0,2.1,0,3.9,0.9,4c1.8,0.2,1.1-1.3,1.7-1.3   s0.3,2.6,3,2.7c3.5,0.1,8.5-2.3,8.5-4.6c0-1.2-0.5-4.4-0.9-6.2c-0.5-1.9-0.5-4.5-0.5-4.5L51.5,127z" fill="#FBD7C7"/><path d="M38.8,44c9.5,2.5,20.1,4.6,23.7,12.3c3.1,6.6,2.9,8.7,2.7,14.9c-0.3,6.2-0.8,18.5-0.5,22.5   c0.3,4-1.1,20.8-2.3,26.4s-1.6,10.3-2.5,10.6c-0.9,0.3-10.2-0.9-9.5-2.3c0.9-2,1.2-7.6,1.2-7.6s-4.4,5.4-14.2,4   c-9.8-1.3-18.2-6.1-19.1-8.6c-0.4-1.2-0.6-19.8,0.3-24.8s-2-15.7-2.1-20.4c-0.1-4.7,2.9-17.4,3.1-19.7C19.7,47.9,23.8,40.1,38.8,44   z" fill="#FFCC00"/><path d="M51.5,120.9c0,0,0.7-5.2,0.7-9.8c0-4.6,0.1-11.3-0.4-13.9c-0.5-2.7-2.2-12.2-2.5-14.7   c-0.7-6.1-0.3-9.8,0.2-11.1c-2.4,4.1-1,19-0.3,25.2c0.9,8.7-0.3,25.8-0.6,26.6C48.3,123.9,51.5,120.9,51.5,120.9z" opacity="0.2"/><path d="M42.5,38.2c0,0,0,5.2,0.9,6.1s3,1.3,2.3,2.6c-0.7,1.3-8.1,9.7-13.5,9.2c-5.3-0.5-4-9.4-4-9.4L42.5,38.2z" fill="#FBD7C7"/><path d="M22.8,26.5c-2.2,2.8-1.3,11-0.3,14.7s2.2,5.9,2.7,7.3c0.4,1.4,1.9,3.6,3.9,3.5s8.2-4.1,10.1-7.1   c1.8-3,4.4-5.9,4.8-7.9c0.4-2,0.6-2.9-1.1-3.3c-1.7-0.4-5.3-7.8-9.9-8.1S24.1,24.8,22.8,26.5z" fill="#FBD7C7"/><path d="M21.5,28.4c-0.4,1.6,0.8,3.3,5.5,3.3s7.6-2.3,8.1-0.8c0.5,1.5,1.8,5.7,2.2,6.6c0.4,0.9,1,2,1.3,1.6   s1.8-3.9,2.9-4.7c1.1-0.8,1.7-0.8,1.7-0.8s1.6-8.3-2-12.6C37.6,16.7,25,15.6,21.5,28.4z" fill="#825012"/><path d="M25,46.6c0,0,0.7-0.7,1.6-0.8c0.4,0,1.3,0.1,1.9,0.2c0.8,0.2,2.7,1.1,2.7,1.1s-2.8,0-3.7-0.1   C26.4,46.9,25,46.6,25,46.6z" fill="#825012"/><path d="M26.8,49l1.2,0.1c0,0-0.2,0.6,0.6,1.3s2.9,0.8,2.9,0.8s-1.7,1.3-3.2,0.9c-1.5-0.4-2.3-1.8-2.3-1.8  
        s0.5-0.1,0.6-0.5C26.8,49.4,26.8,49,26.8,49z" fill="#825012"/></g></svg>`;

  driver = `<svg enable-background="new 0 0 480 400" id="Layer_1" version="1.1" viewBox="0 0 480 400" xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg" width="44.000000pt" height="44.000000pt"  xmlns:xlink="http://www.w3.org/1999/xlink">
      <polygon fill="#262626" opacity="0.3" points="330,355 470,285 150,125 10,195 "/><g>
      <polygon fill="#2D3134" points="69.3,196.4 119.5,182.4 84.9,162.5 67.4,179.4  "/>
      <polygon fill="#2D3134" points="261.7,296.2 311.9,282.2 277.2,262.3 259.7,279.2  "/>
      <polygon opacity="0.29" points="69.3,196.4 119.5,182.4 84.9,162.5 67.4,179.4  "/>
      <polygon opacity="0.29" points="261.7,296.2 311.9,282.2 277.2,262.3 259.7,279.2  "/>
       <g><path d="M298.4,276.3c-6.7-3.4-12.8-3.8-17.3-1.7l0,0l-9.5,5.1l0,0c-4.8,2.2-7.9,7.1-7.9,14.3 
        c0,13.9,11.3,30.9,25.2,37.8c6.9,3.4,13.1,3.8,17.7,1.6c0,0,9.4-5,10.4-5.6c4.1-2.4,6.6-7.1,6.6-13.6 
        C323.6,300.2,312.3,283.3,298.4,276.3z" fill="#2D3134"/><path d="M306.9,333.3c1.8-0.9,9.2-4.9,10.1-5.5c4.1-2.4,6.6-7.1,6.6-13.6c0-5.6-1.8-11.7-4.9-17.4l-9.5,5.1  
        c3.1,5.7,4.9,11.8,4.9,17.4C314.2,326.1,311.4,331,306.9,333.3z" opacity="0.29"/><g><path d="M314.2,319.3c0,13.9-11.3,19.6-25.2,12.6c-13.9-7-25.2-23.9-25.2-37.8s11.3-19.6,25.2-12.6 
        C302.9,288.4,314.2,305.4,314.2,319.3z" fill="#2D3134"/><path d="M308.6,316.5c0,10.9-8.8,15.3-19.7,9.9c-10.9-5.4-19.7-18.7-19.7-29.6c0-10.9,8.8-15.3,19.7-9.9   
        C299.8,292.4,308.6,305.6,308.6,316.5z" fill="#E5E5E5"/><g><path d="M301.9,325.3c3-1.7,4.8-5,4.8-9.7c0-0.4,0-0.8,0-1.1l-11-1.7L301.9,325.3z" fill="#2D3134"/><path d="M293.1,303.6l11.5,2.5c-2.4-5.7-6.7-11.3-11.9-14.9L293.1,303.6z" fill="#2D3134"/><path d="M284.8,299.5l0.4-12c-5.2-1.5-9.5-0.3-11.9,3L284.8,299.5z" 
        fill="#2D3134"/><path d="M271.2,296.7c0,0.4,0,0.7,0,1.1c0,4.7,1.8,9.8,4.8,14.5l6.3-6.2L271.2,296.7z" fill="#2D3134"/><path d="M288.9,314.2l-6.8,5.5c2.1,1.9,4.4,3.5,6.8,4.7c2.4,1.2,4.7,1.9,6.8,2L288.9,314.2z" fill="#2D3134"/></g></g><path d="M314.2,319.3c0,13.9-11.3,19.6-25.2,12.6s-25.2-23.9-25.2-37.8s11.3-19.6,25.2-12.6  
        C302.9,288.4,314.2,305.4,314.2,319.3z" opacity="0.11"/></g><g><path d="M106.2,179.6c-6.7-3.4-12.8-3.8-17.3-1.7l0,0l-9.5,5.1l0,0c-4.8,2.2-7.9,7.1-7.9,14.3   
        c0,13.9,11.3,30.9,25.2,37.8c6.9,3.4,13.1,3.8,17.7,1.6c0,0,9.4-5,10.4-5.6c4.1-2.4,6.6-7.1,6.6-13.6   
       C131.5,203.5,120.2,186.6,106.2,179.6z" fill="#2D3134"/><path d="M114.8,236.6c1.8-0.9,9.2-4.9,10.1-5.5c4.1-2.4,6.6-7.1,6.6-13.6c0-5.6-1.8-11.7-4.9-17.4l-9.5,5.1 
       c3.1,5.7,4.9,11.8,4.9,17.4C122,229.4,119.2,234.2,114.8,236.6z" opacity="0.29"/><g><path d="M122,222.5c0,13.9-11.3,19.6-25.2,12.6c-13.9-7-25.2-23.9-25.2-37.8c0-13.9,11.3-19.6,25.2-12.6    
       C110.7,191.7,122,208.6,122,222.5z" fill="#2D3134"/><path d="M116.5,219.8c0,10.9-8.8,15.3-19.7,9.9s-19.7-18.7-19.7-29.6c0-10.9,8.8-15.3,19.7-9.9    
       S116.5,208.9,116.5,219.8z" fill="#E5E5E5"/><g><path d="M109.8,228.5c3-1.7,4.8-5,4.8-9.7c0-0.4,0-0.8,0-1.1l-11-1.7L109.8,228.5z" fill="#2D3134"/><path d="M100.9,206.8l11.5,2.5c-2.4-5.7-6.7-11.3-11.9-14.9L100.9,206.8z" fill="#2D3134"/>
      <path d="M92.7,202.7l0.4-12c-5.2-1.5-9.5-0.3-11.9,3L92.7,202.7z" fill="#2D3134"/><path d="M79.1,199.9c0,0.4,0,0.7,0,1.1c0,4.7,1.8,9.8,4.8,14.5l6.3-6.2L79.1,199.9z" fill="#2D3134"/><path d="M96.8,217.5l-6.8,5.5c2.1,1.9,4.4,3.5,6.8,4.7c2.4,1.2,4.7,1.9,6.8,2L96.8,217.5z" fill="#2D3134"/></g></g><path d="M122,222.5c0,13.9-11.3,19.6-25.2,12.6s-25.2-23.9-25.2-37.8c0-13.9,11.3-19.6,25.2-12.6    C110.7,191.7,122,208.6,122,222.5z" opacity="0.11"/></g><path d="M441,221c-19.3-17.2-102.5-82.6-116.4-92.9c-13.9-10.3-64.2-41.9-98-50.6c-33.8-8.7-38-3.6-44.9-5.1   c-6.9-1.5-27.4-6.3-57.6,3c-12.9,4-28.2,8.4-40.7,19.6c-16.6,14.8-29.4,37.8-35.6,50.3l-1.3,4.2c-2.3,7.5-1.3,15.7,2.7,22.4   c3.4,5.7,7.7,12.3,10.9,15.9c2.8,3.1,6.2,6.4,9.1,9.2c0-0.2,0-0.5,0-0.7c0-10.6,6.2-17.4,15.8-17.4c3.8,0,7.9,1.1,12.1,3.2   c14.5,7.2,26.2,24.9,26.2,39.4c0,1.9-0.2,3.7-0.6,5.4l138.9,69.4c-0.1-1.1-0.2-2.2-0.2-3.2c0-10.6,6.2-17.4,15.8-17.4   c3.8,0,7.9,1.1,12.1,3.2c14.5,7.2,26.2,24.9,26.2,39.4c0,1.7-0.2,3.2-0.5,4.7l11.1,5.5c0,0,20.8,5.4,34.1,4.2   c13.3-1.2,40.7-10.2,62.7-21.1c22-10.9,40.6-30.1,41-40.1C464.1,267.7,460.3,238.2,441,221z" fill="#F8EBCB"/><path d="M363.8,162.5c0,0-1.2-8.4,0-10.6c1.2-2.1,3.3-5.4,6-3c2.7,2.4,5.7,9.3,3,15.7   C370.1,171,363.8,162.5,363.8,162.5z" fill="#F8EBCB"/><path d="M58.8,129.7c0,0,64.4,44.5,138.4,84.3s112.9,62.4,112.9,62.4l-45.7-39.2l-163.9-95.6   L58.8,129.7z" fill="#FFFFFF" opacity="0.3"/><path d="M102.1,142.6l162.2,94.7c0,0-15.7-69-71.1-96.8S102.1,142.6,102.1,142.6z" fill="#2D3134"/><path d="M169.7,91.4c21.6-10.2,39.2-13.3,39.2-15.4c0-2.1-55.5-4.8-89.8,12.4s-32.6,32-19.6,30.4s30.4-3,35.9-5.7   S151.3,100.1,169.7,91.4z" fill="#2D3134"/><path d="M98.9,116.5c-1.3,0-4.4-0.3-4.9-2.6c-0.8-3.4,3.8-12.9,27.1-24.5c25.5-12.7,61.4-13.7,71.8-13.7   c5.3,0,9.3,0.2,12,0.5c-1.4,0.5-2.9,1-4.5,1.5c-7.2,2.3-18.1,5.8-30.2,11.6c-12.3,5.8-21.3,12.5-27.2,16.8c-3.1,2.2-5.5,4-7.2,4.9   c-4.2,2.1-17.2,3.5-28.6,4.8c-2.3,0.3-4.6,0.5-6.7,0.7C99.9,116.5,99.4,116.5,98.9,116.5L98.9,116.5z" fill="#656565"/><path d="M244.4,169.5c-2,5.5,30.1,59.7,40.1,62.4c9.9,2.7,39.8,1.8,69.3-14.5c29.5-16.3,35-28.9,33.5-33.5   c-1.5-4.5-58.2-52.2-67.5-53.1S246.8,162.8,244.4,169.5z" fill="#2D3134"/><path d="M323.1,287c0,0,4.2-5.6,15.5-6.9c11.3-1.2,25.1-0.1,35.4,9.1c7.7,6.9,10.5,9.8,10.5,9.8   s-21.8,7.1-32.6,5.6C341.2,303.1,323.1,287,323.1,287z" fill="#FFFFFF" opacity="0.2"/><path d="M325.2,285.1c0,0,3.9-5.2,14.3-6.3s23.2-0.1,32.7,8.4c7.1,6.3,9.7,9,9.7,9s-20.1,6.6-30.1,5.2   S325.2,285.1,325.2,285.1z" fill="#E5E5E5"/><path d="M444.4,267.4c0,0,15.2-14.2,14.4-18.2c-0.8-4.1-12.5-24.3-14-21.3s-4.7,7.8-3.5,11.9   C442.5,243.9,444.7,263.8,444.4,267.4z" fill="#FFFFFF" opacity="0.2"/><path d="M444.3,264.6c0,0,14.3-14.2,13.6-18.2c-0.8-4.1-12.5-24.3-14-21.3c-1.5,3-4.7,7.8-3.5,11.9   C441.6,241,444.6,260.9,444.3,264.6z" fill="#E5E5E5"/><path d="M353.7,324.5l-0.5,4.4c0,0,44.7-5.7,72.8-23c28-17.3,34.8-30.8,34.8-30.8s-21.6,23.4-48,34.2   C385.1,320.5,353.7,324.5,353.7,324.5z" fill="#2D3134"/><path d="M380.9,180.2c-5.1-4.9-14.8-13.5-27.1-23.4c-20-16.2-31.7-23.7-34.5-23.9c0,0-0.1,0-0.1,0   c-4.1,0-20.4,6.8-38.6,16.2c-20.9,10.7-32.1,18.3-33.7,20.6c0.2,2.8,5.7,14.7,15.9,31.1c11.3,18.1,19.5,27.1,22.2,27.9   c1.5,0.4,3.4,0.7,5.6,0.9c13.2-2,36-7.1,58.2-20.2C367.6,198.3,376.6,187.6,380.9,180.2z" fill="#656565"/><path d="M115.8,138.8l-2.1,6.3l62.4,36.4l10-40.2l-0.3-0.4c-13.2-5.8-26.2-8.7-38.9-8.7   C133.6,132.3,123,135.6,115.8,138.8z" fill="#656565"/><path d="M247.3,223.1l2.5-15.3c-1.1-2.3-2.2-4.6-3.5-7c-9.4-17.8-26-41.7-52.3-55.8l0,0l-6.2,43.3L247.3,223.1z" fill="#656565"/><path d="M126.2,169.6c0,2.9-2.4,4.1-5.3,2.7c-2.9-1.5-5.3-5-5.3-8s2.4-4.1,5.3-2.7   C123.8,163.1,126.2,166.6,126.2,169.6z" opacity="0.2"/><path d="M112.4,160.6l-2.3,2.6c0,0,16.7,10.9,18.2,8.7C129.9,169.8,112.4,160.6,112.4,160.6z" fill="#F8EBCB"/><path d="M197.4,210.1c0,2.9-2.4,4.1-5.3,2.7c-2.9-1.5-5.3-5-5.3-8c0-2.9,2.4-4.1,5.3-2.7   C195,203.6,197.4,207.1,197.4,210.1z" opacity="0.2"/><path d="M183.6,201l-2.3,2.6c0,0,16.7,10.9,18.2,8.7C201.1,210.2,183.6,201,183.6,201z" fill="#F8EBCB"/><path d="M263.9,237.2c0,0.1-1.8,7-3.3,15.4c-1.4,7.6-2.2,32.8-2.4,37.3l-79.6-40.3c-0.1-1.6-1.2-16.5-1.2-30.1   c0-14.3,3.6-30.2,3.6-30.3l-0.9-0.2c0,0.2-3.6,16.2-3.6,30.5c0,12.6,0.9,26.4,1.2,29.6l-39.6-20c-0.9-1.2-10.5-14.3-19.9-34.2   c-9.7-20.5-7.4-46.5-7.3-46.8l-0.9-0.1c0,0.3-2.4,26.5,7.4,47.3c9.9,20.8,20,34.3,20.1,34.4l0.1,0.1L259,291.4l0-0.7   c0-0.3,0.9-29.6,2.4-37.9c1.5-8.3,3.3-15.3,3.3-15.3L263.9,237.2z" opacity="0.2"/><path d="M359.1,286.2c0,3.6-2.9,7.9-6.5,9.7s-6.5,0.3-6.5-3.2c0-3.6,2.9-7.9,6.5-9.7S359.1,282.6,359.1,286.2z" opacity="0.3"/><path d="M369.1,288.8c0,2.5-2,5.5-4.5,6.8c-2.5,1.2-4.5,0.2-4.5-2.3c0-2.5,2-5.5,4.5-6.8   C367.1,285.3,369.1,286.3,369.1,288.8z" opacity="0.3"/><path d="M344.7,292.1c0,1.3-1.1,3-2.4,3.6c-1.3,0.7-2.4,0.1-2.4-1.2s1.1-3,2.4-3.6   C343.6,290.2,344.7,290.7,344.7,292.1z" fill="#FFFFFF"/><path d="M356.4,288.9c0,1.8-1.5,4-3.2,4.9c-1.8,0.9-3.2,0.2-3.2-1.6s1.5-4,3.2-4.9   C354.9,286.4,356.4,287.1,356.4,288.9z" fill="#FFFFFF" opacity="0.4"/><path d="M367.4,290.6c0,1.3-1.1,3-2.4,3.6c-1.3,0.7-2.4,0.1-2.4-1.2s1.1-3,2.4-3.6   C366.3,288.7,367.4,289.3,367.4,290.6z" fill="#FFFFFF" opacity="0.4"/><path d="M341.1,284c0,1.3-1.1,3-2.4,3.6c-1.3,0.7-2.4,0.1-2.4-1.2s1.1-3,2.4-3.6C340,282.1,341.1,282.7,341.1,284z" fill="#FFFFFF"/><path d="M448,231.4c0,1.3-1.1,3-2.4,3.6c-1.3,0.7-2.4,0.1-2.4-1.2c0-1.3,1.1-3,2.4-3.6   C446.9,229.5,448,230,448,231.4z" fill="#FFFFFF"/><path d="M452.5,237.7c0,1.3-1.1,3-2.4,3.6c-1.3,0.7-2.4,0.1-2.4-1.2s1.1-3,2.4-3.6   C451.4,235.8,452.5,236.4,452.5,237.7z" fill="#FFFFFF"/><path d="M453.9,241.9c0,3.1-2.5,6.8-5.6,8.3s-5.6,0.3-5.6-2.8s2.5-6.8,5.6-8.3C451.4,237.6,453.9,238.9,453.9,241.9z   " opacity="0.3"/><path d="M450.6,245.2c0,1.6-1.3,3.5-2.8,4.3c-1.6,0.8-2.8,0.1-2.8-1.4s1.3-3.5,2.8-4.3   C449.3,243,450.6,243.6,450.6,245.2z" fill="#FFFFFF" opacity="0.4"/><path d="M449.4,250.3c0-2.5-2-3.5-4.5-2.3c-0.8,0.4-1.5,0.9-2.1,1.6c0.4,2.7,0.8,5.5,1.1,7.9   c0.3-0.1,0.7-0.2,1.1-0.4C447.4,255.9,449.4,252.8,449.4,250.3z" opacity="0.3"/><path d="M325.2,285c4.9-0.4,18.7-1.1,27.4,1c8.7,2.1,23.8,7.9,29.2,10.1c-0.6-0.6-3.4-3.4-9.6-8.9   c-9.5-8.5-22.3-9.5-32.7-8.4C330,279.8,325.9,284.2,325.2,285z" opacity="0.3"/><path d="M241.7,212.9c0,0,7.5,3.6,10.9,8.1c3.3,4.5,3.3,6.9,3.3,6.9s-20.8,4.5-31.1-2.1   C213.9,218.7,241.7,212.9,241.7,212.9z" fill="#F8EBCB"/><polygon fill="#2D3134" points="296.4,230.3 300.2,230 335.2,213 337.1,209.5 358.4,199.6 357.5,197.9 316.8,216 318,217.5    333.8,210.5 332.9,211.5 298.7,227.9  "/><polygon fill="#2D3134" points="333.4,220.9 336.7,220.9 364.6,200.2 368,192.2 378.7,178.6 378,177.6 357.9,200.5 358.7,201.7    364.1,196.9 362.6,199.6 334.3,219.2  "/><path d="M375.6,286.9l11.6,10.4c0,0,16.8-3.2,31.8-10.9c15-7.7,24-18.1,24-18.1l-1.2-15.2c0,0-6.8,12.3-26.4,22   C398,283.8,375.6,286.9,375.6,286.9z" fill="#2D3134"/><path d="M422.2,308.9c21.9-11,40.6-29.6,41-39.6c0.1-1.7,0.2-4.5-2.2-12.4c-0.2-0.7-1.1-0.8-1.5-0.2   c-7.7,11-20.8,25.3-41.2,35.1c-21.2,10.2-47.2,18.9-67.2,17.9c-4.7-0.2-5.5,4.5-5.9,11.9c-0.2,4.8,3.8,8.8,8.6,8.3   C371,328.2,398.6,320.7,422.2,308.9z" opacity="0.29"/><path d="M328.2,295.8c-7-7.9-47-49.9-57.4-66.3c-13.6-21.3-35.8-73.4-76.7-92.9c-41-19.5-87.4-11.2-101.4-10.2   c-8.5,0.5-21.7-2.6-30.9-5.2c-6,9.1-10.7,17.9-13.8,24.2l-1.3,4.2c-2.3,7.5-1.3,15.7,2.7,22.4c3.4,5.7,7.7,12.3,10.9,15.9   c2.8,3.1,6.2,6.4,9.1,9.2c0-0.2,0-0.5,0-0.7c0-10.6,6.2-17.4,15.8-17.4c3.8,0,7.9,1.1,12.1,3.2c14.5,7.2,26.2,24.9,26.2,39.4   c0,1.9-0.2,3.7-0.6,5.4l138.9,69.4c-0.1-1.1-0.2-2.2-0.2-3.2c0-10.6,6.2-17.4,15.8-17.4c3.8,0,7.9,1.1,12.1,3.2   c14.5,7.2,26.2,24.9,26.2,39.4c0,1.7-0.2,3.2-0.5,4.7l11.1,5.5c0,0,5.8,1.5,13.2,2.8C337.7,316.7,334,302.4,328.2,295.8z" opacity="0.11"/><path d="M49.4,148.5c0,0,6.3-16.1,9.8-21.1c3.5-5,7.4-9.5,7.4-9.5l-1.1-3c0,0-7.4,2.6-8.7,4.8   c-1.4,2.3-8.9,25.6-8.9,25.6L49.4,148.5z" fill="#CC291F"/><path d="M379,183.1c0.7-1,1.3-2,1.8-2.9c-5.1-4.9-14.8-13.5-27.1-23.4c-20-16.2-31.7-23.7-34.5-23.9c0,0-0.1,0-0.1,0   c-4.1,0-20.4,6.8-38.6,16.2c-20.9,10.7-32.1,18.3-33.7,20.6c0.1,0.9,0.7,2.9,1.9,5.6C291.4,161.5,338.1,164.2,379,183.1z" opacity="0.2"/><polygon fill="#E5E5E5" points="408.4,303.2 408.4,317.8 434.7,304.7 434.7,290.2  "/><path d="M444.3,264.6c0,0,14.3-14.2,13.6-18.2c-0.8-4.1-12.5-24.3-14-21.3c-1.5,3-4.7,7.8-3.5,11.9   C441.6,241,444.6,260.9,444.3,264.6z" opacity="0.2"/><path d="M245.8,173.9c-3.2-7.9-25.4-33.1-50-45.2c-31-15.2-58-15.2-63.5-14.4l-0.2-1.3c5.6-0.8,33-0.8,64.3,14.5   c10.9,5.3,22.7,14,33.4,24.4c8.5,8.2,15.4,16.9,17.3,21.5L245.8,173.9z" fill="#2D3134"/><path d="M325.1,135l-0.1-0.1c-10-7.3-36.7-26.7-61.3-38.7c-30.9-15.1-55-19.8-60.3-19.8V75c5.4,0,29.8,4.7,60.9,20   c24.7,12.1,51.4,31.5,61.5,38.8l0.1,0.1L325.1,135z" fill="#2D3134"/></g></svg>`;
  // Create an icon, an object holding the latitude and longitude, and a marker:
  icon = new H.map.DomIcon(this.driver);
  usericon = new H.map.DomIcon(this.user);
  usermarker = new H.map.DomMarker({ lat: 0, lng: 0 }, { icon: this.usericon })
  carMarker = new H.map.DomMarker({ lat: 0, lng: 0 }, { icon: this.icon });
  state = 'currentLocation';   // currentLocation || customLocation

  constructor(public platform: Platform,public loader:LoadingController) {

  }

  ///////////////////////
  // helping function
  //////////////////////
  disableMap(pleaseConnect): void {
    if (pleaseConnect) {
      pleaseConnect.style.display = "block";
    }
  }

  enableMap(pleaseConnect): void {
    if (pleaseConnect) {
      pleaseConnect.style.display = "none";
    }
  }
  // helping end //


  init(mapElement: any, pleaseConnect: any) {
    // this.mapElement = mapElement;
    // this.pleaseConnect = pleaseConnect;
    return new Promise((resolve, reject) => {
      if (typeof H == "undefined" || typeof H.service == "undefined") {
        this.disableMap(pleaseConnect);
        resolve(false);
      }
      else {

        this.disableMap(pleaseConnect);
        resolve(false);
      }
    });
  }

  initMap(mapElement, loc: any): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {


      let latlng = { lat: loc.lat, lng: loc.lng };

      let moveMapToBerlin = function (map) {
        map.setCenter(latlng);
        map.setZoom(10);
      };

      this.platformH = new H.service.Platform({
        'app_id': this.app_id,
        'app_code': this.app_code
      });

      let pixelRatio = window.devicePixelRatio || 1;
      let defaultLayers = this.platformH.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(
        mapElement,
        defaultLayers.normal.map, { pixelRatio: pixelRatio });

      //Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      // Create the default UI components
      let ui = H.ui.UI.createDefault(this.map, defaultLayers);

      // Now use the map as required...
      moveMapToBerlin(this.map);
      resolve(this.map);
    });
  }

  centerMap(latlng) {

    // Define a variable holding SVG mark-up that defines an icon image:
    let svgMarkup = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="24.000000pt" height="24.000000pt" viewBox="0 0 48.000000 48.000000"
        preserveAspectRatio="xMidYMid meet">
       <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
       fill="#000000" stroke="none">
       <path d="M145 447 c-87 -49 -111 -148 -60 -249 26 -52 98 -150 134 -182 21
       -19 21 -19 42 0 36 32 108 130 134 182 33 67 34 145 2 193 -52 77 -169 103
       -252 56z m145 -97 c43 -43 11 -120 -50 -120 -38 0 -70 32 -70 70 0 38 32 70
       70 70 17 0 39 -9 50 -20z"/>
       </g>
       </svg>`;

    // Create an icon, an object holding the latitude and longitude, and a marker:
    let icon = new H.map.Icon(svgMarkup);

    let marker = new H.map.Marker(latlng, { icon: icon });

    // Add the marker to the map and center the map at the location of the marker:
    this.map.addObject(marker);
    this.map.setCenter(latlng);
  }

  setOrgin(lat, lng, map) {
    this.origin = { lat: lat, lng: lng };
    if (this.isDestinationSet == false) {
      this.isOriginSet = true;
      let svgMarkup = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="24.000000pt" height="24.000000pt" viewBox="0 0 48.000000 48.000000"
                preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M145 447 c-87 -49 -111 -148 -60 -249 26 -52 98 -150 134 -182 21
              -19 21 -19 42 0 36 32 108 130 134 182 33 67 34 145 2 193 -52 77 -169 103
              -252 56z m145 -97 c43 -43 11 -120 -50 -120 -38 0 -70 32 -70 70 0 38 32 70
              70 70 17 0 39 -9 50 -20z"/>
              </g>
              </svg>`;
      // Create an icon, an object holding the latitude and longitude, and a marker:
      let icon = new H.map.Icon(svgMarkup);
      let marker = new H.map.Marker(this.origin, { icon: icon });
      // Add the marker to the map and center the map at the location of the marker:
      this.map.addObject(marker);
      this.map.setCenter(this.origin);
    } else {
      this.calculateAndDisplayRoute(this.map);
    }
  }

  setDestination(lat, lng, map) {
    this.destination = { lat: lat, lng: lng };
    if (this.isOriginSet == false) {
      this.isDestinationSet = true;
      let svgMarkup = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="24.000000pt" height="24.000000pt" viewBox="0 0 48.000000 48.000000"
                preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M145 447 c-87 -49 -111 -148 -60 -249 26 -52 98 -150 134 -182 21
              -19 21 -19 42 0 36 32 108 130 134 182 33 67 34 145 2 193 -52 77 -169 103
              -252 56z m145 -97 c43 -43 11 -120 -50 -120 -38 0 -70 32 -70 70 0 38 32 70
              70 70 17 0 39 -9 50 -20z"/>
              </g>
              </svg>`;
      // Create an icon, an object holding the latitude and longitude, and a marker:
      let icon = new H.map.Icon(svgMarkup);
      let marker = new H.map.Marker(this.destination, { icon: icon });
      // Add the marker to the map and center the map at the location of the marker:
      this.map.addObject(marker);
      this.map.setCenter(this.destination);
    } else {
      this.calculateAndDisplayRoute(this.map);
    }

  }



  calculateAndDisplayRoute(map) {
    localStorage.setItem('isRideSelected','true');
    let loader=this.loader.create({
      message:'please wait preparing route',
      mode:'ios',
    })
    loader.then((res)=>{
      res.present();
    })
    
    let routingParameters = {
      // The routing mode:
      'mode': 'fastest;car;traffic:enabled',
      // The start point of the route:
      'waypoint0': this.origin.lat + ',' + this.origin.lng,
      // The end point of the route:
      'waypoint1': this.destination.lat + ',' + this.destination.lng,
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      'representation': 'display',
      'departure': 'now',
      'routeAttributes': 'summary'
    };

    // Define a callback function to process the routing response:
    let onResult = function (result) {
      let route,
        routeShape,
        startPoint,
        endPoint,
        linestring;
      if (result.response.route) {
        // Pick the first route from the response:
        route = result.response.route[0];
        // Pick the route's shape:
        routeShape = route.shape;

        // Create a linestring to use as a point source for the route line
        linestring = new H.geo.LineString();

        // Push all the points in the shape into the linestring:
        routeShape.forEach(function (point) {

          var parts = point.split(',');
          linestring.pushLatLngAlt(parts[0], parts[1]);
        });

        // Retrieve the mapped positions of the requested waypoints:
        startPoint = route.waypoint[0].mappedPosition;
        endPoint = route.waypoint[1].mappedPosition;

        // Create a polyline to display the route:
        var routeLine = new H.map.Polyline(linestring, {
          style: { lineWidth: 5 },
          arrows: { fillColor: 'black', frequency: 2, width: 1, length: 1 }
        });

        // Create a marker for the start point:

        var startMarker = new H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude
        });

        // Create a marker for the end point:
        var endMarker = new H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude
        });

        map.removeObjects(map.getObjects())
        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        map.setViewBounds(routeLine.getBounds());
        loader.then((res)=>{
          res.dismiss();
        })
      }
      let distance = (startMarker.getPosition().distance(endMarker.getPosition())) / 1000
      console.log("::::::::::::::", distance / 1000);
      localStorage.setItem('distance', JSON.stringify(distance))

    };

    // Get an instance of the routing service:
    var router = this.platformH.getRoutingService();
    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult,
      function (error) {
        alert(error.message);
      });
  }


  public async geocode(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ searchText: query }, result => {
        if (result.Response.View.length > 0) {
          if (result.Response.View[0].Result.length > 0) {
            resolve(result.Response.View[0].Result[0].Location.DisplayPosition);
          } else {
            reject({ message: "no results found" });
          }
        } else {
          reject({ message: "no results found" });
        }
      }, error => {
        reject(error);
      });
    });
  }






  searchPlace(query: string) {
    return new Promise((resolve, reject) => {

      // Obtain an Explore object through which to submit search
      // requests:
      let search = new H.places.Search(this.platformH.getPlacesService());

      let latlng = '52.5159,13.3777';
      // if(this.geolocationProvider.latitude != 0 || this.geolocationProvider.longitude != 0)
      // {
      //     latlng = this.geolocationProvider.latitude + ',' + this.geolocationProvider.longitude;
      // }

      // Define search parameters:
      let params = {
        // Plain text search for places with the word "hotel"
        // associated with them:
        'q': query,
        //  Search in the Chinatown district in San Francisco:
        'at': latlng
      };

      // Define a callback function to handle data on success:
      let onResult = function (data) {
        let res = data.results.items || [];
        resolve(res);

      }

      // Define a callback function to handle errors:
      let onError = function (data) {
        let res = data.results.items || [];
        reject(res);
      }

      // Run a search request with parameters, headers (empty), and
      // callback functions:
      search.request(params, {}, onResult, onError);
    });
  }

  searchAddress(latlng) {
    let search = new H.places.Search(this.platformH.getPlacesService());
    search.reverseGeocode({
      at: latlng
    }, (result) => {
      result.items.forEach((item) => {
        console.log(item);


      });
    }, alert);

  }


  getAddress(position) {
    debugger
    let geocoder = new H.places.Search(this.platformH.getGeocodingService());
    geocoder.reverseGeocode({
      mode: "retrieveAddresses",
      maxresults: 1,
      prox: position.lat + "," + position.lng
    }, data => {
      console.log(data);

    })
  }


  addMarker(data) {
    console.log(data, 'heremap');
    let direction: any = { lat: data.currentLat, lng: data.currentLon }
    this.map.addObject(this.carMarker);
    this.carMarker.setGeometry(direction);
  }


  userCurrentLocation(data) {

    let current = { lat: data.lat, lng: data.lng };
    this.map.addObject(this.usermarker);
    this.usermarker.setGeometry(current);
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  removeallMarker() {
    this.map.removeObjects(this.map.getObjects());

  }


}
