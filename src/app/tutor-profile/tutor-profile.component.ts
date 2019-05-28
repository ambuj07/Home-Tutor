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
            $("#whatsappNumber").text(data.whatsappNumber)
            $("#email").text(data.email);
            $("#gender").text(data.gender);
            $("#age").text(data.age);
            $("#location").text(data.location+", "+data.state+", "+data.city);
            $("#experience").text(data.experience);
            $("#qualification").text(data.qualification);
            if(data.types.length > 0){
              data.types.forEach(function(a){
                $("#tutorType").append(a.teacherType+", ");
              })
            }
            $("#jobType").text(data.jobType);
            $("#fluencyInEnglish").text(data.fluencyInEnglish);
            $("#category").text(data.category);
            if(data.imageUrl != null){
              $(".profilePic").attr("src",data.imageUrl);
              localStorage.setItem("profilePicUrl",data.imageUrl);
            }else{
              $(".profilePic").attr("src","/assets/userIcon.png");
            }
            $(".total-credit").text("Credit : "+data.credit);
            if(data.mapping.length > 0){
              var grouped = {};
              data.mapping.forEach(function (a) {
                grouped[a.classGroup.name] = grouped[a.classGroup.name] || [];
                grouped[a.classGroup.name].push(a.subjectMaster.name);
              });
              var tableHtml = '';
              for (var key in grouped) {
                tableHtml += '<tr>';
                tableHtml += '<td>'+key+'</td>'
                tableHtml += '<td>'+grouped[key]+'</td>'
                tableHtml += '</tr>';
              }
              $("#classesAndSubjectTable").append(tableHtml);
            }
            if(data.education.length > 0){
              var eduTable = '';
              data.education.forEach(function(a){
                eduTable += '<div class="col-md-6 col-xs-12" style="padding:0">';
                eduTable += '<table class="table table-bordered">';
                eduTable += '<tr>';
                eduTable += '<td style="background: #c3c3c3;text-transform: uppercase;font-weight: bold;">'+a.degree+'</td>'
                eduTable += '</tr>';
                eduTable += '<tr>';
                if(a.stream != undefined && a.stream != null){
                  eduTable += '<td>Exam/Stream : <b>'+a.stream +'</b></td>'
                }else{
                  eduTable += '<td>Exam/Stream : </td>'
                }
                eduTable += '</tr>';
                eduTable += '<tr>';
                if(a.board != undefined && a.board != null){
                  eduTable += '<td>Name Passing Board/ University : <b> '+a.board +'</b></td>'
                }else{
                  eduTable += '<td>Name Passing Board/ University : </td>'
                }
                eduTable += '</tr>';
                eduTable += '<tr>';
                if(a.state != undefined && a.state != null){
                  eduTable += '<td>Passing State : <b>'+a.state +'</b></td>'
                }else{
                  eduTable += '<td>Passing State : </td>'
                }
                eduTable += '</tr>';
                eduTable += '<tr>';
                if(a.year != undefined && a.year != null){
                  eduTable += '<td>Passing Year : <b>'+a.year +'</b></td>'
                }else{
                  eduTable += '<td>Passing Year : </td>'
                }
                eduTable += '</tr>';
                eduTable += '<tr>';
                if(a.mode != undefined && a.mode != null){
                  eduTable += '<td>Mode Of Study : <b>'+a.mode +'</b></td>'
                }else{
                  eduTable += '<td>Mode Of Study : </td>'
                }
                eduTable += '</tr>';
                eduTable += '<tr>';
                if(a.marksObtained != undefined && a.marksObtained != null){
                  eduTable += '<td>Marks Obtained (%) : <b>'+a.marksObtained +'</b></td>'
                }else{
                  eduTable += '<td>Marks Obtained (%) :</td>'
                }
                eduTable += '</tr>';
                eduTable += '<tr>';
                if(a.type != undefined && a.type != null){
                  eduTable += '<td>Type Of School/ Collage : <b>'+a.type +'</b></td>'
                }else{
                  eduTable += '<td>Type Of School/ Collage</td>'
                }
                eduTable += '</tr>';
                eduTable += '</table>';
                eduTable += '</div>';
              }); 
              $("#educationalTable").append(eduTable);
            }
            if(data.zipCode.length > 0){
              var zipTable = '';
              zipTable += '<tr>';
              var i = 0;
              data.zipCode.forEach(function(a){
                i++;
                zipTable += '<th>Zip Code '+i+'</th>'
              }); 
              zipTable += '</tr>';
              zipTable += '<tr>';
              data.zipCode.forEach(function(a){
                zipTable += '<td>'+a.zip+'</td>'
              }); 
              zipTable += '</tr>';
              $("#zipCodeTable").append(zipTable);
            }
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

    //upload profile pic
    $("#uploadProfilePic").change(function(){
      var fileInput = document.getElementById('uploadProfilePic');
      var file = (<HTMLInputElement>fileInput).files[0];
      var formData = new FormData();
      formData.append('file', file);
      $.ajax({
             url: baseUrl+"/tutor/"+id+"/upload",
             type : 'POST',
             data : formData,
             processData: false,
             contentType: false,  
             success : function(data) {
                location.reload(true); 
             }
      });
    })
  }

}
