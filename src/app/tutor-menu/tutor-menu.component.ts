import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  }

}
