import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  data = [
    {
      text: 'I was  charged  a cancellation fee.',
      id: '1'
    },
    {
      text: 'I was involved in a accident.',
      id: '2'
    },
    {
      text: 'My driver was unprofessional.',
      id: '3'
    },
    {
      text: 'I lost an item.',
      id: '4'
    },
    {
      text: 'My trip had a bad route.',
      id: '5'
    },
    {
      text: 'I can`t request a ride.',
      id: '6'
    },
    {
      text: 'I can`t request a ride.',
      id: '6'
    },
    {
      text:'I my vechile wasn`t what i expected',
      id:'7'
    }


  ]
  constructor(public router:Router) { }

  ngOnInit() {
  }
  help(text){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(text)
      }
    };
this.router.navigate(['help-section'],navigationExtras);
  }

}
