import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
})
export class TripDetailPage implements OnInit {
data:any;

  constructor(private route: ActivatedRoute) 
  {

this.route.queryParams.subscribe(params => {
  this.data=JSON.parse(params["data"])
});

   }

  ngOnInit() {
  }
  onRateChange(ev:any){
console.log(ev);

  }

}
