import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MapService } from '../map.service';
declare var H: any;
@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
})
export class HereMapComponent implements OnInit {
  appid="t6BdCL6ImpbmpT4LwERh";
  appcode="Xvebz8e72iJHZed-lDYDeQ";
  @ViewChild("map", { static: true }) mapElement: ElementRef;
  geocoder: any;
 
  router: any;
  platformH: any;
  map: any;
  isOriginSet = false;
  isDestinationSet = false;
  isRoutePathSet = false;
  destination: any;

  public directions: any;
  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  constructor(public geolocation: MapService) { 
    this.platformH = new H.service.Platform({
      "app_id": this.appid,
      "app_code": this.appcode,
      useHTTPS: true
    });


    let defaultLayers = this.platformH.createDefaultLayers();
        this.map = new H.Map(
          this.mapElement.nativeElement,
          defaultLayers.normal.map,
          {
            zoom: 10,
            center: { lat: this.geolocation.lat, lng: this.geolocation.lon }
          }
        );
  }




  public ngOnInit() {

    this.platformH = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode,
      useHTTPS: true
    });

    console.log(this.platformH);
    
    
    this.directions = [];
    this.geocoder = this.platformH.getGeocodingService();
    this.router = this.platformH.getRoutingService();
    

  }

  public ngAfterViewInit() {
    if (this.geolocation != null) {
      setTimeout(() => {

        let defaultLayers = this.platformH.createDefaultLayers();
        this.map = new H.Map(
          this.mapElement.nativeElement,
          defaultLayers.normal.map,
          {
            zoom: 10,
            center: { lat: this.geolocation.lat, lng: this.geolocation.lon }
          }
        );

        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        let coords = { lat: this.geolocation.lat, lng: this.geolocation.lon };
        var svgMarkup = '<svg height="54" viewBox="-96 0 464 464" width="54" xmlns="http://www.w3.org/2000/svg"><path d="m272 428c0-19.882812-60.890625-36-136-36s-136 16.117188-136 36 60.890625 36 136 36 136-16.117188 136-36zm0 0" fill="#adabac"/><path d="m120 160h32v256c0 8.835938-7.164062 16-16 16s-16-7.164062-16-16zm0 0" fill="#494342"/><path d="m232 96c0 53.019531-42.980469 96-96 96s-96-42.980469-96-96 42.980469-96 96-96 96 42.980469 96 96zm0 0" fill="#ad2943"/><path d="m200 96c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0" fill="#ee3446"/></svg>';
        var icon = new H.map.Icon(svgMarkup),
          marker = new H.map.Marker(coords, { icon: icon });
        this.map.addObject(marker);
        this.map.setCentre(coords);
      }, 2000)
    }
    else {
      setTimeout(() => {

        let defaultLayers = this.platformH.createDefaultLayers();
        this.map = new H.Map(
          this.mapElement.nativeElement,
          defaultLayers.normal.map,
          {
            zoom: 10,
            center: { lat: 56.1304, lng: 106.3468 }
          }
        );

        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        let coords = { lat: 56.1304, lng: 106.3468 }

        var svgMarkup = '<svg height="54" viewBox="-96 0 464 464" width="54" xmlns="http://www.w3.org/2000/svg"><path d="m272 428c0-19.882812-60.890625-36-136-36s-136 16.117188-136 36 60.890625 36 136 36 136-16.117188 136-36zm0 0" fill="#adabac"/><path d="m120 160h32v256c0 8.835938-7.164062 16-16 16s-16-7.164062-16-16zm0 0" fill="#494342"/><path d="m232 96c0 53.019531-42.980469 96-96 96s-96-42.980469-96-96 42.980469-96 96-96 96 42.980469 96 96zm0 0" fill="#ad2943"/><path d="m200 96c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0" fill="#ee3446"/></svg>';
        var icon = new H.map.Icon(svgMarkup),
          marker = new H.map.Marker(coords, { icon: icon });
        this.map.addObject(marker);
        this.map.setCentre(coords);
      }, 2000)
    }

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
  addmarker(lat, lon) {
    var svgMarkup = '<svg width="24" height="24" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
      'height="22" /><text x="12" y="18" font-size="12pt" ' +
      'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
      'fill="white">H</text></svg>';
    var parisMarker = new H.map.Marker({ lat: 48.8567, lng: 2.3508 });
    this.map.addObject(parisMarker);
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
      map.addObject(marker);
      map.setCenter(this.destination);
    } else {
      // this.calculateAndDisplayRoute(map);
    }

  }




  //rotuting is here

  calculateAndDisplayRoute(ori, des) {
    this.platformH = new H.service.Platform({
      "app_id": this.appid,
      "app_code": this.appcode,
    });
    let defaultLayers = this.platformH.createDefaultLayers();

    // var map=new H.Map(
    //   this.mapElement.nativeElement,
    //   defaultLayers.normal.map,
    //   {
    //     zoom: 10,
    //     center: { lat: 56.1304, lng: 106.3468 }
    //   }
    // );
    console.log(this.platformH);
    
    let routingParameters = {
      // The routing mode:
      'mode': 'fastest;car;traffic:enabled',
      // The start point of the route:
      'waypoint0': ori,
      // The end point of the route:
      'waypoint1': des,
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      'representation': 'display',
      'departure': 'now'
    };

    // Define a callback function to process the routing response:
    let onResult = function (result) {
      console.log(result);
      
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
          style: { lineWidth: 10 },
          arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
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

        // this.map.removeObjects(this.map.getObjects())
        // Add the route polyline and the two markers to the map:
        this.map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        this.map.setViewBounds(routeLine.getBounds());
      }
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






}