import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    const baseUrl = environment.baseUrl;
    //this.router.navigate(['profile'])
    var $this = this;
    $(document).ready(function(){
      $("#login").click(function(){
        var phone = $("#mobileNumber").val();
        var password = $("#password").val();
        var data = '{"userId":"'+phone+'","password":"'+password+'"}';
            $.ajax({
                type: 'POST',
                url: baseUrl+"/login",
                contentType: "application/json;charset=utf-8",
                data: data,
                success: function(resultData) { 
                    //$this.router.navigate(['/profile/'+resultData.type+'/'+resultData.refId])
                    localStorage.setItem("userName",resultData.detail.name);
                    localStorage.setItem("type",resultData.type);
                    localStorage.setItem("userId",resultData.refId);
                    if(resultData.type == "STUDENT"){
                      window.location.href = '/dashboard/student/'+resultData.refId
                    }else if(resultData.type == "TUTOR"){
                      window.location.href = '/dashboard/tutor/'+resultData.refId
                    }
                 }
            });
      });
    });
  }

}
