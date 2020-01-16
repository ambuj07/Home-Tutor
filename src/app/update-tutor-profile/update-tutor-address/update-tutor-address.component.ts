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
      var id;
      this.route.params.subscribe(params => {
        id = params["id"];
      });
      $("#viewTabName").text("Update Your Address");
      $(".sidenav a").removeClass("active");
      $("#editProfile").addClass("active");
      $(document).ready(function() {
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
          var jsonObj = [];
          var error = false;
          var currAddress1 = $("#currentAddress").find("#currAddress1").val();
          var currAddress2 = $("#currentAddress").find("#currAddress2").val();
          var currPostalCode = $("#currentAddress").find("#currPostalCode").val();
          var currCity = $("#currentAddress").find("#currentCity").val();
          var currState = $("#currentAddress").find("select.states").val();
          var currAddressId = $("#currAddessId").val();
          var radioValue = $("input[name='isOwnHouse']:checked").val();
          var perAddress1 = $("#permanentAddress").find("#perAddress1").val();
          var perAddress2 = $("#permanentAddress").find("#perAddress2").val();
          var perPostalCode = $("#permanentAddress").find("#perPostalCode").val();
          var perCity = $("#permanentAddress").find("perCity").val();
          var perState = $("#permanentAddress").find("select.states").val();
          var perAddressId = $("#perAddessId").val();
          if(currAddress1 != "" && currAddress2 != "" && currPostalCode && currCity != "" && currState != ""){
            if(radioValue != undefined){
              jsonObj.push({"id":currAddressId,"addressType":"currentAddress","line1":currAddress1,"line2":currAddress2,"zip":currPostalCode,"city":currCity,"state":currState,"isOwnHouse":radioValue});
              error = false;
              if(radioValue == "No"){
                if(perAddress1 != "" && perAddress2 != "" && perPostalCode && perCity != "" && perState != ""){
                  error = false;
                  jsonObj.push({"id":perAddressId,"addressType":"permanentAddress","line1":perAddress1,"line2":perAddress2,"zip":perPostalCode,"city":perCity,"state":perState});
                }else{
                  error = true;
                  showToast("All permanent address fields are mandatory");
                }    
              }
            }else{
              error = true;
              showToast("Please select is this your own house ?");
            }
          }else{
            error = true;
            showToast("All address fields are mandatory")
          }
          console.log(JSON.stringify(jsonObj));
           if(jsonObj.length > 0 && !error){
            console.log(JSON.stringify(jsonObj));
             $.ajax({
               type: 'POST',
               url: baseUrl+"/tutor/"+id+"/address",
               contentType: "application/json;charset=utf-8",
               data: JSON.stringify(jsonObj),
               success: function(resultData) { 
                 showToast("Your address has been saved successfully.")
                 setTimeout(function(){ 
                   window.location.href = "tutor/address/"+id;
                  }, 3000);
                },
                error :function(resultData){
                  console.log(resultData);
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
