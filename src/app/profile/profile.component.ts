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
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if(id == null || id == "" || id == undefined){
        window.location.href = '/login'
      }
      $(document).ready(function(){
        $("#viewTabName").text("Profile");
        $(".sidenav a").removeClass("active");
        $("#profile").addClass("active");
      });
        $.get(baseUrl+"/student/"+id,function(data){
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
          var html = '<table class="table table-bordered table-preview">';
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
                html += '<tr><td style="width:50%"> I am looking for  </td><td> <b>'+getTutorType(turorType)+'</b></td></tr>';
                html += '<tr><td> Prefer Tutor </td><td> <b>'+data.preferGender+'</b></td></tr>';
                html += '<tr><td> Prefer Timing </td><td> <b>'+data.preferTiming+'</b></td></tr>';
                html += '<tr><td> Prefer Day </td><td> <b>'+data.preferDay+'</b></td></tr>';
                html += '<tr><td> I want to </td><td> <b>'+data.reasonForQuery+'</b></td></tr>';
                html += '<tr><td> Prefer Fee <br><small>(<i>*Negotiable</i>)<small> </td><td> <b>'+data.preferFee+'</b></td></tr>';
                html += '<tr><td> Student Performance </td><td> <b>'+studentPerformance+'</b></td></tr>';
                html += '<tr><td> Any thing else </td><td> <b>'+anythingElse+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<div>';
                html += '</div>';
          $("#profileData").html(html);
        });
        $.get(baseUrl+"/job/student/"+id,function(data){
          if(data.contents[0] != null && data.contents[0] != undefined){
            var html = '<br><table class="table table-bordered table-preview">';
            html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Your Enquiry</th></tr>'
            html += '<tr><td> Enquiry Status : <b>'+data.contents[0].status+'</b></td></tr>';
            html += '<tr><td style="width:50%"> Enquiry Id :  <b>'+data.contents[0].sequenceId+'</b></td></tr>';
            html += '<tr><td style="width:50%"> Enquiry Date :  <b>'+getDateTimeFormat(data.contents[0].createdOn)+'</b></td></tr>';
            html += '</table>';
            $("#jobData").html(html);
          }
        });
        $(".profileNav .nav-link").click(function(){
          var navclick = $(this).attr("data-value");
          if(navclick == "Basic"){
            $(".slidable").slideDown();
          }else{
            $(".slidable").slideUp();
          }
        });
        function getTutorType(type){
          var retStr = "";
          if(type != undefined && type != null){
            if(type == "TUTOR"){
              retStr = "Home Tutor <br><small>(At Student's place)</small>";
            } else if(type == "COACHING"){
              retStr = "Coaching Institute <br><small>(At Tutor's place)</small>";
            }else if(type == "ONLINE"){
              retStr = "Online Teacher";
            }else if("TutorForTution" || "FACULTY"){
              retStr = "Faculty";
            }
          }
          return retStr;
        }
        function getDateTimeFormat(date){
          var d = new Date(date+ 'Z');
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          date = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear()+" ; "+tConv24(d.toLocaleTimeString());
          function tConv24(time24) {
            var ts = time24;
            var H = +ts.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? " AM" : " PM";
            ts = h + ts.substr(2, 3) + ampm;
            return ts;
          };
          return date;
        }
}

}
