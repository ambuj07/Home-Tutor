import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-find-more-tutors',
  templateUrl: './find-more-tutors.component.html',
  styleUrls: ['./find-more-tutors.component.css']
})
export class FindMoreTutorsComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
    const baseUrl = environment.baseUrl;
    var id;
   this.route.params.subscribe(params => {
        id = params["id"];
      });
    $("#viewTabName").text("Post New Requirement");
    $(".sidenav a").removeClass("active");
    $(".findMoreTutors").addClass("active");
    $(document).ready(function () {
      $('.registration-form .fieldset:first-child').fadeIn('slow');
  
      $('.registration-form input[type="text"]').on('focus', function () {
          $(this).removeClass('input-error');
      });
  
      // next step
      $('.registration-form .btn-next').on('click', function () {
          var parent_fieldset = $(this).parents('.fieldset');
          var next_step = true;
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
  
      // submit
      $('.registration-form').on('submit', function (e) {
  
          $(this).find('input[type="text"],input[type="email"]').each(function () {
              if ($(this).val() == "") {
                  e.preventDefault();
                  $(this).addClass('input-error');
              } else {
                  $(this).removeClass('input-error');
              }
          });
  
      });
    });
        //class category
    var categoryHtml = '<option value="" selected disabled>Select A Category</option>';
    
    $.ajax({
      type: 'GET',
      url: baseUrl+"/config/category",
      async:false,
      contentType: "application/json;charset=utf-8",
      success: function(resultData) { 
          console.log(resultData);
          resultData.forEach(function (a){
            categoryHtml += '<option data-id="'+a.id+'" value="'+a.name+'">'+a.name+'</option>';
          })
        }
    });
    $("#classGroup").html(categoryHtml).selectpicker();
      //show on change
      $("#classGroup").on('change',function(){
        $("#chooseClass").html('');
        var classGroup = $('option:selected', this).attr('data-id');
        var classHtml = "";
        classHtml += '<option value="" disabled selected>Choose Your Class</option>';
        //class category
        $.ajax({
        type: 'GET',
        url: baseUrl+"/config/class?groupId="+classGroup,
        async:false,
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            resultData.forEach(function (a){
                classHtml += '<option data-id="'+classGroup+'" value="'+a.name+'">'+a.name+'</option>';
            })
            }
        });
      //show on change
        $("#chooseClass").html(classHtml).selectpicker('refresh');
        $("#chooseClassDiv").prop('hidden',false);
        $("#chooseSubjectDiv").prop('hidden',true);
        $("#boardDiv").prop('hidden',true);
      });

      $("#chooseClass").on('change',function(){
        var classGroup = $("#classGroup").val();
        console.log("dcs == "+classGroup)
        var chooseClass = $('option:selected', this).attr('data-id');
        var subjectHtml = "";
        subjectHtml += '<option value="" disabled selected>Choose Your Subject</option>';
        $.ajax({
            type: 'GET',
            url: baseUrl+"/config/subject?groupId="+chooseClass,
            async:false,
            contentType: "application/json;charset=utf-8",
            success: function(resultData) { 
                console.log(resultData);
                resultData.forEach(function (a){
                    subjectHtml += '<option data-id="'+classGroup+'" value="'+a.name+'">'+a.name+'</option>';
                })
                }
            });
        $("#chooseSubject").html(subjectHtml).selectpicker('refresh');
        $("#chooseSubjectDiv").prop('hidden',false);
      });

      $("#chooseSubjectDiv").on('change',function(){
         $("#boardDiv").prop('hidden',false); 
      });
      
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
          if(!error){
            var classcategory = $("#classGroup").val();  
            var particularClass = $("#chooseClass").val(); 
            var subjects = $("#chooseSubject").val();
            var board = $("#board").val();
            var chooseGender = $("#chooseGender").val();
            var turorType = $("#tutorType").val();
            var preferGender = $("#preferGender").val();
            var preferTiming = $("#preferTiming").val();
            var preferDay = $("#preferDay").val();
            var preferFee = $("#preferFee").val();
            var hourlyMonthly = $("#hourlyMonthly").val();
            var studentPerformance = $("#studentPerformance").val();
            var reasonForQuery = $("#reasonForQuery").val();
            var anythingElse = $("#anythingElse").val(); 
            var data = '{"student":{"id":'+id+'},"gender":"'+chooseGender+'","className":"'+particularClass+'","subject":"'+subjects+'","turorType":"'+turorType+'","preferGender":"'+preferGender+'","preferTiming":"'+preferTiming+'","preferDay":"'+preferDay+'","preferFee":"'+preferFee+'/'+hourlyMonthly+'","performance":"'+studentPerformance+'","reasonForQuery":"'+reasonForQuery+'","anythingElse":"'+anythingElse+'"}';
            $.ajax({
                type: 'POST',
                url: baseUrl+"/job",
                contentType: "application/json;charset=utf-8",
                data: data,
                success: function(resultData) { 
                    window.location.href = '/dashboard/student/'+id;
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
