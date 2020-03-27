import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-update-tutor-address',
  templateUrl: './update-tutor-address.component.html',
  styleUrls: ['./../update-tutor-profile.component.css']
})
export class UpdateTutorAddressComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if(id == null || id == "" || id == undefined){
        window.location.href = '/login'
      }
      $(document).ready(function() {
        $("#viewTabName").text("Update Your Address");
        $(".sidenav a").removeClass("active");
        $("#editProfile").addClass("active");
        $('.selectpicker').selectpicker();
      });
        //Address update
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
        $(".states").html(statesHtml).selectpicker();
        
        // $('.states').change(function(){
        //   var stateId = $('option:selected', this).attr('data-id');
        //   var cityHtml = '<option value="" selected disabled>Select Your City</option>';
        //   $.ajax({
        //     type: 'GET',
        //     url: baseUrl+"/config/"+stateId+"/city",
        //     async:false,
        //     contentType: "application/json;charset=utf-8",
        //     success: function(resultData) { 
        //       resultData.forEach(function (a){
        //           cityHtml += '<option value="'+a.name+'">'+a.name+'</option>';
        //         });
        //       }
        //     });
        //     $("#city").html(cityHtml).selectpicker();
        //     $("#city").selectpicker('refresh');
        //     $("#cityDiv").prop('hidden',false);
        //   });

        $("input[name='isOwnHouse']").change(function(){
          var radioValue = $("input[name='isOwnHouse']:checked").val();
          if(radioValue == "No"){
            $("#permanentAddress").prop('hidden',false);
          }else{
            $("#permanentAddress").prop('hidden',true);
          }
        });

        $("#saveAddress").click(function(){
          var jsonObj = {"address":null};
          var error = false;
          var currAddress1 = $("#currentAddress").find("#currAddress1").val();
          var currAddress2 = $("#currentAddress").find("#currAddress2").val();
          var currPostalCode = $("#currentAddress").find("#currPostalCode").val();
          var currCity = $("#currentAddress").find("#currentCity").val();
          var currState = $("#currentAddress").find("select.states").val();
          var currAddressId = $("#currAddessId").val();
          var currAddressUrl = $("#currAddessUrl").val();
          var radioValue = $("input[name='isOwnHouse']:checked").val();
          var perAddress1 = $("#permanentAddress").find("#perAddress1").val();
          var perAddress2 = $("#permanentAddress").find("#perAddress2").val();
          var perPostalCode = $("#permanentAddress").find("#perPostalCode").val();
          var perCity = $("#permanentAddress").find("#perCity").val();
          var perState = $("#permanentAddress").find("select.states").val();
          var perAddressId = $("#perAddessId").val();
          var perAddressUrl = $("#perAddessUrl").val();
          if(currAddress1 != "" && currAddress2 != "" && currPostalCode && currCity != "" && currState != ""){
            if(radioValue != undefined){
              var currentAddressJson = {"currentAddress":null}
              currentAddressJson.currentAddress = {"id": currAddressId,"line1": currAddress1,"line2": currAddress2,"line3": "","landmark": "","zipcode": currPostalCode,"city": currCity,"state": currState,"url": currAddressUrl,"isOwnHouse":"true","addressType": "currentAddress"};
              jsonObj.address = currentAddressJson;
              var perAddessJson = {"id": perAddressId,"line1": currAddress1,"line2": currAddress2,"line3": "","landmark": "","zipcode": currPostalCode,"city": currCity,"state": currState,"url": perAddressUrl,"isOwnHouse":"false","addressType": "permanentAddress"};
              error = false;
              if(radioValue == "No"){
                if(perAddress1 != "" && perAddress2 != "" && perPostalCode && perCity != "" && perState != ""){
                  error = false;
                  perAddessJson = {"id": perAddressId,"line1": perAddress1,"line2": perAddress2,"line3": "","landmark": "","zipcode": perPostalCode,"city": perCity,"state": perState,"url": "","isOwnHouse":"false","addressType": "permanentAddress"};
                }else{
                  error = true;
                  showToast("All permanent address fields are mandatory");
                }    
              }
              jsonObj.address["permanentAddress"] = perAddessJson;
            }else{
              error = true;
              showToast("Please select is this your own house ?");
            }
          }else{
            error = true;
            showToast("All address fields are mandatory")
          }
           if(jsonObj.address != null && !error){
            console.log(JSON.stringify(jsonObj));
             $.ajax({
               type: 'POST',
               url: baseUrl+"/tutor/"+id+"/address",
               contentType: "application/json;charset=utf-8",
               data: JSON.stringify(jsonObj),
               success: function(resultData) { 
                 showToast("Your address has been saved successfully.")
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

        //get  address
        $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id+"/address",
          success: function(resultData) { 
            if(resultData.address.currentAddress != undefined && resultData.address.currentAddress != null){
                $("#currentAddress").find("#currAddress1").val(resultData.address.currentAddress.line1);
                $("#currentAddress").find("#currAddress2").val(resultData.address.currentAddress.line2);
                $("#currentAddress").find("#currPostalCode").val(resultData.address.currentAddress.zipcode);
                $("#currentAddress").find("#currentCity").val(resultData.address.currentAddress.city);
                $("#currentAddress").find("select.states").val(resultData.address.currentAddress.state).selectpicker("refresh");
                $("#currAddessId").val(resultData.address.currentAddress.id);
                if(resultData.address.currentAddress.url != null && resultData.address.currentAddress.url != ""){
                  $("#currAddessUrl").val(resultData.address.currentAddress.url);
                  $("#frontImg").attr("src",resultData.address.currentAddress.url+"?v="+Math.random());
                }
                //$(".profilePic").attr("src",data.imageUrl+"?v="+Math.random());
            }else{
              $("#addressProof").css("display","none");
            }  
            if(resultData.address.permanentAddress != undefined && resultData.address.permanentAddress != null){
                $("#permanentAddress").find("#perAddress1").val(resultData.address.permanentAddress.line1);
                $("#permanentAddress").find("#perAddress2").val(resultData.address.permanentAddress.line2);
                $("#permanentAddress").find("#perPostalCode").val(resultData.address.permanentAddress.zipcode);
                $("#permanentAddress").find("#perCity").val(resultData.address.permanentAddress.city);
                $("#permanentAddress").find("select.states").val(resultData.address.permanentAddress.state).selectpicker("refresh");
                $("#perAddessId").val(resultData.address.permanentAddress.id);
                if(resultData.address.permanentAddress.url != null && resultData.address.permanentAddress.url != ""){
                  $("#perAddessUrl").val(resultData.address.permanentAddress.url);
                  $("#backImg").attr("src",resultData.address.permanentAddress.url+"?v="+Math.random());
                }
            }       
          }
        });
        //upload profile pic
        $("#uploadFrontSide").change(function(){
          var currAddressId = $("#currAddessId").val();
          var fileInput = document.getElementById('uploadFrontSide');
          var file = (<HTMLInputElement>fileInput).files[0];
          var formData = new FormData();
          formData.append('file', file);
          $.ajax({
                url: baseUrl+"/tutor/address/"+currAddressId+"/upload",
                type : 'POST',
                data : formData,
                processData: false,
                contentType: false,  
                success : function(data) {
                  window.location.href = "profile/tutor";
                }
          });
        });
        $("#uploadBackSide").change(function(){
          var perAddressId = $("#perAddessId").val();
          var fileInput = document.getElementById('uploadBackSide');
          var file = (<HTMLInputElement>fileInput).files[0];
          var formData = new FormData();
          formData.append('file', file);
          $.ajax({
                url: baseUrl+"/tutor/address/"+perAddressId+"/upload",
                type : 'POST',
                data : formData,
                processData: false,
                contentType: false,  
                success : function(data) {
                  window.location.href = "profile/tutor";
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
