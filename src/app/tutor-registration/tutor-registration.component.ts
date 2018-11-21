import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
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
    const baseUrl = environment.baseUrl;
    $(document).ready(function(){
      //show on change
      });
      
      $("#pinCode").on('blur',function(){
          var pin = $("#pinCode").val();
          if(pin != ""){
              $.get('http://postalpincode.in/api/pincode/'+pin,function(response){
                  if(response.Status == "Error"){
                    $("#pinCode").addClass('input-error');
                    $("#pinCode").closest(".form-group").append('<div class="errorText" style="font-size: 13px;color: red;font-style: italic;">Enter valid pin code</div>')
                  }else{
                      if(response.PostOffice.length > 0){
                        $("#location").val(response.PostOffice[0].Name);
                        $("#city").val(response.PostOffice[0].Region);
                      }
                  }
              });
          }
      })

      $("#submit").click(function(){
        var error = false;  
          $(this).parents('.fieldset').find('select,input').each(function () {
                if ($(this).is(":visible") && ($(this).val() == null || $(this).val() == "")) {
                    $(this).addClass('input-error');
                    error = true;
                } else {
                    $(this).removeClass('input-error');
                }
          });
          if(!error){
            var name = $("#name").val();
            var location = $("#location").val(); 
            var mobile = $("#mobileNumber").val(); 
            var email = $("#email").val(); 
            var category = $("#tutorType").val(); 
            var classcategory = $("#classGroup").val();  
            var particularClass = $("#chooseClass").val(); 
            var subjects = $("#chooseSubject").val();
            var chooseGender = $("#chooseGender").val(); 
            var qualification = $("#qualification").val();
            var pin = $("#pinCode").val();
            var city = $("#city").val();
            var data = '{"id":null,"name":"'+name+'","location":"'+location+'","mobile":"'+mobile+'","email":"'+email+'","category":"'+category+'","zipCode":"'+pin+'","city":"'+city+'","gender":"'+chooseGender+'","qualification":"'+qualification+'"}';
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
                    window.location.href = '/dashboard/tutor/'+resultData.refId;
                 }
            });  
          }
      });
      $('.fieldset').find('select,input').change(function(){
        $(this).removeClass('input-error');
        $(this).closest('.form-group').find('.errorText').remove();
      });
  }

}
