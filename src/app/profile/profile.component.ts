import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      var id;
      this.route.params.subscribe(params => {
        id = params["id"];
      });
      $("#viewTabName").text("Profile");
      $(".sidenav a").removeClass("active");
      $("#profile").addClass("active");
        $.get(baseUrl+"/student/"+id,function(data){
          console.log(data);
          $("#name").text(data.name);
          $("#mobile").text(data.mobile);
          $("#email").text(data.email);
          $("#gender").text(data.gender);
          var whatsappNumber = "";
          var turorType = "";
          var studentPerformance = "";
          if(data.whatsappNumber != undefined){
            whatsappNumber = data.whatsappNumber;
          }
          if(data.turorType != undefined && data.turorType != null){
            turorType = data.turorType;
          }
          if(data.performance != undefined && data.performance != null){
            studentPerformance = data.performance;
          }
          var anythingElse = "";
          if(data.anythingElse != undefined && data.anythingElse != null){
            anythingElse = data.anythingElse;
          }
          var locationStr = "";
          if(data.addrLine1 != undefined){
            locationStr += data.addrLine1+", ";
          }
          if(data.location != undefined){
            locationStr += data.location+", ";
          }
          if(data.city != undefined){
            locationStr += data.city+", ";
          }
          if(data.states != undefined){
            locationStr += data.states+", ";
          }
          if(data.zipCode != undefined){
            locationStr += data.zipCode;
          }
          // $("#location").text(locationStr);
          // $("#preferGender").text(data.preferGender);
          // $("#preferTiming").text(data.preferTiming);
          // $("#preferDay").text(data.preferDay);
          // $("#preferFee").text(data.preferFee);
          // $("#performance").text(data.performance);
          // $("#reasonForQuery").text(data.reasonForQuery);
          // $("#anythingElse").text(data.anythingElse);
          // $(".category").text(data.classcategory);
          // $(".class").text(data.particularClass);
          // $(".subject").text(data.subjects);
          var html = '<br><table class="table table-bordered table-preview">';
                html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Contact Details</th></tr>'
                html += '<tr><td style="width:50%"> <i class="fa fa-user-o" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i> <b>'+data.name+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-phone" aria-hidden="true" style="color: #e86507;font-size: 24px;margin-right: 5px;"></i> <b>'+data.mobile+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-whatsapp" aria-hidden="true" style="color: #e86507;font-size: 24px;margin-right: 5px;"></i> <b>'+whatsappNumber+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-envelope-o" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i> <b>'+data.email+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<table class="table table-bordered table-preview">';
                html += '<tr style="background: #d6d6d6;text-align: center;"><th>Learning Need</th></tr>'
                html += '<tr><td> <b><i class="fa fa-graduation-cap" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i>'+data.particularClass+', '+data.subjects+', '+data.board+'</b></td></tr>';
                html += '<tr><td> <b> <i class="fa fa-map-marker" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i>'+locationStr+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<table class="table table-bordered">';
                html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Preference</th></tr>'
                html += '<tr><td style="width:50%"> I am looking for  </td><td> <b>'+turorType+'</b></td></tr>';
                html += '<tr><td> Prefer Tutor </td><td> <b>'+data.preferGender+'</b></td></tr>';
                html += '<tr><td> Prefer Timing </td><td> <b>'+data.preferTiming+'</b></td></tr>';
                html += '<tr><td> Prefer Day </td><td> <b>'+data.preferDay+'</b></td></tr>';
                html += '<tr><td> I want to </td><td> <b>'+data.reasonForQuery+'</b></td></tr>';
                html += '<tr><td> Prefer Fee <br><small>(<i>*Not Finial, May be Negotiable</i>)<small> </td><td> <b>'+data.preferFee+'</b></td></tr>';
                html += '<tr><td> Student Performance </td><td> <b>'+studentPerformance+'</b></td></tr>';
                html += '<tr><td> Any thing else </td><td> <b>'+data.anythingElse+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<div>';
                html += '</div>';
          $("#profileData").html(html);
        })
        $(".profileNav .nav-link").click(function(){
          var navclick = $(this).attr("data-value");
          if(navclick == "Basic"){
            $(".slidable").slideDown();
          }else{
            $(".slidable").slideUp();
          }
        });
}

}
