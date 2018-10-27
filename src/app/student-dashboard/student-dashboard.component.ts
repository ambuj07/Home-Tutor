import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
      $('.allNavElements').css('display','none');
      $('#dashboardView').css('display','block');
      $("#viewTabName").text("Student Dashboard");
    });
    $("#profile").click(function(){
      $('.allNavElements').css('display','none');
      $('#profileView').css('display','block');
      $("#viewTabName").text("Profile");
    });
    $("#editProfile").click(function(){
      $('.allNavElements').css('display','none');
      $('#editProfileView').css('display','block');
      $("#viewTabName").text("Edit Profile");
    });
    $("#nearbyTutors").click(function(){
      $('.allNavElements').css('display','none');
      $('#nearbyTutorsView').css('display','block');
      $("#viewTabName").text("Nearby Tutors");
    });
    $("#findMoreTutors").click(function(){
      $('.allNavElements').css('display','none');
      $('#findMoreTutorsView').css('display','block');
      $("#viewTabName").text("Find More Tutors");
    }); 
    $("#updateStatus").click(function(){
      $('.allNavElements').css('display','none');
      $('#updateStatusView').css('display','block');
      $("#viewTabName").text("Update Status");
    });
  }

}
