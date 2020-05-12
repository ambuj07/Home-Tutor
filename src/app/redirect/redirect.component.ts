import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor() {  
     window.location.href = "http://52.66.142.214/admin";
  }

  ngOnInit() {
  }

}
