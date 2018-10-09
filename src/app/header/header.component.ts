import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var userName = localStorage.getItem("userName");
    var userId = localStorage.getItem("userId");
    var type = localStorage.getItem("type");
    console.log(userName+" == "+userId+" == "+type);
    if(userName != null && userId != null && type != null){
      $("#userName").text(userName);
      $(".before-login-menu").attr("hidden", true);
      $(".after-login-menu").attr("hidden", false);
    }else{
      $(".before-login-menu").attr("hidden", false);
      $(".after-login-menu").attr("hidden", true);
    }
    $("#viewProfile").click(function(e){
      e.preventDefault();
      if(type == "TUTOR"){
        window.location.href = '/profile/tutor/'+userId;
      }
      if(type == "STUDENT"){
        window.location.href = 'profile/student/'+userId;
      }
    });
    $("#logout").click(function(e){
      e.preventDefault();
      localStorage.clear();
      window.location.href = '';
    });
  }

}
