import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var google:any;

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.css']
})
export class TutorRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
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

     

    $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCTXSw8ekU_Kua38p6IvBgTU1_74sJYiEY&libraries=places", function(){
    bindAutocomplete();
    function bindAutocomplete() {
    
        var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(20.5937, 78.9629), new google.maps.LatLng(20.5937, 78.9629));
    
        var options = {
            bounds: defaultBounds,
            zoom: 13,
            types: ['geocode']
        };
    
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), options);
    
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            console.log(place);
        });
    }
      
      function geolocate() {
          if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
              $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+geolocation.lat+","+geolocation.lng+"&sensor=true",function(data){
                console.log(data)  
                $("#address").val(data.results[0].formatted_address);
                  console.log(data.results[0].formatted_address+" dsdsdds");
              });
          });
        }	
      }
      $("#getLocation").on('click',function(){
          $("#address").val("please wait getting your location");
          geolocate();
      })

      $("#submit").click(function(){
        var error = false;  
          $(this).parents('.fieldset').find('select').each(function () {
                if ($(this).is(":visible") && ($(this).val() == null || $(this).val() == "")) {
                    $(this).addClass('input-error');
                    error = true;
                } else {
                    $(this).removeClass('input-error');
                }
          });
          if(!error){
            var name = $("#name").val();
            var location = $("#address").val(); 
            var mobile = $("#mobileNumber").val(); 
            var email = $("#email").val(); 
            var category = $("#tutorType").val(); 
            var classcategory = $("#classGroup").val();  
            var particularClass = $("#chooseClass").val(); 
            var subjects = $("#chooseSubject").val(); 
            var data = '{"id":null,"name":"'+name+'","location":"'+location+'","mobile":"'+mobile+'","email":"'+email+'","category":"'+category+'","classcategory":"'+classcategory+'","particularClass":"'+particularClass+'","subjects":"'+subjects+'"}';
            $.ajax({
                type: 'POST',
                url: "http://localhost:8080/tutor",
                contentType: "application/json;charset=utf-8",
                data: data,
                success: function(resultData) { 
                    console.log(resultData);
                    window.location.href = '/nearbyStudents';
                 }
            });  
          }
      });
    });
    });
  }

}
