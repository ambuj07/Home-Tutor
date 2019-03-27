import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.component.html',
  styleUrls: ['./student-menu.component.css']
})
export class StudentMenuComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {

    var id;
    this.route.params.subscribe(params => {
        id = params["id"];
    });

    var profilePicUrl = localStorage.getItem("profilePicUrl");
    if(profilePicUrl != undefined && profilePicUrl != null && profilePicUrl != ""){
      $(".profilePic").attr("src",profilePicUrl);
    }else{
      $(".profilePic").attr("src","/assets/userIcon.png");
    }

    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    }
  
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }
    $("#openSideNav").click(function(){
        openNav();
    })
    $("#closeSideNav").click(function(){
      closeNav();
    })
    $("#profile").click(function(){
      window.location.href = '/profile/student/'+id
    });
    $("#dashboard").click(function(){
      window.location.href = '/dashboard/student/'+id
    });
    $(document).on('click',".findMoreTutors",function(){
      window.location.href = '/postNewRequirement/'+id
    });
    //updateStatus
    $(document).on('click',".updateStatus",function(){
      window.location.href = 'student/updateStatus/'+id
    });
    //student/review/
    $(document).on('click',".review",function(){
      window.location.href = 'student/review/'+id
    });
  }

}
