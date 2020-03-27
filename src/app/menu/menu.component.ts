import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }
  data :any;
  get isLoggedIn(): string {
    let loggedIn = "NO";
    let userId = localStorage.getItem('userId');
    let type = localStorage.getItem('type');
    if(userId != undefined && userId != null && userId != ""){
      if(type == 'TUTOR'){
        loggedIn = "TUTOR";
      }else if(type == 'STUDENT'){
        loggedIn = 'STUDENT';
      }
    }
    return loggedIn;
  }
  ngOnInit() {
  }

}
