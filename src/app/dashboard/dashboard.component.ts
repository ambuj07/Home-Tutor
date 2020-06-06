import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {

    var baseUrl = environment.baseUrl;

    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if(id == null || id == "" || id == undefined){
      window.location.href = '/login'
    }

    
    $(document).ready(function(){
      $("#viewTabName").text("Tutor Dashboard");
      $(".sidenav a").removeClass("active");
      $("#dashboard").addClass("active");
      $('#dashboardView').css('display','block');
      var reg = localStorage.getItem('from_reg');
      if(reg == 'Yes'){
        $('.registrationDiv').css("display","block");
        localStorage.setItem('from_reg','No');
      }else{
        $('.registrationDiv').css("display","none");
      }
      getAppliedJobByPage(0);
      $(document).on('click','.applied-page-btn',function(){
        var pageNumber = $(this).text();
        getAppliedJobByPage(parseInt(pageNumber)-1);
      });

      // $.ajaxSetup({
      //     headers: { "token": localStorage.getItem("token") }
      //  });
      //$http.defaults.headers.common.Authorization = $window.sessionStorage.token
      function getAppliedJobByPage(page){
        $.ajax({
          type: 'GET',
          url: baseUrl+"/jobApplication/"+id+"?page="+page,
          // beforeSend: function(xhr) {
          //   xhr.setRequestHeader("Authorization", );
          // },
          headers: {
            "Authorization": localStorage.getItem("token")
          },
          success : function(response){
            console.log(response);
            var html = "";
            if(response.contents.length > 0){
              html += '<table class="table table-bordered">';
              html += '<tr class="thead-light"><th>Enq. No.</th>';
              html += '<th>Student</th>';
              html += '<th>Phone No.</th>';
              html += '<th>Update Status</th>';
              html += '<th>Status</th>';
              html += '<th>Remark</th></tr>';
              for(var i = 0; i < response.contents.length; i++){
                  html += '<tr>';
                  html += '<td style="vertical-align: middle;"><a href="/enq/'+response.contents[i].job.sequenceId+'">'+response.contents[i].job.sequenceId+'</a></td>';
                  html += '<td style="vertical-align: middle;">'+response.contents[i].job.student.name+'</td>';
                  html += '<td style="vertical-align: middle;">'+response.contents[i].job.student.mobile+'</td>';
                  html += '<td style="vertical-align: middle;"><a href="/enq/'+response.contents[i].job.sequenceId+'">Update Status</a></td>';
                  html += '<td style="vertical-align: middle;">'+response.contents[i].status+'</td>';
                  html += '<td style="vertical-align: middle;">'+response.contents[i].status+'<br>'+getDateTimeFormat(response.contents[i].updatedOn)+'</td>';
                  html += '</tr>';
              }
              html += '</table>';
              //pagination 
              if(response.page > 1){
                var htmlPage = '';
                htmlPage +='<ul class="pagination">'
                for(var i=1; i <= response.page; i++){
                  htmlPage += '<li class="page-item"><a rel="nofollow" title="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" class="page-link applied-page-btn" href="javascript:void(0)">'+i+'</a></li>';
                }
                htmlPage +='</ul>'
                $("#pagination2").html(htmlPage);
              }  
              //pagination end
            }else{
              html += '<div style="padding: 10px;text-align: center;font-size: 18px;background: #f3f3f3;">You have not applied for any job yet, <a rel="nofollow" title="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" href="javascript:void(0)" class="findJobs">Click here</a> to find a job.</div>'
            }
            $("#appliedJobs").html(html);
          }
        });
      }
      
    });
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
    $("#editProfile").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#editProfileView').css('display','block');
      $("#viewTabName").text("Edit Profile");
    });
    $("#nearbyStudents").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#nearbyStudentsView').css('display','block');
      $("#viewTabName").text("Nearby Students");
    });
  }

}
