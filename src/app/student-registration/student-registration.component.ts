import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare var $:any;
declare var google:any;

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      const baseUrl = environment.baseUrl;
    $(document).ready(function () {
      $('.registration-form .fieldset:first-child').fadeIn('slow');
  
      $('.registration-form input[type="text"]').on('focus', function () {
          $(this).removeClass('input-error');
      });
  
      // next step
      $('.registration-form .btn-next').on('click', function () {
        var parent_fieldset = $(this).parents('.fieldset');
        var next_step = true;
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
          if($("#email").is(":visible") && !emailRegex.test($("#email").val())){
            next_step = false;
            $("#email").addClass('input-error');
            showToast("Please enter a valid email");
            return false;
          }else{
            $("#email").removeClass('input-error');
          }
          if($("#mobileNumber").is(":visible") && !mobileRegex.test(mobile)){
            next_step = false;
            $("#mobileNumber").addClass('input-error');
            showToast("Invalid Mobile Number : Should be only 10 digit");
            return false;
          }else{
            $("#mobileNumber").removeClass('input-error');
          }
          if($("#whatsappNumber").is(":visible") && !mobileRegex.test(whatsapp)){
            next_step = false;
            $("#whatsappNumber").addClass('input-error');
            showToast("Invalid WhatsApp Number : Should be only 10 digit");
          }else{
            $("#whatsappNumber").removeClass('input-error');
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
        $("#chooseClass").html(classHtml).selectpicker('refresh');
        $("#chooseClassDiv").prop('hidden',false);
        $("#chooseSubjectDiv").prop('hidden',true);
        $("#boardDiv").prop('hidden',true);
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

        $("#chooseSubject").html(subjectHtml).selectpicker('refresh');
        $("#chooseSubjectDiv").prop('hidden',false);
      });

      $("#chooseSubjectDiv").on('change',function(){
         $("#boardDiv").prop('hidden',false); 
      });

      //city and state
      var statesHtml = '<option value="" selected disabled>Select Your State</option>';
    
      $.ajax({
        type: 'GET',
        url: baseUrl+"/config/state",
        async:false,
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            resultData.forEach(function (a){
              statesHtml += '<option value="'+a.id+'">'+a.name+'</option>';
            })
          }
      });
      $("#states").html(statesHtml).selectpicker();
      
      $('#states').change(function(){
        var cityHtml = '<option value="" selected disabled>Select Your City</option>';
        $.ajax({
          type: 'GET',
          url: baseUrl+"/config/"+$(this).val()+"/city",
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

     

    //   $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCTXSw8ekU_Kua38p6IvBgTU1_74sJYiEY&libraries=places", function(){
  
    // //   var placeSearch, autocomplete;
    // //   var componentForm = {
    // //     address: 'address'
    // //   };
      
    // //   function initAutocomplete() {
    // //     autocomplete = new google.maps.places.Autocomplete(
    // //       (document.getElementById('address')), {
    // //         zoom: 13
    // //       });
    // //     fillInAddress();
    // //   }
      
    // //   function fillInAddress() {
    // //     var place = autocomplete.getPlace();
    // //     console.log(autocomplete.getPlace()+" awddw");
      
    // //     for (var component in componentForm) {
    // //         (<HTMLInputElement>document.getElementById(component)).value = '';
    // //     }
      
    // //    for (var i = 0; i < place.address_components.length; i++) {
    // //       var addressType = place.address_components[i].types[0];
    // //       console.log(place.address_components[i]+"sdcsd cds");
    // //       if (componentForm[addressType]) {
    // //         var val = place.address_components[i][componentForm[addressType]];
    // //         (<HTMLInputElement>document.getElementById(addressType)).value = val;
    // //       }
    // //     }
    // //   }
    // bindAutocomplete();
    // function bindAutocomplete() {
    
    //     var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(20.5937, 78.9629), new google.maps.LatLng(20.5937, 78.9629));
    
    //     var options = {
    //         bounds: defaultBounds,
    //         zoom: 13,
    //         types: ['geocode']
    //     };
    
    //     var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), options);
    
    //     google.maps.event.addListener(autocomplete, 'place_changed', function () {
    //         var place = autocomplete.getPlace();
    //         console.log(place);
    //     });
    // }
      
    //   function geolocate() {
    //       if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(function(position) {
    //         var geolocation = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude
    //         };
    //           $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+geolocation.lat+","+geolocation.lng+"&sensor=true",function(data){
    //             console.log(data)  
    //             $("#address").val(data.results[0].formatted_address);
    //               console.log(data.results[0].formatted_address+" dsdsdds");
    //           });
    //       });
    //     }	
    //   }
    //   $("#getLocation").on('click',function(){
    //       $("#address").val("please wait getting your location");
    //       geolocate();
    //   })
      

    // //   $("#address").on('input',function(){
    // //     initAutocomplete();
    // //   })
    // });
    var data = '';
    $("#submit").click(function(){
        var error = false;  
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
            var addrLine1 = $("#addrLine1").val();
            var location = $("#location").val()
            var zipCode = $("#pinCode").val() 
            var states = $("#states").val() 
            var city = $("#city").val() 
            var name = $("#name").val()  
            var email = $("#email").val();  
            var mobile = $("#mobileNumber").val(); 
            var whatsappNumber = $("#whatsappNumber").val();
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
            data = '{"id":null,"category":"","classcategory":"'+classcategory+'","particularClass":"'+particularClass+'","subjects":"'+subjects+'","name":"'+name+'","addrLine1":"'+addrLine1+'","location":"'+location+'","zipCode":"'+zipCode+'","states":"'+states+'","city":"'+city+'","email":"'+email+'","mobile":"'+mobile+'","whatsappNumber":"'+whatsappNumber+'","gender":"'+chooseGender+'","turorType":"'+turorType+'","preferGender":"'+preferGender+'","preferTiming":"'+preferTiming+'","preferDay":"'+preferDay+'","preferFee":"'+preferFee+'/'+hourlyMonthly+'","performance":"'+studentPerformance+'","reasonForQuery":"'+reasonForQuery+'","anythingElse":"'+anythingElse+'"}';
            $("#myProfileModal").modal('show');
            var html = '<table class="table table-bordered">';
                html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Contact Details</th></tr>'
                html += '<tr><td style="width:50%"> Name  </td><td> <b>'+name+'</b></td></tr>';
                html += '<tr><td> Mobile No.  </td><td> <b>'+mobile+'</b></td></tr>';
                html += '<tr><td> WhatsApp No./Alternate No.  </td><td> <b>'+whatsappNumber+'</b></td></tr>';
                html += '<tr><td> Email ID  </td><td> <b>'+email+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<table class="table table-bordered">';
                html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Learning Need</th></tr>'
                html += '<tr><td style="width:50%"> Class/Course/Exam  </td><td> <b>'+particularClass+', '+subjects+', '+board+'</b></td></tr>';
                html += '<tr><td> Address </td><td> <b>'+addrLine1+', '+location+', '+city+', '+states+', '+zipCode+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<table class="table table-bordered">';
                html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Preference</th></tr>'
                html += '<tr><td style="width:50%"> I am looking for  </td><td> <b>'+turorType+'</b></td></tr>';
                html += '<tr><td> Prefer Tutor </td><td> <b>'+preferGender+'</b></td></tr>';
                html += '<tr><td> Prefer Timing </td><td> <b>'+preferTiming+'</b></td></tr>';
                html += '<tr><td> Prefer Day </td><td> <b>'+preferDay+'</b></td></tr>';
                html += '<tr><td> I want to </td><td> <b>'+reasonForQuery+'</b></td></tr>';
                html += '<tr><td> Prefer Fee (<i>*Not Finial, May be Negotiable</i>) </td><td> <b>'+preferFee+'/'+hourlyMonthly+'</b></td></tr>';
                html += '<tr><td> Student Performance </td><td> <b>'+studentPerformance+'</b></td></tr>';
                html += '<tr><td> Any thing else </td><td> <b>'+anythingElse+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<div>';
                html += '<button type="button"  style="width:30%" class="btn btn-previous" data-dismiss="modal">Back</button>';
                html += '<button type="button"  style="width:30%;float: right;" id="submitData" class="btn">Confirm</button>'
                html += '</div>';
                $("#myProfileModal").find(".modal-body").html(html);

            // $.ajax({
            //     type: 'POST',
            //     url: baseUrl+"/student",
            //     contentType: "application/json;charset=utf-8",
            //     data: data,
            //     success: function(resultData) { 
            //         console.log(resultData);
            //         localStorage.setItem("userName",resultData.detail.name);
            //         localStorage.setItem("type",resultData.type);
            //         localStorage.setItem("userId",resultData.refId);
            //         localStorage.setItem("from_reg","Yes");
            //         window.location.href = '/dashboard/student/'+resultData.refId;
            //      }
            // });  
          }
    });

    $(document).on('click','#submitData',function(){
        $.ajax({
            type: 'POST',
            url: baseUrl+"/student",
            contentType: "application/json;charset=utf-8",
            data: data,
            success: function(resultData) { 
                console.log(resultData);
                localStorage.setItem("userName",resultData.detail.name);
                localStorage.setItem("type",resultData.type);
                localStorage.setItem("userId",resultData.refId);
                localStorage.setItem("from_reg","Yes");
                window.location.href = '/profile/student/'+resultData.refId;
            }
        }); 
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
