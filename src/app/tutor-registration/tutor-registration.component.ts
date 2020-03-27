import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.css']
})
export class TutorRegistrationComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle("Join As Teacher/Trainer/Institution");
    this.meta.addTag({ property: 'og:title', content: 'Join As Teacher/Trainer/Institution' });
    this.meta.addTag({ property: 'og:url', content: 'http://hansatutor.com/edureg' });
  }
  

  ngOnInit() {
    const baseUrl = environment.baseUrl;
    $(document).ready(function(){
      $('.registration-form .fieldset:first-child').fadeIn('slow');
  
      $('.registration-form input[type="text"]').on('focus', function () {
          $(this).removeClass('input-error');
      });
      $(document).ready(function(){
        $(".sidenav a").removeClass("active");
        $(".joinTutorA").addClass("active");
      });
      // next step
      $('.registration-form .btn-next').on('click', function () {
          var parent_fieldset = $(this).parents('.fieldset');
          var next_step = true;
          if($(this).attr("next-step") != undefined && $(this).attr("next-step") == "false"){
            next_step = false;
          }
          var mobileRegex = /^[1-9]\d{9}$/;
          var mobile = $("#mobileNumber").val();
          var whatsapp = $("#whatsappNumber").val();
          var emailRegex = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          var allFilled = true;
  
          $(this).parents('.fieldset').find('select,input').each(function () {
            if ($(this).is(":visible") && ($(this).val() == null || $(this).val() == "")) {
                $(this).addClass('input-error');
                $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#d03e3e");
                next_step = false;
                allFilled = false;
                showToast("All fields are Mandatory");
            } else {
                $(this).removeClass('input-error');
                $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#ccc"); 
            }
          });
          if(allFilled){
            if(!emailRegex.test($("#email").val())){
              next_step = false;
              $("#email").addClass('input-error');
              showToast("Please enter a valid email");
              return false;
            }else{
              $("#email").removeClass('input-error');
            }
            if(!mobileRegex.test(mobile)){
              next_step = false;
              $("#mobileNumber").addClass('input-error');
              showToast("Invalid Mobile Number : Should be only 10 digit");
              return false;
            }else{
              $("#mobileNumber").removeClass('input-error');
            }
            if(!mobileRegex.test(whatsapp)){
              next_step = false;
              $("#whatsappNumber").addClass('input-error');
              showToast("Invalid WhatsApp Number : Should be only 10 digit");
            }else{
              $("#whatsappNumber").removeClass('input-error');
            } 
          }
          if($(".tutorType").is(":visible")){
            var tutorType = [];
              $('.tutorType').each(function(){
                if($(this).is(':checked')){
                tutorType.push($(this).val());
              }
            });
            if(tutorType.length == 0){
              next_step = false;
              showToast("Please atleast one Mode of Teaching");
            }
          }
          if (next_step) {
              parent_fieldset.fadeOut(400, function () {
                  $(this).next().fadeIn();
              });
          }
  
      });

      // previous step
      $('.registration-form .btn-previous').on('click', function () {
        $(this).parents('.fieldset').fadeOut(400, function () {
            $(this).prev().fadeIn();
        });
      });

      $("#jobType").on('change',function(){
        if($(this).val() == 'PARTTIME'){
          $(".partTimeReason").prop('hidden',false);
        }else{
          $(".partTimeReason").prop('hidden',true);
        }
      });

      $('.selectpicker').selectpicker();
    });

    //qualification
    $("#qualification").on('change',function(){
        if($(this).val() == 'OTHER'){
          $(".otherQualification").prop('hidden',false);
        }else{
          $(".otherQualification").prop('hidden',true);
        }
    });

    var statesHtml = '<option value="" selected disabled>Select Your State</option>';
    
    $.ajax({
      type: 'GET',
      url: baseUrl+"/config/state",
      async:false,
      contentType: "application/json;charset=utf-8",
      success: function(resultData) { 
          console.log(resultData);
          resultData.forEach(function (a){
            statesHtml += '<option data-id="'+a.id+'"value="'+a.name+'">'+a.name+'</option>';
          })
        }
    });
    $("#states").html(statesHtml).selectpicker();
    
    $('#states').change(function(){
      var stateId = $('option:selected', this).attr('data-id');
      var cityHtml = '<option value="" selected disabled>Select Your City</option>';
      $.ajax({
        type: 'GET',
        url: baseUrl+"/config/"+stateId+"/city",
        async:false,
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
          resultData.forEach(function (a){
              cityHtml += '<option value="'+a.name+'">'+a.name+'</option>';
            });
          }
        });
        $("#city").html(cityHtml).selectpicker();
        $("#city").selectpicker('refresh');
        $("#cityDiv").prop('hidden',false);
      });

      
    //Subjects and classes
    var classHtml = '<option value="" disabled selected>Select Class</option>';
    // $.ajax({
    //   type: 'GET',
    //   url: baseUrl+"/config",
    //   async:false,
    //   //dataType: "json",
    //   contentType: "application/json;charset=utf-8",
    //   success: function(resultData) { 
    //       console.log(resultData);
    //       for(var i=0; i<resultData.classes.length; i++){
    //         classHtml += '<option value="'+resultData.classes[i].id+'">'+resultData.classes[i].name+'</option>';
    //       }
    //       for(var i=0; i<resultData.subjects.length; i++){
    //         subjectHtml += '<option value="'+resultData.subjects[i].id+'">'+resultData.subjects[i].name+'</option>';
    //       }
    //     }
    //   });
    //   $("#chooseClass").html(classHtml).selectpicker('refresh');
    //   $("#chooseSubject").html(subjectHtml).selectpicker('refresh');
    $.ajax({
      type: 'GET',
      url: baseUrl+"/config/category",
      async:false,
      contentType: "application/json;charset=utf-8",
      success: function(resultData) { 
          console.log(resultData);
          resultData.forEach(function (a){
            var name = a.name;
            var nameArr = a.name.split("(");
            if(nameArr.length > 1){
              classHtml += '<option data-id="'+a.id+'" value="'+a.name+'">'+nameArr[0]+'</option>';
              classHtml += '<option style="font-size:12px;margin-top:-10px" data-id="'+a.id+'" value="'+a.name+'">('+nameArr[1]+'</option>';
            }else{
              classHtml += '<option data-id="'+a.id+'" value="'+a.name+'">'+a.name+'</option>';
            }
          })
        }
      });
      $("#chooseClass").html(classHtml).selectpicker('refresh');

      $("#chooseClass").on('change',function(){
        var subjectHtml = '';
        $("#chooseClass").val($(this).val()).selectpicker("refresh")
        var chooseClass = $('option:selected', this).attr('data-id');
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
        $("#chooseSubject").html(subjectHtml).selectpicker('refresh');
      });

    //pin code function
    //   function geolocate(pin) {
    //         $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBtGukLEI9n9lX-R2b3_2ARwJq4lA-yR0g&address="+pin+"&sensor=true",function(data){
    //           console.log(data)  
    //           // $("#address").val(data.results[0].formatted_address);
    //           //   console.log(data.results[0].formatted_address+" dsdsdds");
    //         });
    //   }	
    
    // $("#pinCode").on('blur',function(){
    //     var pin = $(this).val();
    //     geolocate(pin);
    // });


      $("#submit").click(function(){
          var error = false;  
          $(this).parents('.fieldset').find('select,input').each(function () {
            if ($(this).is(":visible") && ($(this).val() == null || $(this).val() == "")) {
                $(this).addClass('input-error');
                $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#d03e3e");
                error = true;
                showToast("All fields are Mandatory");
            } else {
                $(this).removeClass('input-error');
                $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#ccc");
            }
          });
          if($(".tutorType").is(":visible")){
            var tutorType = [];
              $('.tutorType').each(function(){
                if($(this).is(':checked')){
                  tutorType.push($(this).val());
                }
            });
            if(tutorType.length == 0){
              error = true;
              showToast("Please atleast one Mode of Teaching");
            }
          }
          if(!error){
            var name = $("#name").val();
            var location = $("#location").val(); 
            var mobile = $("#mobileNumber").val(); 
            var email = $("#email").val();   
            var classes = $("#chooseClass").find("option:selected").attr("data-id"); 
            var subjects = $("#chooseSubject").val();
            var mapping = [];
            for(var i=0; i<subjects.length;i++){
              mapping.push({"classGroup": {"id": classes},"subjectMaster": {"id": subjects[i]}})
            }
            var mappingStr = JSON.stringify(mapping);
            var chooseGender = $("#chooseGender").val(); 
            var qualification = $("#qualification").val();
            if(qualification == "OTHER"){
              qualification = $("#otherQualification").val();
            }
            var zipCodeVal = $("#pinCode").val();
            var zipCodeArr = [];
            zipCodeArr.push({"zip":""});           
            var zipCode = JSON.stringify(zipCodeArr);
            var whatsappNumber = $("#whatsappNumber").val();
            var tutorType = [];
            $('.tutorType').each(function(){
              if($(this).is(':checked')){
                tutorType.push({"teacherType" : $(this).val()});
              }
            });
            var tutorTypeStr = JSON.stringify(tutorType);
            var state = $("#states").val();
            var city = $("#city").val();
            var dob = $("#dob").val();
            if(dob != null && dob != ""){
              dob = dob.split("/")[2]+"-"+dob.split("/")[1]+"-"+dob.split("/")[0];
            }
            var jobType = $("#jobType").val();
            var partTimeReason = $("#partTimeReason").val();
            var teachingExperience = $("#teachingExperience").val();
            var fluencyInEnglish = $("#fluencyInEnglish").val();
            var data = '{"id":null,"name":"'+name+'","location":"'+location+'","mobile":"'+mobile+'",';
            data += '"email":"'+email+'","zipCode":'+zipCode+',"defaultZip":"'+zipCodeVal+'","city":"'+city+'","state":"'+state+'",';
            data += '"types":'+tutorTypeStr+',"mapping":'+mappingStr+',"gender":"'+chooseGender+'",';
            data += '"qualification":"'+qualification+'","whatsappNumber":"'+whatsappNumber+'","dob":"'+dob+'",';
            data += '"jobType":"'+jobType+'","partTimeReason":"'+partTimeReason+'",';
            data += '"fluencyInEnglish":"'+fluencyInEnglish+'","experience":"'+teachingExperience+'"}';
            console.log(data)
            $.ajax({
                type: 'POST',
                url: baseUrl+"/tutor",
                contentType: "application/json;charset=utf-8",
                data: data,
                success: function(resultData) { 
                    console.log(resultData);
                    localStorage.setItem("userName",resultData.detail.name);
                    localStorage.setItem("type",resultData.type);
                    localStorage.setItem("userId",resultData.refId);
                    localStorage.setItem("from_reg","Yes");
                    window.location.href = '/profile/tutor';
                 },
                 error: function(resultData){
                   if(resultData.responseJSON.message == "Mobile number already exists."){
                    $('#myErrorModal').modal('show');
                    $("#alreadyExistNumber").text('"'+mobile+'"');
                   }else{
                     showToast("Something went wrong at server side, Please try after sometime.")
                   }
                 }
            });  
          }
      });
      $('.fieldset').find('select,input').change(function(){
        $(this).removeClass('input-error');
        $(this).closest('.form-group').find('.errorText').remove();
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
