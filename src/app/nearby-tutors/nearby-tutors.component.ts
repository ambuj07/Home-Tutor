import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-nearby-tutors',
  templateUrl: './nearby-tutors.component.html',
  styleUrls: ['./nearby-tutors.component.css']
})
export class NearbyTutorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(document).ready(function(){
        $.ajax({
          type: 'GET',
          url: "http://localhost:8080/tutor",
          //dataType: "json",
          contentType: "application/json;charset=utf-8",
          success: function(resultData) { 
              console.log(resultData);
              var len = resultData.contents.length;
              var isPagination = resultData.next;
              var html = '';
              if(len > 0){
                for(var i = 0; i < len; i++){
                  html += '<div class="col-md-3 col-xs-1">';
                  html += '<div class="tutorgrid">';
                  html += '<div class="text-centered">';
                  html += '<img src="/assets/userIcon.png" width="36px">';
                  html += '<div class="profile-name">'+resultData.contents[i].name+'</div>'
                  html += ' <div class="profile-heading">'+resultData.contents[i].subjects+' Teacher</div>'
                  html += '<div class="experiance">(CBSE)</div>';
                  html += '<a href="/profile?role=tutor&id='+resultData.contents[i].id+'" class="btn btn-primary btn-details">Show Details</a>';
                  html += '</div>';
                  html += '</div>';
                  html += '</div>';
                  $("#tutorGrid").html(html);
                }
              }
           }
      }); 
      });
  }

}
