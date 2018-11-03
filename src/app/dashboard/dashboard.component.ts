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

    var id;
    this.route.params.subscribe(params => {
        id = params["id"];
    });
    
    $(document).ready(function(){
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

      function getAppliedJobByPage(page){
        $.get(baseUrl+"/jobApplication/"+id+"?page="+page,function(response){
          console.log(response);
          var html = "";
          if(response.contents.length > 0){
            html += '<table class="table table-bordered"><tr class="thead-light"><th>Job Id</th><th>Posted On</th><th>Student</th><th>Class</th><th>Subject</th><th>Location</th><th>Job Status</th><th>Application Status</th></tr>';
            for(var i = 0; i < response.contents.length; i++){
                html += '<tr>';
                html += '<td>'+response.contents[i].id+'</td>';
                html += '<td>'+response.contents[i].job.createdOn.split("T")[0]+'</td>';
                html += '<td>'+response.contents[i].job.student.name+'</td>';
                html += '<td>'+response.contents[i].job.className+'</td>';
                html += '<td>'+response.contents[i].job.subject+'</td>';
                html += '<td>'+response.contents[i].job.location+'</td>';
                html += '<td>'+response.contents[i].job.status+'</td>';
                html += '<td>'+response.contents[i].status+'</td>';
                html += '</tr>';
            }
            html += '</table>';
            //pagination 
            if(response.page > 1){
              var htmlPage = '';
              htmlPage +='<ul class="pagination">'
              for(var i=1; i <= response.page; i++){
                htmlPage += '<li class="page-item"><a class="page-link applied-page-btn" href="javascript:void(0)">'+i+'</a></li>';
              }
              htmlPage +='</ul>'
              $("#pagination2").html(htmlPage);
            }  
            //pagination end
          }else{
            html += '<div style="padding: 10px;text-align: center;font-size: 18px;background: #f3f3f3;">You have not applied for any job yet, <a href="javascript:void(0)" class="findJobs">Click here</a> to find a job.</div>'
          }
          $("#appliedJobs").html(html);
        });
      }
      
    });
    
    $(".sidenav a").click(function(){
      closeNav();
      $(".sidenav a").removeClass("active");
      $(this).addClass("active");
    });
    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    }
  
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    $("#openSideNav").click(function(){
        openNav();
    })
    $("#closeSideNav").click(function(){
      closeNav();
    })
    $("#dashboard").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#dashboardView').css('display','block');
      $("#viewTabName").text("Tutor Dashboard");
    });
    $("#profile").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#profileView').css('display','block');
      $("#viewTabName").text("Profile");
    });
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
    $(document).on('click',".findJobs",function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#findJobsView').css('display','block');
      $("#viewTabName").text("Find Jobs");
    }); 
    $("#updateStatus").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#updateStatusView').css('display','block');
      $("#viewTabName").text("Update Status");
    }); 
  }

}
