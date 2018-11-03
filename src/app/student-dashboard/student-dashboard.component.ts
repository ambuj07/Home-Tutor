import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

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
      $.get(baseUrl+"/job/student/"+id,function(response){
        console.log("Jobs posted > "+response.totalSize);
        var html = "";
        if(response.totalSize > 0){
          html += '<table class="table table-bordered"><tr class="thead-light"><th>Job Id</th><th>Posted On</th><th>Class</th><th>Subject</th><th>Location</th><th>Preferred Tutor</><th>Job Status</th></tr>';
          for(var i = 0; i < response.totalSize; i++){
              html += '<tr>';
              html += '<td>'+response.contents[i].id+'</td>';
              html += '<td>'+response.contents[i].createdOn.split("T")[0]+'</td>';
              html += '<td>'+response.contents[i].className+'</td>';
              html += '<td>'+response.contents[i].subject+'</td>';
              html += '<td>'+response.contents[i].location+'</td>';
              html += '<td>'+response.contents[i].gender+'</td>';
              html += '<td>'+response.contents[i].status+'</td>';
              html += '</tr>';
          }
          html += '</table>';
        }else{
          html += '<div style="padding: 10px;text-align: center;font-size: 18px;background: #f3f3f3;">You have not posted any requirement yet, <a href="javascript:void(0)" class="findMoreTutors">Click here</a> to post your requirement.</div>'
        }
        $("#postedRequirements").html(html);
      });
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
      $("#viewTabName").text("Student Dashboard");
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
    $("#nearbyTutors").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#nearbyTutorsView').css('display','block');
      $("#viewTabName").text("Nearby Tutors");
    });
    $(document).on('click','.findMoreTutors',function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#findMoreTutorsView').css('display','block');
      $("#viewTabName").text("Find More Tutors");
    }); 
    $("#updateStatus").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#updateStatusView').css('display','block');
      $("#viewTabName").text("Update Status");
    });
  }

}
