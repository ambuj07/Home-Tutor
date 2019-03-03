import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
        $.get(baseUrl+"/student/"+id,function(data){
          $("#name").text(data.name);
          $("#mobile").text(data.mobile);
          if(data.whatsappNumber != undefined){
            $("#whatsappNumber").text(data.whatsappNumber);
          }
          $("#email").text(data.email);
          $("#gender").text(data.gender);
          var locationStr = "";
          if(data.addrLine1 != undefined){
            locationStr += data.addrLine1+", ";
          }
          if(data.location != undefined){
            locationStr += data.location+", ";
          }
          if(data.city != undefined){
            locationStr += data.city+", ";
          }
          if(data.states != undefined){
            locationStr += data.states+", ";
          }
          if(data.zipCode != undefined){
            locationStr += data.zipCode;
          }
          $("#location").text(locationStr);
          $("#preferGender").text(data.preferGender);
          $("#preferTiming").text(data.preferTiming);
          $("#preferDay").text(data.preferDay);
          $("#preferFee").text(data.preferFee);
          $("#performance").text(data.performance);
          $("#reasonForQuery").text(data.reasonForQuery);
          $("#anythingElse").text(data.anythingElse);
          $(".category").text(data.classcategory);
          $(".class").text(data.particularClass);
          $(".subject").text(data.subjects);
        })
        $(".profileNav .nav-link").click(function(){
          var navclick = $(this).attr("data-value");
          if(navclick == "Basic"){
            $(".slidable").slideDown();
          }else{
            $(".slidable").slideUp();
          }
        });
}

}
