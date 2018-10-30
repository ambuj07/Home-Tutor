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
    $("#findMoreTutors").click(function(){
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
