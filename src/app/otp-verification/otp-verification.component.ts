import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
    var id = localStorage.getItem("userId");
    const baseUrl = environment.baseUrl;
    $(function() {

      var body = $('#form');
    
      function goToNextInput(e) {
        var key = e.which,
          t = $(e.target),
          sib = t.next('input');
        if (!sib || !sib.length) {
          sib = body.find('input').eq(0);
        }
        sib.select().focus();
      }
      
      function onFocus(e) {
        $(e.target).select();
      }
    
      body.on('keyup', 'input', goToNextInput);
      body.on('click', 'input', onFocus);
    
    })
    var seconds=59;
    var timer;
    function myFunction() {
      if(seconds < 60) { // I want it to say 1:00, not 60
        $("#countdown-number").text(seconds);
      }
      if (seconds >= 0 ) { // so it doesn't go to -1
        seconds--;
      } else {
        clearInterval(timer);
        $("#countdown,#waitingPara").prop("hidden",true);
        $("#resend").prop("hidden",false);
      }
    }
    if(!timer) {
      timer = window.setInterval(function() { 
        myFunction();
      }, 1000); // every second
    }
    $.ajax({
      type: 'GET',
      url: baseUrl+"/tutor/"+id,
      contentType: "application/json;charset=utf-8",
      success : function(data){
        $("#mobile").text(data.mobile);
      }
    });
    $("#submitOtp").click(function(){
      var otp="";
      $("input[type='tel']").each(function(){
        if($(this).val() == "" || $(this).val() == null || $(this).val() == undefined){
          $("#resultMsg").html('<span style="color:red;font-size:12px;">Otp mismatch</span>')
          setTimeout(function(){
            $("#resultMsg").html("");
          },2000);
        }else{
          otp += $(this).val();
        }
      });
      console.log(otp);
      var otpData = '{"otp":"'+otp+'"}';
      $.ajax({
        type: 'POST',
        url: baseUrl+"/tutor/"+id+'/validateOtp',
        contentType: "application/json;charset=utf-8",
        data: otpData,
        success : function(data){
          $("#resultMsg").html('<span style="color:green;font-size:12px;">Otp verified</span>')
          window.location.href = '/dashboard/tutor/'+id;
        },
        error : function(data){
          console.log(data);
          $("#resultMsg").html('<span style="color:red;font-size:12px;">'+data.responseJSON.message+'</span>')
          setTimeout(function(){
            $("#resultMsg").html("");
          },2000);
        }
      });
    });
    $("#resendOtp").click(function(){
      $("#resend").prop("hidden",false);
      $.ajax({
        type: 'POST',
        url: baseUrl+"/tutor/"+id+'/resendOtp',
        success : function(data){
          $("#sentAgain").prop("hidden",false);
        }
    });
    });
  }

}
