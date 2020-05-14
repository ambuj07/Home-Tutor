import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-nearby-studends',
  templateUrl: './nearby-studends.component.html',
  styleUrls: ['./nearby-studends.component.css']
})
export class NearbyStudendsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const baseUrl = environment.baseUrl;
    $(document).ready(function(){
      $.ajax({
        type: 'GET',
        url: baseUrl+"/student",
        //dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            var html = '';
            for(var i = 0; i < resultData.length; i++){
              html += '<div class="col-md-3 col-xs-1">';
              html += '<div class="tutorgrid">';
              html += '<div class="text-centered">';
              html += '<img src="/assets/userIcon.png" alt="hansa userIcon" width="36px">';
              html += '<div class="profile-name">'+resultData[i].name+'</div>'
              html += ' <div class="profile-heading">Class '+resultData[i].particularClass+'</div>'
              html += '<div class="experiance">(CBSE)</div>';
              html += '<a title="hansa tutor" href="javascript:void(0)" class="btn btn-primary btn-details">Show Details</a>';
              html += '</div>';
              html += '</div>';
              html += '</div>';
              $("#studentGrid").html(html);
            }
         }
    }); 
    });
  }

}
