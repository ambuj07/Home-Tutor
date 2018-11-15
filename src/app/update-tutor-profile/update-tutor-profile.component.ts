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
            addMore1 += '<div class="col-md-1"><span class="removeClass removeBtn" style="background: #d4d4d0;padding: 5px 12px;position: relative;top: 4px;font-size: 20px;font-weight: bold;color:red;">-</span></div>'
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
            $(".formDiv_1").each(function(){
              var classVal = $(this).find('select.chooseClass').val();
              var subjectVal = $(this).find("select.chooseSubject").val();
              console.log(classVal+" "+subjectVal.length)
              if(classVal == null && subjectVal.length == 0){
                $(this).find(".chooseClass").find(".dropdown-toggle").css("border-color","red");
                $(this).find(".chooseSubject").find(".dropdown-toggle").css("border-color","red");
              }else if(classVal == null){
                $(this).find(".chooseClass").find(".dropdown-toggle").css("border-color","red");
                $(this).find(".chooseSubject").find(".dropdown-toggle").css("border-color","#ccc");
              }else if(subjectVal.length == 0){
                $(this).find(".chooseClass").find(".dropdown-toggle").css("border-color","#ccc");
                $(this).find(".chooseSubject").find(".dropdown-toggle").css("border-color","red");
              }else{
                $(this).find(".chooseClass").find(".dropdown-toggle").css("border-color","#ccc");
                $(this).find(".chooseSubject").find(".dropdown-toggle").css("border-color","#ccc");
                for(var i=0; i<subjectVal.length;i++){
                  jsonObj.push({"classGroup": {"id": classVal},"subjectMaster": {"id": subjectVal[i]}})
                }
              }
            });
            if(jsonObj.length > 0){
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
            console.log(jsonObj);
         });
         function showToast(data) {
          var x = document.getElementById("snackbar");
          x.className = "show";
          x.innerText = data;
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
  }

}
