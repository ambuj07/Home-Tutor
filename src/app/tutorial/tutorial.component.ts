import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare var $:any;


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
        $("#chooseClass").html(classHtml).selectpicker('refresh');
        //$("#chooseSubject").html(subjectHtml).selectpicker('refresh');
    })
    $("#find").click(function(){
      var zip = $("#zipCode").val();
      var classSel = $("select#chooseClass").val();
      if(zip == "" || zip == null){
        $("#zipCode").addClass('input-error');
        showToast("Zip code is mandatory.")
      }else{
        window.location.href = '/nearbyTutors?zip='+zip+'&class='+classSel;
      }
    });
    //general functions
    function showToast(data) {
      var x = document.getElementById("snackbar");
      x.className = "show";
      x.innerText = data;
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    $(document).on('change','.selectpicker',function() {
      $(this).next().blur();
    });
  }

}
