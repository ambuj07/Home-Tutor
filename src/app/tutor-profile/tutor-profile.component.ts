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
            $("#location").text(data.location+", "+data.state+", "+data.city+", "+data.zipCode[0].zip);
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
            $(".total-credit").text("Available Credit "+data.credit);
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
                eduTable += '<tr>';
                eduTable += '<td>'+a.degree+'</td>'
                if(a.stream != undefined && a.stream != null){
                  eduTable += '<td>'+a.stream +'</td>'
                }else{
                  eduTable += '<td></td>'
                }
                if(a.board != undefined && a.board != null){
                  eduTable += '<td>'+a.board +'</td>'
                }else{
                  eduTable += '<td></td>'
                }
                if(a.state != undefined && a.state != null){
                  eduTable += '<td>'+a.state +'</td>'
                }else{
                  eduTable += '<td></td>'
                }
                if(a.year != undefined && a.year != null){
                  eduTable += '<td>'+a.year +'</td>'
                }else{
                  eduTable += '<td></td>'
                }
                if(a.mode != undefined && a.mode != null){
                  eduTable += '<td>'+a.mode +'</td>'
                }else{
                  eduTable += '<td></td>'
                }
                if(a.marksObtained != undefined && a.marksObtained != null){
                  eduTable += '<td>'+a.marksObtained +'</td>'
                }else{
                  eduTable += '<td></td>'
                }
                if(a.type != undefined && a.type != null){
                  eduTable += '<td>'+a.type +'</td>'
                }else{
                  eduTable += '<td></td>'
                }
                eduTable += '</tr>';
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
