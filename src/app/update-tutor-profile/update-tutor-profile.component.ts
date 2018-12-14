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

         $.ajax({
            type: 'GET',
            url: baseUrl+"/tutor/"+id+"/map",
            success: function(resultData) { 
              console.log(resultData);
              var grouped = {};
              resultData.forEach(function (a) {
                  grouped[a.classGroup.id] = grouped[a.classGroup.id] || [];
                  grouped[a.classGroup.id].push(a.subjectMaster.id);
              });
              var i = 0;
              for (var key in grouped) {
                i++;
                var addMore1 = '<div class="row formDiv_1" style="margin-bottom: 10px !important;">';
                    addMore1 += '<div class="col-md-5">';
                    addMore1 += '<select id="preClass'+i+'" class="selectpicker form-control chooseClass">'; 
                    addMore1 += classHtml;         
                    addMore1 += '</select>';
                    addMore1 += '</div>';
                    addMore1 += '<div class="col-md-6">';
                    addMore1 += '<select id="preSubject'+i+'" class="selectpicker form-control chooseSubject" title="Select subjects" multiple>';             
                    addMore1 += subjectHtml;  
                    addMore1 += '</select>';
                    addMore1 += '</div>';
                    addMore1 += '<div class="col-md-1"><span class="removeClass removeBtn" style="background: #d4d4d0;padding: 5px 12px;position: relative;top: 4px;font-size: 20px;font-weight: bold;color:red;cursor: pointer;">-</span></div>'
                    addMore1 += '</div>';
                    $(".addMore_1").prepend(addMore1);
                    $("select#preClass"+i).val(key);
                    $("select#preSubject"+i).selectpicker('val', grouped[key]);
                    $(".selectpicker").selectpicker('refresh');
             }
              
            }
          });
         
        // Function for update qualification
        //states and city
        var states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];
        var statesHtml = '<option value="" selected disabled>Select</option>';
        for(var i = 0; i< states.length; i++){
          statesHtml += '<option value="'+states[i]+'">'+states[i]+'</option>';
        }
        $(".states").html(statesHtml).selectpicker();

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
            addMore2 += '<input type="hidden" class="educationId" value="">';
            addMore2 += '<div class="col-md-1"><span class="removeQualification removeBtn" style="background: #d4d4d0;padding: 5px 12px;position: relative;top: 4px;font-size: 20px;font-weight: bold;color:red;cursor: pointer;">-</span></div>'
            addMore2 += '</div>';
            $(".addMore_2").append(addMore2);
        }
        $(document).on('click',".addMoreQualification",function(){
          addMoreQualification();
        });
        $(document).on('click',".removeQualification",function(){
          var eduId = $(this).closest(".formDiv_2").find(".educationId").val();
          if(eduId != "" && eduId != null && eduId != undefined){
            $.ajax({
              url: baseUrl+"/tutor/education/"+eduId,
              type: 'DELETE',
              success: function(result) {
                showToast("Deleted successfully.")
              }
            });
          }
          $(this).closest(".formDiv_2").remove();
        });

        // $("#saveQualification").click(function(){
        //   var jsonObj = [];
        //   var error = true;
        //    $(".formDiv_2").each(function(){
        //      var degreeVal = $(this).find('.degree').val();
        //      var boardVal = $(this).find('.board').val();
        //      var instituteVal = $(this).find('.institute').val();
        //      var yearVal = $(this).find('.passingYear').val();
        //      var educationId = $(this).find('.educationId').val();
        //      if(educationId == "" || educationId == undefined){
        //       educationId = null;
        //      } 
        //      console.log(degreeVal+" "+boardVal+" "+instituteVal+" "+yearVal)
        //      if(degreeVal == "" || boardVal == "" || instituteVal == "" || yearVal == ""){
        //        error = true;
        //        $(this).find('.form-control').css("border-color","red");
        //        if(degreeVal != ""){
        //         $(this).find('.degree').css("border-color","#ccc");
        //        }
        //        if(boardVal != ""){
        //         $(this).find('.board').css("border-color","#ccc");
        //        }
        //        if(instituteVal != ""){
        //         $(this).find('.institute').css("border-color","#ccc");
        //        }
        //        if(yearVal != ""){
        //         $(this).find('.passingYear').css("border-color","#ccc");
        //        }
        //      }else{
        //       $(this).find('.form-control').css("border-color","#ccc");
        //       jsonObj.push({"id":educationId,"degree": degreeVal,"board" : boardVal,"instituteName":instituteVal,"year":yearVal});
        //       error = false;
        //      }
        //    });
        //    if(!error && jsonObj.length > 0){
        //     console.log(JSON.stringify(jsonObj));
        //      $.ajax({
        //        type: 'POST',
        //        url: baseUrl+"/tutor/"+id+"/education",
        //        contentType: "application/json;charset=utf-8",
        //        data: JSON.stringify(jsonObj),
        //        success: function(resultData) { 
        //          showToast("Classes and subjects saved successfully.")
        //          setTimeout(function(){ 
        //            window.location.href = "editProfile/tutor/"+id;
        //           }, 3000);
        //         },
        //         error :function(resultData){
        //           console.log(resultData);
        //         }
        //    });
        //    }
        // });

        $("#saveQualification").click(function(){
            var jsonObj = [];
            var interEduId = $("#intermidiate").find(".eduId").val();
            if(interEduId == "" || interEduId == undefined){
              interEduId = null;
            }
            var interExam = $("#intermidiate").find(".examStream").val();
            var interBoard = $("#intermidiate").find(".board").val();
            var interState = $("#intermidiate").find("select.states").val();
            var interYear = $("#intermidiate").find(".passingYear").val();
            var interMode = $("#intermidiate").find(".modeOfStudy ").val();
            var interMarks = $("#intermidiate").find(".markObtained").val();
            var interType = $("#intermidiate").find(".schoolType").val();
            if(checkNullOrUndefined(interBoard) !="" || checkNullOrUndefined(interExam) != "" || checkNullOrUndefined(interMarks) != "" || checkNullOrUndefined(interState) != "" || checkNullOrUndefined(interType) != "" || checkNullOrUndefined(interYear) != "" || checkNullOrUndefined(interMode) != ""){
              var inter = {"id":interEduId,"degree":"intermidiate","stream":interExam,"board" : interBoard,"state":interState,"year":interYear,"mode":interMode,"marksObtained":interMarks,"type":interType};
              jsonObj.push(inter);
              console.log(jsonObj);
            }

            var gradEduId = $("#graduation").find(".eduId").val();
            if(gradEduId == "" || gradEduId == undefined){
              gradEduId = null;
            }
            var gradExam = $("#graduation").find(".examStream").val();
            var gradBoard = $("#graduation").find(".board").val();
            var gradState = $("#graduation").find("select.states").val();
            var gradYear = $("#graduation").find(".passingYear").val();
            var gradMode = $("#graduation").find(".modeOfStudy ").val();
            var gradMarks = $("#graduation").find(".markObtained").val();
            var gradType = $("#graduation").find(".schoolType").val();
            if(checkNullOrUndefined(gradBoard) != "" || checkNullOrUndefined(gradState) != "" || checkNullOrUndefined(gradExam) != "" || checkNullOrUndefined(gradYear) != "" || checkNullOrUndefined(gradMode) != "" || checkNullOrUndefined(gradType) != "" || checkNullOrUndefined(gradMarks) != ""){
              var graduation = {"id":gradEduId,"degree":"graduation","stream":gradExam,"board" : gradBoard,"state":gradState,"year":gradYear,"mode":gradMode,"marksObtained":gradMarks,"type":gradType};
              jsonObj.push(graduation);
              console.log(jsonObj);
            }

            var masterEduId = $("#master").find(".eduId").val();
            if(masterEduId == "" || masterEduId == undefined){
              masterEduId = null;
            }
            var masterExam = $("#master").find(".examStream").val();
            var masterBoard = $("#master").find(".board").val();
            var masterState = $("#master").find("select.states").val();
            var masterYear = $("#master").find(".passingYear").val();
            var masterMode = $("#master").find(".modeOfStudy ").val();
            var masterMarks = $("#master").find(".markObtained").val();
            var masterType = $("#master").find(".schoolType").val();
            if(checkNullOrUndefined(masterBoard) != "" || checkNullOrUndefined(masterState) != "" || checkNullOrUndefined(masterExam) != "" || checkNullOrUndefined(masterYear) != "" || checkNullOrUndefined(masterMode) != "" || checkNullOrUndefined(masterType) != "" || checkNullOrUndefined(masterMarks) != ""){
              var master = {"id":masterEduId,"degree":"master","stream":masterExam,"board" : masterBoard,"state":masterState,"year":masterYear,"mode":masterMode,"marksObtained":masterMarks,"type":masterType};
              jsonObj.push(master);
              console.log(jsonObj);
            }

            var otherEduId = $("#other").find(".eduId").val();
            if(otherEduId == "" || otherEduId == undefined){
              otherEduId = null;
            }
            var otherExam = $("#other").find(".examStream").val();
            var otherBoard = $("#other").find(".board").val();
            var otherState = $("#other").find("select.states").val();
            var otherYear = $("#other").find(".passingYear").val();
            var otherMode = $("#other").find(".modeOfStudy ").val();
            var otherMarks = $("#other").find(".markObtained").val();
            var otherType = $("#other").find(".schoolType").val();
            if(checkNullOrUndefined(otherBoard) != "" || checkNullOrUndefined(otherState) != "" || checkNullOrUndefined(otherExam) != "" || checkNullOrUndefined(otherYear) != "" || checkNullOrUndefined(otherMode) != "" || checkNullOrUndefined(otherType) != "" || checkNullOrUndefined(otherMarks) != ""){
              var other = {"id":otherEduId,"degree":"other","stream":otherExam,"board" : otherBoard,"state":otherState,"year":otherYear,"mode":otherMode,"marksObtained":otherMarks,"type":otherType};
              jsonObj.push(other);
            }
            if(jsonObj.length > 0){
              $.ajax({
                    type: 'POST',
                    url: baseUrl+"/tutor/"+id+"/education",
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(jsonObj),
                    success: function(resultData) { 
                      showToast("Educational Qualifications saved successfully.");
                      setTimeout(function(){ 
                        window.location.href = "editProfile/tutor/"+id;
                      }, 3000);
                    },
                    error :function(resultData){
                      console.log(resultData);
                    }
              });
            }else{
              showToast("You can not save an empty table.");
            }
        });

        $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id+"/education",
          success: function(resultData) { 
            console.log(resultData.length);    
            var grouped = {};
            resultData.forEach(function (a) {
              if(a.degree == "intermidiate"){
                $("#intermidiate").find(".eduId").val(a.id);
                $("#intermidiate").find(".examStream").val(a.stream);
                $("#intermidiate").find(".board").val(a.board);
                $("#intermidiate").find("select.states").val(a.state);
                $("#intermidiate").find(".passingYear").val(a.year);
                $("#intermidiate").find(".modeOfStudy ").val(a.mode);
                $("#intermidiate").find(".markObtained").val(a.marksObtained);
                $("#intermidiate").find(".schoolType").val(a.type);
              }
              if(a.degree == "graduation"){
                $("#graduation").find(".eduId").val(a.id);
                $("#graduation").find(".examStream").val(a.stream);
                $("#graduation").find(".board").val(a.board);
                $("#graduation").find("select.states").val(a.state);
                $("#graduation").find(".passingYear").val(a.year);
                $("#graduation").find(".modeOfStudy ").val(a.mode);
                $("#graduation").find(".markObtained").val(a.marksObtained);
                $("#graduation").find(".schoolType").val(a.type);
              }
              if(a.degree == "master"){
                $("#master").find(".eduId").val(a.id);
                $("#master").find(".examStream").val(a.stream);
                $("#master").find(".board").val(a.board);
                $("#master").find("select.states").val(a.state);
                $("#master").find(".passingYear").val(a.year);
                $("#master").find(".modeOfStudy ").val(a.mode);
                $("#master").find(".markObtained").val(a.marksObtained);
                $("#master").find(".schoolType").val(a.type);
              }
              if(a.degree == "other"){
                $("#other").find(".eduId").val(a.id);
                $("#other").find(".examStream").val(a.stream);
                $("#other").find(".board").val(a.board);
                $("#other").find("select.states").val(a.state);
                $("#other").find(".passingYear").val(a.year);
                $("#other").find(".modeOfStudy ").val(a.mode);
                $("#other").find(".markObtained").val(a.marksObtained);
                $("#other").find(".schoolType").val(a.type);
              }
            });            
          }
        });

        //zip code function 
        $("#saveZipCode").click(function(){
          var jsonObj = [];
          var error = false;
           $(".pinCode").each(function(){
             var pinCode = $(this).val();
             var pinId = $(this).attr("data-id");
             console.log(pinCode);
             if(pinCode != "" && (pinCode.length != 6 || isNaN(pinCode))){
               error = true;
               $(this).css("border-color","red");
             }else if(pinCode != "" || pinId != ""){
              $(this).css("border-color","#ccc");
              jsonObj.push({"id":pinId,"zip":pinCode});
             }
           });
           if(!error && jsonObj.length > 0){
            console.log(JSON.stringify(jsonObj));
             $.ajax({
               type: 'POST',
               url: baseUrl+"/tutor/"+id+"/zip",
               contentType: "application/json;charset=utf-8",
               data: JSON.stringify(jsonObj),
               success: function(resultData) { 
                 showToast("Working locations saved successfully.")
                 setTimeout(function(){ 
                   window.location.href = "editProfile/tutor/"+id;
                  }, 3000);
                },
                error :function(resultData){
                  console.log(resultData);
                }
           });
           }else{
            showToast("Please enter valid Pin code");
           }
        });

        $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id+"/zip",
          success: function(resultData) { 
            console.log(resultData);
            var grouped = {};
            resultData.forEach(function (a) {
              var keepGoing = true;
              $(".pinCode").each(function(){
                if(keepGoing && $(this).val() == ""){
                  $(this).val(a.zip);
                  $(this).attr("data-id",a.id);
                  keepGoing = false;
                }
              });
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
