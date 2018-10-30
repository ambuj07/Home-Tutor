import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.css']
})
export class FindJobsComponent implements OnInit {

  constructor() { }

  
  ngOnInit() {
    const baseUrl = environment.baseUrl;
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
        url: baseUrl+"/job?page="+pageNumber,
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
                //html += '<div><i class="fa fa-mobile" aria-hidden="true"></i>'+resultData.contents[i].student.mobile+'</div>'
                //html += '<div><i class="fa fa-envelope-o" aria-hidden="true"></i>'+resultData.contents[i].student.email+'</div>'
                //html += '<div><i class="fa fa-map-marker" aria-hidden="true"></i>'+resultData.contents[i].location+','+resultData.contents[i].city+'</div>'
                html += '<hr style="margin: 10px;">';
                html += '<div>Class : '+resultData.contents[i].className+'</div>';
                html += '<div>Subject : '+resultData.contents[i].subject+'</div>';
                html += '<div>Preferred gender : '+resultData.contents[i].gender+'</div>';
                html += '</div>';
                html += '<a href="#" data-id="'+resultData.contents[i].id+'" data-toggle="modal" data-target="#myProfileModal" class="btn btn-primary btn-details viewFullProfileBtn">View Full Profile</a>';
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

      $(document).on('click','.viewFullProfileBtn',function(){
        var jobID = $(this).attr("data-id");
        var html = '';
        $.get(baseUrl+"/job/"+jobID,function(data){
                html += '<div class="tutorgrid">';
                html += '<div class="text-centered">';
                html += '<img src="/assets/userIcon.png" width="36px">';
                html += '<div class="profile-name">'+data.student.name+'</div>'
                html += '<div class="job-detail-sort">';
                html += '<div><i class="fa fa-mobile" aria-hidden="true"></i>'+data.student.mobile+'</div>'
                html += '<div><i class="fa fa-envelope-o" aria-hidden="true"></i>'+data.student.email+'</div>'
                html += '<div><i class="fa fa-map-marker" aria-hidden="true"></i>'+data.location+'</div>'
                html += '<hr style="margin: 10px;">';
                html += '<div>Class : '+data.className+'</div>';
                html += '<div>Subject : '+data.subject+'</div>';
                html += '<div>Preferred gender : '+data.gender+'</div>';
                html += '</div>';
                html += '<a href="javascript:void(0)" job-id="'+jobID+'" class="btn btn-primary btn-details applyForJobBtn">Apply For This Job</a>';
                html += '</div>';
                html += '</div>';
                $(".modal-body").html(html);
        })
      });

      $(document).on('click','.applyForJobBtn',function(){
        var jobID = $(this).attr("job-id");
        var tutorId = localStorage.getItem('userId');
        var data = '{"tutorId":"'+tutorId+'"}';
            $.ajax({
                type: 'PUT',
                url: baseUrl+"/"+jobID+"/apply",
                contentType: "application/json;charset=utf-8",
                data: data,
                success: function(resultData) { 
                  $("#myProfileModal").modal('hide');
                  showToast("You have successfully applied for the job.")
                 },
                 error: function(resultData){
                   $("#myProfileModal").modal('hide');
                   showToast("Something went wrong at server side, Please try again.")
                 }
            });
      });
      function showToast(data) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerText = data;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }

  }

}
