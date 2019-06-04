import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-tutor-menu',
  templateUrl: './tutor-menu.component.html',
  styleUrls: ['./tutor-menu.component.css']
})
export class TutorMenuComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {

    var id;
    this.route.params.subscribe(params => {
        id = params["id"];
    });

    const baseUrl = environment.baseUrl;
      var id;
      this.route.params.subscribe(params => {
        id = params["id"];
      });
      $("#viewTabName").text("Profile");
      $(".sidenav a").removeClass("active");
      $("#profile").addClass("active");
       
      $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id,
          // beforeSend: function(xhr) {
          //   xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
          // },
          success : function(data){
            if(!data.otpValidated){
              window.location.href = '/otp';
            }
          }
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
      window.location.href = '/profile/tutor/'+id
    });
    $("#editProfile").click(function(){
      window.location.href = '/editProfile/tutor/'+id
    });
    $("#dashboard").click(function(){
      window.location.href = '/dashboard/tutor/'+id
    });
    $(document).on('click',".findJobs",function(){
      window.location.href = '/findJobs/tutor/'+id
    });
    $(document).on('click',".classAndSubject",function(){
      window.location.href = '/tutor/classAndSubject/'+id
    });
    $(document).on('click',".educationQualification",function(){
      window.location.href = '/tutor/education/'+id
    });
    $(document).on('click',".workLocation",function(){
      window.location.href = '/tutor/workLocation/'+id
    });
    $(document).on('click',".workExperience",function(){
      window.location.href = '/tutor/experience/'+id
    });
    $(document).on('click',".saveAddress",function(){
      window.location.href = '/tutor/address/'+id
    });
  }

}
