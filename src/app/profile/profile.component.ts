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
        $.get(baseUrl+"/student/"+id,function(data){
          $("#name").text(data.name);
          $("#find").text("Tutor");
          $("#mobile").text(data.mobile);
          $("#email").text(data.email);
          $("#gender").text(data.gender);
          $("#location").text(data.location);
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
