import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-update-class-and-subject',
  templateUrl: './update-class-and-subject.component.html',
  styleUrls: ['./../update-tutor-profile.component.css']
})
export class UpdateClassAndSubjectComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if(id == null || id == "" || id == undefined){
        window.location.href = '/login'
      }
      $.ajaxSetup({
        headers: { 'Authorization': token}
      });
      $(document).ready(function() {
        $("#viewTabName").text("Update Classes And Subjects");
        $(".sidenav a").removeClass("active");
        $("#editProfile").addClass("active");
        $('.selectpicker').selectpicker();
      });
      var classHtml = '<option value="" disabled selected>Select Class</option>';
        $.ajax({
          type: 'GET',
          url: baseUrl+"/config/category",
          async:false,
          contentType: "application/json;charset=utf-8",
          success: function(resultData) { 
              console.log(resultData);
              resultData.forEach(function (a){
                classHtml += '<option value="'+a.id+'">'+a.name+'</option>';
              })
            }
          });
          $(".chooseClass").html(classHtml).selectpicker('refresh');
    
          $(document).on('change',"select.chooseClass",function(){
            var classVal = $(this).val();
            var subjectHtml = getSubjectForClass(classVal);
            $(this).closest(".formDiv_1").find("select.chooseSubject").html(subjectHtml).selectpicker('refresh');
          });
          function getSubjectForClass(chooseClass){
            var subjectHtml = '';
            $.ajax({
              type: 'GET',
              url: baseUrl+"/config/subject?groupId="+chooseClass,
              async:false,
              contentType: "application/json;charset=utf-8",
              success: function(resultData) { 
                  console.log(resultData);
                  resultData.forEach(function (a){
                      subjectHtml += '<option value="'+a.id+'">'+a.name+'</option>';
                  })
                  }
              });
              console.log(subjectHtml)
              return subjectHtml;
          }

        function addMoreClass(){
            var addMore1 = '<div class="row formDiv_1" style="margin-bottom: 10px !important;">';
            addMore1 += '<div class="col-md-5">';
            addMore1 += '<select class="selectpicker form-control chooseClass">'; 
            addMore1 += classHtml;         
            addMore1 += '</select>';
            addMore1 += '</div>';
            addMore1 += '<div class="col-md-6">';
            addMore1 += '<select class="selectpicker form-control chooseSubject" title="Select subjects" multiple>';             
            //addMore1 += subjectHtml;  
            addMore1 += '</select>';
            addMore1 += '</div>';
            addMore1 += '<div class="col-md-1"><span class="removeClass removeBtn" style="background: #d4d4d0;padding: 5px 12px;position: relative;top: 9px;font-size: 20px;font-weight: bold;color:red;cursor: pointer;">-</span></div>'
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
                    window.location.href = "profile/tutor";
                   }, 2000);
                 },
                 error :function(resultData){
                   console.log(resultData);
                 }
            });
            }
         });

         $.ajax({
            type: 'GET',
            url: baseUrl+"/tutor/"+id+"/map",
            success: function(resultData) { 
              console.log(resultData.length+" ==========");
              if(resultData.length > 0){
                var grouped = {};
                resultData.forEach(function (a) {
                    grouped[a.group.id] = grouped[a.group.id] || [];
                    grouped[a.group.id].push(a.classSubjectMapping.subjectMaster.id);
                });
                var i = 0;
                for (var key in grouped) {
                  console.log(key+" jd"+grouped[key])
                  i++;
                  var addMore1 = '<div class="row formDiv_1" style="margin-bottom: 10px !important;">';
                      addMore1 += '<div class="col-md-5">';
                      addMore1 += '<select id="preClass'+i+'" class="selectpicker form-control chooseClass">'; 
                      addMore1 += classHtml;         
                      addMore1 += '</select>';
                      addMore1 += '</div>';
                      addMore1 += '<div class="col-md-6">';
                      addMore1 += '<select id="preSubject'+i+'" class="selectpicker form-control chooseSubject" title="Select subjects" multiple>';             
                      addMore1 += getSubjectForClass(key);  
                      addMore1 += '</select>';
                      addMore1 += '</div>';
                      if(i == 1){
                        addMore1 += '<div class="col-md-1"><span class="addMoreClass addBtn" style="background: #d4d4d0;padding: 5px 10px;position: relative;top: 9px;font-size: 20px;font-weight: bold;cursor: pointer;color: green;">+</span></div>';
                      }else{
                        addMore1 += '<div class="col-md-1"><span class="removeClass removeBtn" style="background: #d4d4d0;padding: 5px 12px;position: relative;top: 9px;font-size: 20px;font-weight: bold;color:red;cursor: pointer;">-</span></div>'
                      }
                      addMore1 += '</div>';
                      $(".addMore_1").append(addMore1);
                      $("select#preClass"+i).val(key);
                      $("select#preSubject"+i).selectpicker('val', grouped[key]);
                      $(".selectpicker").selectpicker('refresh');
               }
              }else{
                var addMore1 = '<div class="row formDiv_1" style="margin-bottom: 10px !important;">';
                      addMore1 += '<div class="col-md-5">';
                      addMore1 += '<select id="preClass1" class="selectpicker form-control chooseClass">'; 
                      addMore1 += classHtml;         
                      addMore1 += '</select>';
                      addMore1 += '</div>';
                      addMore1 += '<div class="col-md-6">';
                      addMore1 += '<select id="preSubject1" class="selectpicker form-control chooseSubject" title="Select subjects" multiple>';               
                      addMore1 += '</select>';
                      addMore1 += '</div>';
                      addMore1 += '<div class="col-md-1"><span class="addMoreClass addBtn" style="background: #d4d4d0;padding: 5px 10px;position: relative;top: 9px;font-size: 20px;font-weight: bold;cursor: pointer;color: green;">+</span></div>';
                      addMore1 += '</div>';
                      $(".addMore_1").append(addMore1);
                      $(".selectpicker").selectpicker('refresh');
              }
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
