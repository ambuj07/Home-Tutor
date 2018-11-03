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
      getJobDataByPage(0);
    });
    $(document).on('click','.btn-job-page',function(e){
      e.preventDefault();
      var pageNumber = $(this).text();
      getJobDataByPage(parseInt(pageNumber)-1);
    });
    function getJobDataByPage(pageNumber){
      $.ajax({
        type: 'GET',
        url: baseUrl+"/job?page="+pageNumber,
        //dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            var len = resultData.contents.length;
            var isNext = resultData.next;
            var pageSize = resultData.page;
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
              for(var i=1; i <= pageSize; i++){
                htmlPage += '<li class="page-item"><a class="page-link btn-job-page" href="#">'+i+'</a></li>';
              }
              htmlPage +='</ul>'
              $("#pagination1").html(htmlPage);
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
                html += '<button type="button" job-id="'+jobID+'" class="btn btn-primary btn-details applyForJobBtn">Apply For This Job</button>';
                html += '</div>';
                html += '</div>';
                $("#myProfileModal").find(".modal-body").html(html);
        })
      });

      $(document).on('click','.applyForJobBtn',function(){
        var jobID = $(this).attr("job-id");
        var tutorId = localStorage.getItem('userId');
            $.ajax({
                type: 'PUT',
                url: baseUrl+"/job/"+jobID+"/apply?tutorId="+tutorId,
                success: function(resultData) { 
                  $("#myProfileModal").modal('hide');
                  console.log(resultData)
                  showToast("You have successfully applied for the job.")
                  setTimeout(function(){ 
                    window.location.href = "/dashboard/tutor/"+tutorId;
                   }, 3000);
                 },
                 error: function(resultData){
                   $("#myProfileModal").modal('hide');
                   console.log(resultData.responseJSON.message)
                   showToast(resultData.responseJSON.message)
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
