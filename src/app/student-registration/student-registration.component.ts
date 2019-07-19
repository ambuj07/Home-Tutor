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

    //class category
    var categoryHtml = '<option value="" selected disabled>Select Class Category</option>';
    
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
              categoryHtml += '<option data-id="'+a.id+'" value="'+a.name+'">'+nameArr[0]+'</option>';
              categoryHtml += '<option style="font-size:12px;margin-top:-10px" data-id="'+a.id+'" value="'+a.name+'">('+nameArr[1]+'</option>';
            }else{
              categoryHtml += '<option data-id="'+a.id+'" value="'+a.name+'">'+a.name+'</option>';
            }
          })
        }
    });
    $("#classGroup").html(categoryHtml).selectpicker();
      //show on change
      $("#classGroup").on('change',function(){
        $("#classGroup").val($(this).val()).selectpicker("refresh")
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

      //other board
      $("#board").on('change',function(){
        if($(this).val() == 'Other'){
          $(".otherBoard").prop('hidden',false); 
        }else{
          $(".otherBoard").prop('hidden',true);
        }
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
              statesHtml += '<option data-id="'+a.id+'" value="'+a.name+'">'+a.name+'</option>';
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
            if(board == 'Other'){
              board = $("#otherBoard").val();
            }
            var addrLine1 = $("#addrLine1").val();
            var location = $("#location").val()
            var zipCode = $("#pinCode").val() 
            var states = $("#states").val();
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
            data = '{"id":null,"category":"","classcategory":"'+classcategory+'","particularClass":"'+particularClass+'","subjects":"'+subjects+'","board":"'+board+'","name":"'+name+'","addrLine1":"'+addrLine1+'","location":"'+location+'","zipCode":"'+zipCode+'","states":"'+states+'","city":"'+city+'","email":"'+email+'","mobile":"'+mobile+'","whatsappNumber":"'+whatsappNumber+'","turorType":"'+turorType+'","preferGender":"'+preferGender+'","preferTiming":"'+preferTiming+'","preferDay":"'+preferDay+'","preferFee":"'+preferFee+'/'+hourlyMonthly+'","performance":"'+studentPerformance+'","reasonForQuery":"'+reasonForQuery+'","anythingElse":"'+anythingElse+'"}';
            $("#myProfileModal").modal('show');
            var html = '<table class="table table-bordered table-preview">';
                html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Contact Details</th></tr>'
                html += '<tr><td style="width:50%"> <i class="fa fa-user-o" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i> <b>'+name+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-phone" aria-hidden="true" style="color: #e86507;font-size: 24px;margin-right: 5px;"></i> <b>'+mobile+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-whatsapp" aria-hidden="true" style="color: #e86507;font-size: 24px;margin-right: 5px;"></i> <b>'+whatsappNumber+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-envelope-o" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i> <b>'+email+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<table class="table table-bordered table-preview">';
                html += '<tr style="background: #d6d6d6;text-align: center;"><th>Learning Need</th></tr>'
                html += '<tr><td> <b><i class="fa fa-graduation-cap" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i>'+particularClass+', '+subjects+', '+board+'</b></td></tr>';
                html += '<tr><td> <b> <i class="fa fa-map-marker" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i>'+addrLine1+', '+location+', '+city+', '+states+', '+zipCode+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<table class="table table-bordered">';
                html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Preference</th></tr>'
                html += '<tr><td style="width:50%"> I am looking for  </td><td> <b>'+getTutorType(turorType)+'</b></td></tr>';
                html += '<tr><td> Prefer Tutor </td><td> <b>'+preferGender+'</b></td></tr>';
                html += '<tr><td> Prefer Timing </td><td> <b>'+preferTiming+'</b></td></tr>';
                html += '<tr><td> Prefer Day </td><td> <b>'+preferDay+'</b></td></tr>';
                html += '<tr><td> I want to </td><td> <b>'+reasonForQuery+'</b></td></tr>';
                html += '<tr><td> Prefer Fee <br><small>(<i>*Negotiable</i>)<small> </td><td> <b>'+preferFee+'/'+hourlyMonthly+'</b></td></tr>';
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
      function getTutorType(type){
        var retStr = "";
        if(type != undefined && type != null){
          if(type == "TUTOR"){
            retStr = "Home Tutor / Trainer <br><small>(At Student's place)</small>";
          } else if(type == "COACHING"){
            retStr = "Tuition Centre <br><small>(At Tutor's place)</small>";
          }else if(type == "ONLINE"){
            retStr = "Online Tutor / Trainer";
          }else if("TutorForTution"){
            retStr = "Tutor For Our Tution Centre";
          }
        }
        return retStr;
      }
  }

}
