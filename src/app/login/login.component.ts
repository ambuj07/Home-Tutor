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
      $(document).ready(function() {
        $("#show_hide_password a").on('click', function(event) {
            event.preventDefault();
            if($('#show_hide_password input').attr("type") == "text"){
                $('#show_hide_password input').attr('type', 'password');
                $('#show_hide_password i').addClass( "fa-eye-slash" );
                $('#show_hide_password i').removeClass( "fa-eye" );
            }else if($('#show_hide_password input').attr("type") == "password"){
                $('#show_hide_password input').attr('type', 'text');
                $('#show_hide_password i').removeClass( "fa-eye-slash" );
                $('#show_hide_password i').addClass( "fa-eye" );
            }
        });
    });
      $("#login").click(function(){
        var error = false;  
        $(".registration-form").find('input[type="text"],input[type="password"]').each(function () {
            if ($(this).val() == "") {
                $(this).addClass('input-error');
                error = true;
            } else {
                $(this).removeClass('input-error');
            }
        });
        if(!error){
          var phone = $("#mobileNumber").val();
          var password = $("#password").val();
          var data = '{"userId":"'+phone+'","password":"'+password+'"}';
              $.ajax({
                  type: 'POST',
                  url: baseUrl+"/login",
                  contentType: "application/json;charset=utf-8",
                  data: data,
                  success: function(resultData) {
                      console.log(resultData) 
                      //$this.router.navigate(['/profile/'+resultData.type+'/'+resultData.refId])
                      localStorage.setItem("userName",resultData.detail.name);
                      localStorage.setItem("type",resultData.type);
                      localStorage.setItem("userId",resultData.refId);
                      localStorage.setItem("token",resultData.token);
                      if(resultData.type == "STUDENT"){
                        window.location.href = '/dashboard/student/'+resultData.refId
                      }else if(resultData.type == "TUTOR"){
                        window.location.href = '/dashboard/tutor/'+resultData.refId
                      }
                   },
                   error: function(resultData){
                     showToast(resultData.responseJSON.message)
                   }
              });
        }
      });
      function showToast(data) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerText = data;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
    });
  }

}
