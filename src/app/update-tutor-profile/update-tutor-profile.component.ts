import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-update-tutor-profile',
  templateUrl: './update-tutor-profile.component.html',
  styleUrls: ['./update-tutor-profile.component.css']
})
export class UpdateTutorProfileComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      var id;
      this.route.params.subscribe(params => {
        id = params["id"];
      });
      $("#viewTabName").text("Update Profile");
      $(".sidenav a").removeClass("active");
      $("#editProfile").addClass("active");
      $(document).ready(function() {
        //toggle the component with class accordion_body
        $(".accordion_head").click(function() {
          if ($('.accordion_body').is(':visible')) {
            $(".accordion_body").slideUp(300);
            $(".plusminus").text('+');
          }
          if ($(this).next(".accordion_body").is(':visible')) {
            $(this).next(".accordion_body").slideUp(300);
            $(this).children(".plusminus").text('+');
          } else {
            $(this).next(".accordion_body").slideDown(300);
            $(this).children(".plusminus").text('-');
          }
        });
        $('.selectpicker').selectpicker();
      });

         //general functions
         function showToast(data) {
          var x = document.getElementById("snackbar");
          x.className = "show";
          x.innerText = data;
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        function checkNullOrUndefined(str){
          var blank = "";
          if(str == null || str == undefined){
            return blank;
          }else{
            return str
          }
        }
        $(document).on('change','.selectpicker',function() {
          $(this).next().blur();
        });
  }

}
