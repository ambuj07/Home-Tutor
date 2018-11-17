import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-update-tutor-profile',
  templateUrl: './update-tutor-profile.component.html',
  styleUrls: ['./update-tutor-profile.component.css']
})
export class UpdateTutorProfileComponent implements OnInit {

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
        //toggle the component with class accordion_body
        $(".accordion_head").click(function() {
          if ($('.accordion_body').is(':visible')) {
            $(".accordion_body").slideUp(300);
            $(".plusminus").text('+');
          }
          if ($(this).next(".accordion_body").is(':visible')) {
            $(this).next(".accordion_body").slideUp(300);
            $(this).children(".plusminus").text('+');
          } else {
            $(this).next(".accordion_body").slideDown(300);
            $(this).children(".plusminus").text('-');
          }
        });
        $('.selectpicker').selectpicker();
      });
      var classHtml = '<option value="" disabled selected>Select Class</option>';
      var subjectHtml = '';
      $.ajax({
        type: 'GET',
        url: baseUrl+"/config",
        async:false,
        //dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            for(var i=0; i<resultData.classes.length; i++){
              classHtml += '<option value="'+resultData.classes[i].id+'">'+resultData.classes[i].name+'</option>';
            }
            for(var i=0; i<resultData.subjects.length; i++){
              subjectHtml += '<option value="'+resultData.subjects[i].id+'">'+resultData.subjects[i].name+'</option>';
            }
          }
        });
        $(".chooseClass").html(classHtml).selectpicker('refresh');
        $(".chooseSubject").html(subjectHtml).selectpicker('refresh');

        function addMoreClass(){
            var addMore1 = '<div class="row formDiv_1" style="margin-bottom: 10px !important;">';
            addMore1 += '<div class="col-md-5">';
            addMore1 += '<select class="selectpicker form-control chooseClass">'; 
            addMore1 += classHtml;         
            addMore1 += '</select>';
            addMore1 += '</div>';
            addMore1 += '<div class="col-md-6">';
            addMore1 += '<select class="selectpicker form-control chooseSubject" title="Select subjects" multiple>';             
            addMore1 += subjectHtml;  
            addMore1 += '</select>';
            addMore1 += '</div>';
            addMore1 += '<div class="col-md-1"><span class="removeClass removeBtn" style="background: #d4d4d0;padding: 5px 12px;position: relative;top: 4px;font-size: 20px;font-weight: bold;color:red;cursor: pointer;">-</span></div>'
            addMore1 += '</div>';
            $(".addMore_1").append(addMore1);
            $(".selectpicker").selectpicker('refresh');
        }
         $(document).on('click',".addMoreClass",function(){
          addMoreClass();
         });
         $(document).on('click',".removeClass",function(){
           $(this).closest(".formDiv_1").remove();
         });
         $("#saveClass").click(function(){
           var jsonObj = [];
           var error = true;
            $(".formDiv_1").each(function(){
              var classVal = $(this).find('select.chooseClass').val();
              var subjectVal = $(this).find("select.chooseSubject").val();
              console.log(classVal+" "+subjectVal.length)
              if(classVal == null && subjectVal.length == 0){
                error = true;
                $(this).find(".chooseClass").find(".dropdown-toggle").css("border-color","red");
                $(this).find(".chooseSubject").find(".dropdown-toggle").css("border-color","red");
              }else if(classVal == null){
                error = true;
                $(this).find(".chooseClass").find(".dropdown-toggle").css("border-color","red");
                $(this).find(".chooseSubject").find(".dropdown-toggle").css("border-color","#ccc");
              }else if(subjectVal.length == 0){
                error = true;
                $(this).find(".chooseClass").find(".dropdown-toggle").css("border-color","#ccc");
                $(this).find(".chooseSubject").find(".dropdown-toggle").css("border-color","red");
              }else{
                error = false;
                $(this).find(".chooseClass").find(".dropdown-toggle").css("border-color","#ccc");
                $(this).find(".chooseSubject").find(".dropdown-toggle").css("border-color","#ccc");
                for(var i=0; i<subjectVal.length;i++){
                  jsonObj.push({"classGroup": {"id": classVal},"subjectMaster": {"id": subjectVal[i]}})
                }
              }
            });
            if(!error && jsonObj.length > 0){
              console.log(JSON.stringify(jsonObj));
              $.ajax({
                type: 'POST',
                url: baseUrl+"/tutor/"+id+"/map",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(jsonObj),
                success: function(resultData) { 
                  showToast("Classes and subjects saved successfully.")
                  setTimeout(function(){ 
                    window.location.href = "editProfile/tutor/"+id;
                   }, 3000);
                 },
                 error :function(resultData){
                   console.log(resultData);
                 }
            });
            }
         });
         
        // Function for update qualification
        function addMoreQualification(){
            var addMore2 = '<div class="row formDiv_2" style="margin-bottom: 10px !important;">';
            addMore2 += '<div class="col-md-3">';
            addMore2 += '<input type="text" class="form-control degree" placeholder="Degree">'; 
            addMore2 += '</div>';
            addMore2 += '<div class="col-md-3">';
            addMore2 += '<input type="text" class="form-control board" placeholder="Board/University">'; 
            addMore2 += '</div>';
            addMore2 += '<div class="col-md-3">';
            addMore2 += '<input type="text" class="form-control institute" placeholder="Institute Name">'; 
            addMore2 += '</div>';
            addMore2 += '<div class="col-md-2">';
            addMore2 += '<input type="text" class="form-control passingYear" placeholder="Year">'; 
            addMore2 += '</div>';
            addMore2 += '<div class="col-md-1"><span class="removeQualification removeBtn" style="background: #d4d4d0;padding: 5px 12px;position: relative;top: 4px;font-size: 20px;font-weight: bold;color:red;cursor: pointer;">-</span></div>'
            addMore2 += '</div>';
            $(".addMore_2").append(addMore2);
        }
        $(document).on('click',".addMoreQualification",function(){
          addMoreQualification();
        });
        $(document).on('click',".removeQualification",function(){
          $(this).closest(".formDiv_2").remove();
        });

        $("#saveQualification").click(function(){
          var jsonObj = [];
          var error = true;
           $(".formDiv_2").each(function(){
             var degreeVal = $(this).find('.degree').val();
             var boardVal = $(this).find('.board').val();
             var instituteVal = $(this).find('.institute').val();
             var yearVal = $(this).find('.passingYear').val();
             console.log(degreeVal+" "+boardVal+" "+instituteVal+" "+yearVal)
             if(degreeVal == "" || boardVal == "" || instituteVal == "" || yearVal == ""){
               error = true;
               $(this).find('.form-control').css("border-color","red");
               if(degreeVal != ""){
                $(this).find('.degree').css("border-color","#ccc");
               }
               if(boardVal != ""){
                $(this).find('.board').css("border-color","#ccc");
               }
               if(instituteVal != ""){
                $(this).find('.institute').css("border-color","#ccc");
               }
               if(yearVal != ""){
                $(this).find('.passingYear').css("border-color","#ccc");
               }
             }else{
              $(this).find('.form-control').css("border-color","#ccc");
              jsonObj.push({"degree": degreeVal,"board" : boardVal,"instituteName":instituteVal,"year":yearVal});
              error = false;
             }
           });
           if(!error && jsonObj.length > 0){
            console.log(JSON.stringify(jsonObj));
             $.ajax({
               type: 'POST',
               url: baseUrl+"/tutor/"+id+"/education",
               contentType: "application/json;charset=utf-8",
               data: JSON.stringify(jsonObj),
               success: function(resultData) { 
                 showToast("Classes and subjects saved successfully.")
                 setTimeout(function(){ 
                   window.location.href = "editProfile/tutor/"+id;
                  }, 3000);
                },
                error :function(resultData){
                  console.log(resultData);
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
        $(document).on('change','.selectpicker',function() {
          $(this).next().blur();
        });
  }

}
