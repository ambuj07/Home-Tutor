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
            $("#email").text(data.email);
            $("#gender").text(data.gender);
            $("#location").text(data.location);
            $("#experience").text(data.experience);
            $("#qualification").text(data.qualification);
            $(".classCategory").text(data.classcategory);
            $(".class").text(data.particularClass);
            $(".subject").text(data.subjects);
            $("#category").text(data.category);
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
                eduTable += '<td>'+a.board+'</td>'
                eduTable += '<td>'+a.instituteName+'</td>'
                eduTable += '<td>'+a.year+'</td>'
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
  }

}
