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
  
          parent_fieldset.find('select').each(function () {
              console.log($(this).is(":visible") +" sds");
              if ($(this).is(":visible") && ($(this).val() == null || $(this).val() == "")) {
                  $(this).addClass('input-error');
                  next_step = false;
              } else {
                  $(this).removeClass('input-error');
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
  
      //show on change
      const prepAndKg = ['Prep','Nursurry','LKG','UKG']
      const oneToFive = ['1st','2nd','3rd','4th','5th'];
      const sixToEight = ['6th','7th','8th'];
      const nineToTen = ['9th','10th'];
      const elevenToTwelve = ['11th','12th'];
      const graduation = ['1st year','2nd year','3rd year'];
      const competetive = ['IIT','MEDICAL'];
      const passion = ['Dance','Music'];
      $("#classGroup").on('change',function(){
        $("#chooseClass").html('');
        var classGroup = $(this).val();
        var classHtml = "";
        classHtml += '<option value="" disabled selected>Choose Your Class</option>';
        if(classGroup == "prep_and_kg"){
            for(var i=0; i<prepAndKg.length; i++)
            classHtml += '<option value="'+prepAndKg[i]+'">'+prepAndKg[i]+'</option>';
        }
  
        if(classGroup == "1to5"){
            for(var i=0; i<oneToFive.length; i++)
            classHtml += '<option value="'+oneToFive[i]+'">'+oneToFive[i]+'</option>';
        }
  
        if(classGroup == "6to8"){
            for(var i=0; i<sixToEight.length; i++)
            classHtml += '<option value="'+sixToEight[i]+'">'+sixToEight[i]+'</option>';
        }
  
        if(classGroup == "9to10"){
            for(var i=0; i<nineToTen.length; i++)
            classHtml += '<option value="'+nineToTen[i]+'">'+nineToTen[i]+'</option>';
        }
  
        if(classGroup == "11to12"){
            for(var i=0; i<elevenToTwelve.length; i++)
            classHtml += '<option value="'+elevenToTwelve[i]+'">'+elevenToTwelve[i]+'</option>';
        }
  
        if(classGroup == "graduation"){
            for(var i=0; i<graduation.length; i++)
            classHtml += '<option value="'+graduation[i]+'">'+graduation[i]+'</option>';
        }
  
        if(classGroup == "competetive"){
            for(var i=0; i<competetive.length; i++)
            classHtml += '<option value="'+competetive[i]+'">'+competetive[i]+'</option>';
        }
        
        if(classGroup == "passion"){
            for(var i=0; i<passion.length; i++)
            classHtml += '<option value="'+passion[i]+'">'+passion[i]+'</option>';
        }
        $("#chooseClass").html(classHtml);
        $("#chooseClassDiv").prop('hidden',false);
        $("#chooseSubjectDiv").prop('hidden',true);
      });
  
      const prepAndKgSubject = ['All Subject','English','Hindi','Math']
      const oneToFiveSubject = ['All Subject','English','Hindi','Math','Sanskrit','Science','Social Science']
      const sixToEightSubject = ['All Subject','English','Hindi','Math','Sanskrit','Science','Social Science','Computers']
      const nineToTenSubject = ['All Subject','English','Hindi','Math','Sanskrit','Science','Social Science','Computers']
      const elevenToTwelveSubject = ['Physics','Chemistry','Math','Biology','Accounts','Echonomics','History','Civics','Geography'];
      const graduationSubject = ['Physics','Chemistry','Math','Biology','Accounts','Echonomics','History','Civics','Geography'];
      const iitSubject = ['Physics','Chemistry','Math'];
      const medicalSubject = ['Physics','Chemistry','Math','Biology'];
      const danceSubject = ['Jumba','Indian Clasical','Contemporary','Bollywood'];
      const musicSubject = ['Indian Clasical','Semi Clasical','Western'];
      $("#chooseClass").on('change',function(){
        var classGroup = $("#classGroup").val();
        console.log("dcs == "+classGroup)
        var chooseClass = $(this).val();
        var subjectHtml = "";
        subjectHtml += '<option value="" disabled selected>Choose Your Subject</option>';
        if(classGroup == "prep_and_kg"){
            for(var i=0; i<prepAndKgSubject.length; i++)
            subjectHtml += '<option value="'+prepAndKgSubject[i]+'">'+prepAndKgSubject[i]+'</option>';
        }
        if(classGroup == "1to5"){
            for(var i=0; i<oneToFiveSubject.length; i++)
            subjectHtml += '<option value="'+oneToFiveSubject[i]+'">'+oneToFiveSubject[i]+'</option>';
        }
  
        if(classGroup == "6to8"){
            for(var i=0; i<sixToEightSubject.length; i++)
            subjectHtml += '<option value="'+sixToEightSubject[i]+'">'+sixToEightSubject[i]+'</option>';
        }
  
        if(classGroup == "9to10"){
            for(var i=0; i<nineToTenSubject.length; i++)
            subjectHtml += '<option value="'+nineToTenSubject[i]+'">'+nineToTenSubject[i]+'</option>';
        }
  
        if(classGroup == "11to12"){
            for(var i=0; i<elevenToTwelveSubject.length; i++)
            subjectHtml += '<option value="'+elevenToTwelveSubject[i]+'">'+elevenToTwelveSubject[i]+'</option>';
        }
  
        if(classGroup == "graduation"){
            for(var i=0; i<graduationSubject.length; i++)
            subjectHtml += '<option value="'+graduationSubject[i]+'">'+graduationSubject[i]+'</option>';
        }
  
        if(chooseClass == "IIT"){
            for(var i=0; i<iitSubject.length; i++)
            subjectHtml += '<option value="'+iitSubject[i]+'">'+iitSubject[i]+'</option>';
        }
  
        if(chooseClass == "MEDICAL"){
            for(var i=0; i<medicalSubject.length; i++)
            subjectHtml += '<option value="'+medicalSubject[i]+'">'+medicalSubject[i]+'</option>';
        }
  
        if(chooseClass == "Dance"){
            for(var i=0; i<danceSubject.length; i++)
            subjectHtml += '<option value="'+danceSubject[i]+'">'+danceSubject[i]+'</option>';
        }
  
        if(chooseClass == "Music"){
            for(var i=0; i<musicSubject.length; i++)
            subjectHtml += '<option value="'+musicSubject[i]+'">'+musicSubject[i]+'</option>';
        }
  
        $("#chooseSubject").html(subjectHtml);
        $("#chooseSubjectDiv").prop('hidden',false);
      });
  
      $("#submit").click(function(){
        var error = false;  
        $(".registration-form").find('input[type="text"],input[type="email"]').each(function () {
            if ($(this).val() == "") {
                $(this).addClass('input-error');
                error = true;
            } else {
                $(this).removeClass('input-error');
            }
        });
          if(!error){
            var prefferedGender = $("#prefferedGender").val();
            var locality = $("#locality").val(); 
            var city = $("#city").val(); 
            var classcategory = $("#classGroup").val();  
            var particularClass = $("#chooseClass").val(); 
            var subjects = $("#chooseSubject").val(); 
            var data = '{"student":{"id":'+id+'},"gender":"'+prefferedGender+'","location":"'+locality+'","city":"'+city+'","className":"'+particularClass+'","subject":"'+subjects+'"}';
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
    });
  }

}
