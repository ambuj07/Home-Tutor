import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-update-tutor-reference',
  templateUrl: './update-tutor-reference.component.html',
  styleUrls: ['./../update-tutor-profile.component.css']
})
export class UpdateTutorReferenceComponent implements OnInit {

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
      $('.selectpicker').selectpicker();
    });
    //experiance update function
    $(".formDiv_4 .tutorType").change(function(){
      var check = $(this).is(":checked");
      if(check){
        $(this).closest(".tutorCheck").find(".showOnCheck").css("display","block");
      }else{
        $(this).closest(".tutorCheck").find(".showOnCheck").css("display","none");
      }
  });
  $("#saveGuarantor").click(function(){
    var error = false;
     var jsonObj = [];
     var name1 = $("#name1").val();
     var mobileNumber1 = $("#mobileNumber1").val();
     var relationship1 = $("#relationship1").val();
     var name2 = $("#name2").val();
     var mobileNumber2 = $("#mobileNumber2").val();
     var relationship2 = $("#relationship2").val();
     if(name1 == "" || mobileNumber1 == "" || relationship1 == ""){
       error = true;
       showToast("Guarantor#1 is mandatory");
     }else{
      error = false;
      jsonObj.push({guarantor1:{name:name1,mobileNumber:mobileNumber1,relation:relationship1},guarantor2:{name:name2,mobileNumber:mobileNumber2,relation:relationship2}});
     }
     if(jsonObj.length > 0 && !error){
      console.log(JSON.stringify(jsonObj));
       $.ajax({
         type: 'POST',
         url: baseUrl+"/tutor/"+id+"/guarantor",
         contentType: "application/json;charset=utf-8",
         data: JSON.stringify(jsonObj),
         success: function(resultData) { 
           showToast("Guarantor saved successfully.")
           setTimeout(function(){ 
             window.location.href = "tutor/guarantor/"+id;
            }, 3000);
          },
          error :function(resultData){
            showToast("Something went wrong at server side");
          }
     });
     }else{
      showToast("Guarantor#1 is mandatory");
     }
  });
  $.ajax({
    type: 'GET',
    url: baseUrl+"/tutor/"+id+"/guarantor",
    success: function(resultData) { 
      console.log(resultData);            
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
