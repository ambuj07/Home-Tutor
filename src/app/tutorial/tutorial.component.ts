import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const baseUrl = environment.baseUrl;
    $(document).ready(function(){
      //Subjects and classes
      var classHtml = '<option value="" disabled selected>Select Class</option>';
      var subjectHtml = '';
      $.ajax({
        type: 'GET',
        url: baseUrl+"/config",
        async:false,
        //dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            for(var i=0; i<resultData.classes.length; i++){
              classHtml += '<option value="'+resultData.classes[i].id+'">'+resultData.classes[i].name+'</option>';
            }
            for(var i=0; i<resultData.subjects.length; i++){
              subjectHtml += '<option value="'+resultData.subjects[i].id+'">'+resultData.subjects[i].name+'</option>';
            }
          }
        });
        //$("#chooseClass").html(classHtml).selectpicker('refresh');
        //$("#chooseSubject").html(subjectHtml).selectpicker('refresh');
    })
    $("#find").click(function(){
      var zip = $("#zipCode").val();
      var classSel = $("select#chooseClass").val();
      window.location.href = '/nearbyTutors?zip='+zip+'&class='+classSel;
    });
  }

}
