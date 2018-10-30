import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var reg = localStorage.getItem('from_reg');
    if(reg == 'Yes'){
      $('.registrationDiv').css("display","block");
      localStorage.setItem('from_reg','No');
    }else{
      $('.registrationDiv').css("display","none");
    }
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
    $("#findJobs").click(function(){
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
