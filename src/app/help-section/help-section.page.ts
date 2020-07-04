import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help-section',
  templateUrl: './help-section.page.html',
  styleUrls: ['./help-section.page.scss'],
})
export class HelpSectionPage implements OnInit {
  data:any
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
   }

  ngOnInit() {
  }

}
