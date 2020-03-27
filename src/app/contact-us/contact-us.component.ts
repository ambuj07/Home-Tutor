import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var tabName = "Contact Us";
    $(".sidenav a").removeClass("active");
    $(".findJobs").addClass("active");
    const baseUrl = environment.baseUrl;
    var pathname = window.location.pathname;
    console.log(pathname)
    if(pathname == '/askQuestion'){
      tabName = "Ask Your Question";
      $(".reg-heading").text("Ask Your Question");
      $("#subject").val("Ask Your Question").selectpicker("refresh").closest(".bootstrap-select").hide();
    }else if(pathname == "/feedback"){
      tabName = "Feedback"
      $(".reg-heading").text("Feedback");
      $("#subject").val("Feedback").selectpicker("refresh").closest(".bootstrap-select").hide();
    }
    var userId = null;
    $(document).ready(function(){
      $("#viewTabName").text(tabName); 
      $(".sidenav a").removeClass("active");
      if(tabName == 'Ask Your Question'){
        $(".askQuestionA").addClass("active");
      }else if(tabName == "Feedback"){
        $(".feedbackA").addClass("active");
      }else{
        $(".contactUsA").addClass("active");
      }
      const user = localStorage.getItem("type");
      userId = localStorage.getItem("userId");
      if(userId != undefined && userId != null && userId != ""){
        if(user == 'STUDENT'){
          $.ajax({
                type: 'GET',
                url: baseUrl+"/student/"+userId,
                success: function(resultData) {
                  $("#from").val("STUDENT").selectpicker("refresh").closest(".bootstrap-select").hide();;
                  $("#name").val(resultData.name).attr("disabled",true);
                  $("#mobileNumber").val(resultData.mobile).attr("disabled",true);
                  $("#email").val(resultData.email);
               }
            });
        }else if(user == 'TUTOR'){
          $.ajax({
            type: 'GET',
            url: baseUrl+"/tutor/"+userId,
            success: function(resultData) {
                $("#from").val("TUTOR").selectpicker("refresh").closest(".bootstrap-select").hide();;
                $("#name").val(resultData.name).attr("disabled",true);
                $("#mobileNumber").val(resultData.mobile).attr("disabled",true);
                $("#email").val(resultData.email);
             }
          });
        }
      }
    });
    $('.fieldset').find('select,input,textarea,.form-group').click(function(){
      console.log($(this).attr("class"))
      $(this).removeClass('input-error');
      $(this).find(".dropdown-toggle").css("border-color","#ccc"); 
    });
    $("#submitBtn").click(function(){
      var error = false;  
      var comment = $("#comment").val();
      var subject = $("#subject").val();
      var from = $("#from").val();
      var name = $("#name").val();
      var mobileNumber = $("#mobileNumber").val();
      var email = $("#email").val();
      var data = '{"userId":"'+userId+'","comment":"'+comment+'","subject":"'+subject+'","from":"'+from+'","name":"'+name+'","mobileNumber":"'+mobileNumber+'","email":"'+email+'"}';
      $(this).parents('.fieldset').find('select,input,textarea').each(function () {
        if ($(this).is(":visible") && $(this).is(":required") && ($(this).val() == null || $(this).val() == "")) {
            $(this).addClass('input-error');
            $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#d03e3e");
            error = true;
            showToast("All fields with (*) are Mandatory");
        } else {
            $(this).removeClass('input-error');
            $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#ccc"); 
        }
      });
      if(!error){
        console.log(data)
            $.ajax({
                type: 'POST',
                url: baseUrl+"/contact",
                contentType: "application/json;charset=utf-8",
                data: data,
                success: function(resultData) {
                  $("#feedbackModal").modal('show');
                  setTimeout(function(){
                    $("#feedbackModal").modal('hide');
                  },3000);
                 },
                 error: function(resultData){
                   showToast(resultData.responseJSON.message)
                 }
            });
      }
    });
    //general functions
    $('#feedbackModal').on('hidden.bs.modal', function () {
      window.location.href = '/';
    });
    function showToast(data) {
      var x = document.getElementById("snackbar");
      x.className = "show";
      x.innerText = data;
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
  }

}
