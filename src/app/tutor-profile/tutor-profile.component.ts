import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
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
            $("#name").text(data.name);
            $("#find").text("Job");
            $("#mobile").text(data.mobile);
            $("#email").text(data.email);
            $("#gender").text(data.gender);
            $("#location").text(data.location);
            $("#qualification").text(data.qualification);
            $(".classCategory").text(data.classcategory);
            $(".class").text(data.particularClass);
            $(".subject").text(data.subjects);
            $("#category").text(data.category);
            $(".total-credit").text("Available Credit "+data.credit)
          },
          error : function(data){
            console.log(data)
          }
          
        });
    $(".profileNav .nav-link").click(function(){
      var navclick = $(this).attr("data-value");
      if(navclick == "Basic"){
        $(".slidable").slideDown();
        $(".total-credit").css("position","absolute");
      }else{
        $(".slidable").slideUp();
        $(".total-credit").css("position","relative");
      }
    });
  }

}
