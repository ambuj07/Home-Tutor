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

    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if(id == null || id == "" || id == undefined){
      window.location.href = '/login'
    }

    const baseUrl = environment.baseUrl;
    $.ajaxSetup({
      headers: { 'Authorization': token}
    });
       //remove otp
      // $.ajax({
      //     type: 'GET',
      //     url: baseUrl+"/tutor/"+id,
      //     // beforeSend: function(xhr) {
      //     //   xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      //     // },
      //     success : function(data){
      //       if(!data.otpValidated){
      //         window.location.href = '/otp';
      //       }
      //     }
      // });

    // var profilePicUrl = localStorage.getItem("profilePicUrl");
    // if(profilePicUrl != undefined && profilePicUrl != null && profilePicUrl != ""){
    //   $(".profilePic").attr("src",profilePicUrl);
    // }else{
    //   $(".profilePic").attr("src","/assets/userIcon.png");
    // }

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
      window.location.href = '/profile/tutor'
    });
    // $("#editProfile").click(function(){
    //   window.location.href = '/editProfile/tutor/'+id
    // });
    $("#dashboard").click(function(){
      window.location.href = '/dashboard/tutor';
    });
    $(document).on('click',".searchJobA",function(){
      window.location.href = 'stu/search/teaching-job';
    });
    $(document).on('click',".classAndSubject",function(){
      window.location.href = '/tutor/edit/classAndSubject'
    });
    $(document).on('click',".educationQualification",function(){
      window.location.href = '/tutor/edit/education';
    });
    $(document).on('click',".workLocation",function(){
      window.location.href = '/tutor/edit/workLocation';
    });
    $(document).on('click',".workExperience",function(){
      window.location.href = '/tutor/edit/experience';
    });
    $(document).on('click',".saveAddress",function(){
      window.location.href = '/tutor/edit/address';
    });
    $(document).on('click',".saveGuarantor",function(){
      window.location.href = '/tutor/edit/guarantor';
    });
  }

}
