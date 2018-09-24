import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $("#login").click(function(){
        var phone = $("#mobileNumber").val();
        var data = '{"userId":"'+phone+'"}';
            $.ajax({
                type: 'POST',
                url: "http://localhost:8080/login",
                contentType: "application/json;charset=utf-8",
                data: data,
                success: function(resultData) { 
                    console.log(resultData);
                    window.location.href = '/profile';
                 }
            });
      });
    });
  }

}
