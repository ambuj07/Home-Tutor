import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-update-work-experience',
  templateUrl: './update-work-experience.component.html',
  styleUrls: ['./../update-tutor-profile.component.css']
})
export class UpdateWorkExperienceComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      var id;
      this.route.params.subscribe(params => {
        id = params["id"];
      });
      $("#viewTabName").text("Update Profile");
      $(".sidenav a").removeClass("active");
      $("#editProfile").addClass("active");
      $(document).ready(function() {
        $('.selectpicker').selectpicker();
      });
      //experiance update function
      $(".formDiv_4 .tutorType").change(function(){
        var check = $(this).is(":checked");
        if(check){
          $(this).closest(".tutorCheck").find(".showOnCheck").css("display","block");
        }else{
          $(this).closest(".tutorCheck").find(".showOnCheck").css("display","none");
        }
    });
    $("#saveExperiences").click(function(){
      var jsonObj = [];
      $(".formDiv_4 .tutorType").each(function(){
        if($(this).is(":checked")){
          var grouped = {};
          var tutorType = $(this).val();
          var expid = $(this).closest(".tutorCheck").find(".expid").val();
          grouped["id"]= expid;
          grouped["tutorType"]= tutorType;
          if(tutorType == "HOME_TUTOR"){
            grouped["fromDate"]= $("#from1").val();
            grouped["toDate"]= $("#to1").val();
          }
          if(tutorType == "ONLINE_TUTOR"){
            grouped["fromDate"]= $("#from2").val();
            grouped["toDate"]= $("#to2").val();
          }
          if(tutorType == "TEACHING_AT_MY_PLACE"){
            grouped["fromDate"]= $("#from3").val();
            grouped["toDate"]= $("#to3").val();
          }
          if(tutorType == "FACUTLTY_AT_INSTITUTE"){
            grouped["institute"]= $("#faiName").val();
            grouped["address"]= $("#faiAddress").val();
            grouped["position"]= $("#faiposition").val();
            grouped["fromDate"]= $("#faiFrom").val();
            grouped["toDate"]= $("#faiTo").val();
          }
          if(tutorType == "FACULTY_AT_SCHOOL"){
            grouped["institute"]= $("#fasName").val();
            grouped["address"]= $("#fasAddress").val();
            grouped["position"]= $("#fasposition").val();
            grouped["fromDate"]= $("#fasFrom").val();
            grouped["toDate"]= $("#fasTo").val();
          }
          jsonObj.push(grouped);
        }
      });
       if(jsonObj.length > 0){
        console.log(JSON.stringify(jsonObj));
         $.ajax({
           type: 'POST',
           url: baseUrl+"/tutor/"+id+"/experience",
           contentType: "application/json;charset=utf-8",
           data: JSON.stringify(jsonObj),
           success: function(resultData) { 
             showToast("Working experience saved successfully.")
             setTimeout(function(){ 
               window.location.href = "tutor/experience/"+id;
              }, 3000);
            },
            error :function(resultData){
              console.log(resultData);
            }
       });
       }else{
        showToast("Please choose atleast one value");
       }
    });
    $.ajax({
      type: 'GET',
      url: baseUrl+"/tutor/"+id+"/experience",
      success: function(resultData) { 
        console.log(resultData);
        resultData.forEach(function (a) {
          if(a.tutorType == "HOME_TUTOR"){
            $("#from1").val(a.fromDate);
            $("#to1").val(a.toDate);
            $(".homeTutor").find(".expid").val(a.id);
            $(".homeTutor").find(".tutorType").prop('checked', true);
          }
          if(a.tutorType == "ONLINE_TUTOR"){
            $("#from2").val(a.fromDate);
            $("#to2").val(a.toDate);
            $(".onlineTutor").find(".expid").val(a.id);
            $(".onlineTutor").find(".tutorType").prop('checked', true);

          }
          if(a.tutorType == "TEACHING_AT_MY_PLACE"){
            $("#from3").val(a.fromDate);
            $("#to3").val(a.toDate);
            $(".teachingAtMyPlace").find(".expid").val(a.id);
            $(".teachingAtMyPlace").find(".tutorType").prop('checked', true);
          }
          if(a.tutorType == "FACUTLTY_AT_INSTITUTE"){
            $("#faiName").val(a.institute);
            $("#faiAddress").val(a.address);
            $("#faiposition").val(a.position);
            $("#faiFrom").val(a.fromDate);
            $("#faiTo").val(a.toDate);
            $(".facultyAtInstitute").find(".expid").val(a.id);
            $(".facultyAtInstitute").find(".tutorType").prop('checked', true);
          }
          if(a.tutorType == "FACULTY_AT_SCHOOL"){
            $("#fasName").val(a.institute);
            $("#fasAddress").val(a.address);
            $("#fasposition").val(a.position);
            $("#fasFrom").val(a.fromDate);
            $("#fasTo").val(a.toDate);
            $(".facultyAtSchool").find(".expid").val(a.id);
            $(".facultyAtSchool").find(".tutorType").prop('checked', true);
          }
        });
        $(".formDiv_4 .tutorType").each(function(){
          var check = $(this).is(":checked");
          if(check){
            $(this).closest(".tutorCheck").find(".showOnCheck").css("display","block");
          }else{
            $(this).closest(".tutorCheck").find(".showOnCheck").css("display","none");
          }
        });            
      }
    });
         //general functions
         function showToast(data) {
          var x = document.getElementById("snackbar");
          x.className = "show";
          x.innerText = data;
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        function checkNullOrUndefined(str){
          var blank = "";
          if(str == null || str == undefined){
            return blank;
          }else{
            return str
          }
        }
        $(document).on('change','.selectpicker',function() {
          $(this).next().blur();
        });
  }

}
