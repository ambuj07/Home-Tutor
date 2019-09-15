import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-student-enquiry',
  templateUrl: './student-enquiry.component.html',
  styleUrls: ['./student-enquiry.component.css']
})
export class StudentEnquiryComponent implements OnInit {

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    const baseUrl = environment.baseUrl;
      var id;
      this.route.params.subscribe(params => {
        id = params["id"];
      });
      $("#viewTabName").text("Enquiry");
        $.get(baseUrl+"/job/"+id,function(data){
          var whatsappNumber = "";
          var turorType = "";
          var studentPerformance = "";
          if(data.student.whatsappNumber != undefined){
            whatsappNumber = data.student.whatsappNumber;
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
          if(data.student.addrLine1 != undefined){
            locationStr += data.student.addrLine1+", ";
          }
          if(data.student.location != undefined){
            locationStr += data.student.location+", ";
          }
          if(data.student.city != undefined){
            locationStr += data.student.city+", ";
          }
          if(data.student.states != undefined){
            locationStr += data.student.states+", ";
          }
          if(data.student.zipCode != undefined){
            locationStr += data.student.zipCode;
          }
          var html = '<table class="table table-bordered table-preview">';
                html += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Contact Details</th></tr>'
                html += '<tr><td style="width:50%"> <i class="fa fa-user-o" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i> <b>'+data.student.name+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-phone" aria-hidden="true" style="color: #e86507;font-size: 24px;margin-right: 5px;"></i> <b>'+data.student.mobile+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-whatsapp" aria-hidden="true" style="color: #e86507;font-size: 24px;margin-right: 5px;"></i> <b>'+whatsappNumber+'</b></td></tr>';
                html += '<tr><td> <i class="fa fa-envelope-o" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i> <b>'+data.student.email+'</b></td></tr>';
                html += '</table>';
                html += '<br>'
                html += '<table class="table table-bordered table-preview">';
                html += '<tr style="background: #d6d6d6;text-align: center;"><th>Learning Need</th></tr>'
                html += '<tr><td> <b><i class="fa fa-graduation-cap" aria-hidden="true" style="color: #e86507;font-size: 20px;margin-right: 5px;"></i>'+data.className+', '+data.subject+', '+data.board+'</b></td></tr>';
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

          var jobhtml = '<br><table class="table table-bordered table-preview">';
              jobhtml += '<tr style="background: #d6d6d6;"><th colspan="2" style="text-align: center;">Your Enquiry</th></tr>'
              jobhtml += '<tr><td> Enquiry Status : <b>'+data.status+'</b></td></tr>';
              jobhtml += '<tr><td style="width:50%"> Enquiry Id :  <b>'+data.sequenceId+'</b></td></tr>';
              jobhtml += '<tr><td style="width:50%"> Enquiry Date :  <b>'+getDateTimeFormat(data.createdOn)+'</b></td></tr>';
              jobhtml += '</table>';
          $("#jobData").html(jobhtml);
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

        function getDateTimeFormat(date){
          var d = new Date(date);
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
