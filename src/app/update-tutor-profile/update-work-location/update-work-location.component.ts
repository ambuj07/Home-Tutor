import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-update-work-location',
  templateUrl: './update-work-location.component.html',
  styleUrls: ['./../update-tutor-profile.component.css']
})
export class UpdateWorkLocationComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if(id == null || id == "" || id == undefined){
        window.location.href = '/login'
      }
      $(document).ready(function() {
        $("#viewTabName").text("Update Work Locations");
        $(".sidenav a").removeClass("active");
        $("#editProfile").addClass("active");
        $('.selectpicker').selectpicker();
      });
        //zip code function 
            $("#saveZipCode").click(function(){
            var jsonObj = [];
            var error = false;
              $(".pinCode").each(function(){
                var pinCode = $(this).val();
                var location = $(this).closest(".formDiv").find(".location").val();
                var pinId = $(this).attr("data-id");
                console.log(pinCode);
                if(pinCode != "" && (pinCode.length != 6 || isNaN(pinCode))){
                  error = true;
                  $(this).css("border-color","red");
                }else if(pinCode != ""){
                  $(this).css("border-color","#ccc");
                  jsonObj.push({"id":pinId,"location":location,"tutorId":id,"zip":pinCode});
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
                      window.location.href = "profile/tutor";
                    }, 2000);
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
              resultData.forEach(function (a,i) {
                $(".pinCode:eq("+i+")").val(a.zip);
                $(".pinCode:eq("+i+")").attr("data-id",a.id);
                $(".location:eq("+i+")").val(a.location);
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
