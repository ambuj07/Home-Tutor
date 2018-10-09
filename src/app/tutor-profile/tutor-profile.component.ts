import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
declare var $:any;

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
   var id;
   this.route.params.subscribe(params => {
        id = params["id"];
      });
        $.get("http://localhost:8080/tutor/"+id,function(data){
          $("#name").text(data.name);
          $("#find").text("Job");
          $("#mobile").text(data.mobile);
          $("#email").text(data.email);
          $("#gender").text(data.gender);
          $("#location").text(data.location);
          $(".classCategory").text(data.classcategory);
          $(".class").text(data.particularClass);
          $(".subject").text(data.subjects);
          $("#category").text(data.category);
        })
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

    //code for fetching data

     $(document).ready(function(){
        getPageData(0);
      });
      $(document).on('click','.btn-page',function(e){
        e.preventDefault();
        var pageNumber = $(this).text();
        getPageData(parseInt(pageNumber)-1);
      });
      $(document).on('click','.btn-prev',function(e){
        e.preventDefault();
        var pageNumber = $('.active').text();
        getPageData(parseInt(pageNumber)-2);
      });
      $(document).on('click','.btn-next',function(e){
        e.preventDefault();
        var pageNumber = $('.active').text();
        getPageData(parseInt(pageNumber));
      });
      function getPageData(pageNumber){
        $.ajax({
          type: 'GET',
          url: "http://localhost:8080/job?page="+pageNumber,
          //dataType: "json",
          contentType: "application/json;charset=utf-8",
          success: function(resultData) { 
              console.log(resultData);
              var len = resultData.contents.length;
              var isNext = resultData.next;
              var pageSize = resultData.size;
              var page = (resultData.page +1);
              var html = '';
              if(len > 0){
                for(var i = 0; i < len; i++){
                  html += '<div class="col-md-4 col-xs-1">';
                  html += '<div class="tutorgrid">';
                  html += '<div class="text-centered">';
                  html += '<img src="/assets/userIcon.png" width="36px">';
                  html += '<div class="profile-name">'+resultData.contents[i].student.name+'</div>'
                  html += '<div class="job-detail-sort">';
                  html += '<div><i class="fa fa-mobile" aria-hidden="true"></i>'+resultData.contents[i].student.mobile+'</div>'
                  html += '<div><i class="fa fa-envelope-o" aria-hidden="true"></i>'+resultData.contents[i].student.email+'</div>'
                  html += '<div><i class="fa fa-map-marker" aria-hidden="true"></i>'+resultData.contents[i].location+','+resultData.contents[i].city+'</div>'
                  html += '<hr style="margin: 10px;">';
                  html += '<div>Class : '+resultData.contents[i].className+'</div>';
                  html += '<div>Subject : '+resultData.contents[i].subject+'</div>';
                  html += '<div>Preferred gender : '+resultData.contents[i].gender+'</div>';
                  html += '</div>';
                  html += '<a href="#" class="btn btn-primary btn-details">Apply For This Job</a>';
                  html += '</div>';
                  html += '</div>';
                  html += '</div>';
                  $("#tutorGrid").html(html);
                }
              }
              if(pageSize > 1){
                var htmlPage = '';
                htmlPage +='<ul class="pagination">'
                htmlPage += '<li class="page-item">';
                htmlPage += '<a class="page-link btn-prev" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span>';
                htmlPage += '<span class="sr-only">Previous</span></a>';
                htmlPage += '</li>';
                for(var i=1; i <= pageSize; i++){
                  htmlPage += '<li class="page-item"><a class="page-link btn-page" id="page_'+i+'" href="#">'+i+'</a></li>';
                }
                htmlPage += '<li class="page-item">';
                htmlPage += '<a class="page-link btn-next" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span>';
                htmlPage += '<span class="sr-only">Next</span></a>';
                htmlPage += '</li>';
                htmlPage +='</ul>'
                $("#pagination").html(htmlPage);
                $("#page_"+page).closest('li').addClass("active");
              }  
              if(pageNumber == 0){
                $(".btn-prev").closest('li').addClass('disabled');
              }
              if(!isNext){
                $(".btn-next").closest('li').addClass('disabled');
              } 
            }
          });
        }

  }

}
