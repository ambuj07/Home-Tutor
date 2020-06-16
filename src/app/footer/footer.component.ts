import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  pageTitle = 'hansa';
  isMobile: any;

  constructor() { }

  ngOnInit() {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  myFunction() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }



}
