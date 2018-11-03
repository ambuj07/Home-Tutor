import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {

    var baseUrl = environment.baseUrl;

    var id;
    this.route.params.subscribe(params => {
        id = params["id"];
    });
    $(document).ready(function(){
      $('#dashboardView').css('display','block');
      var reg = localStorage.getItem('from_reg');
      if(reg == 'Yes'){
        $('.registrationDiv').css("display","block");
        localStorage.setItem('from_reg','No');
      }else{
        $('.registrationDiv').css("display","none");
      }
      getJobDataByPage(0);
      $(document).on('click','.job-page-btn',function(){
        var pageNumber = $(this).text();
        getJobDataByPage(parseInt(pageNumber)-1);
      });

      function getJobDataByPage(page){
        $.get(baseUrl+"/job/student/"+id+"?page="+page,function(response){
          var html = "";
          if(response.contents.length > 0){
            html += '<table class="table table-bordered"><tr class="thead-light"><th>Job Id</th><th>Posted On</th><th>Class</th><th>Subject</th><th>Location</th><th>Preferred Tutor</><th>Job Status</th><th>Applied By Tutor</th></tr>';
            for(var i = 0; i < response.contents.length; i++){
                html += '<tr>';
                html += '<td>'+response.contents[i].id+'</td>';
                html += '<td>'+response.contents[i].createdOn.split("T")[0]+'</td>';
                html += '<td>'+response.contents[i].className+'</td>';
                html += '<td>'+response.contents[i].subject+'</td>';
                html += '<td>'+response.contents[i].location+'</td>';
                html += '<td>'+response.contents[i].gender+'</td>';
                html += '<td>'+response.contents[i].status+' <button data-id="'+response.contents[i].id+'" data-toggle="modal" data-target="#changeStatusModal" class="btn btn-xs changeStatusBtn"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>';
                if(response.contents[i].applications.length > 0){
                  var data = JSON.stringify(response.contents[i].applications)
                  html += "<td>"+response.contents[i].applications.length+" tutor applied <button data='"+data+"' data-toggle='modal' data-target='#viewJobApplicationModal' class='btn btn-xs viewJobDetailBtn'><i class='fa fa-eye' aria-hidden='true'></i></button></td>";
                }else{
                  html += '<td>No tutor applied</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            //pagination 
            if(response.page > 1){
              var htmlPage = '';
              htmlPage +='<ul class="pagination">'
              for(var i=1; i <= response.page; i++){
                htmlPage += '<li class="page-item"><a class="page-link job-page-btn" href="javascript:void(0)">'+i+'</a></li>';
              }
              htmlPage +='</ul>'
              $("#pagination1").html(htmlPage);
            }  
            //pagination end
          }else{
            html += '<div style="padding: 10px;text-align: center;font-size: 18px;background: #f3f3f3;">You have not posted any requirement yet, <a href="javascript:void(0)" class="findMoreTutors">Click here</a> to post your requirement.</div>'
          }
          $("#postedRequirements").html(html);
        });
      }

      $(document).on('click','.viewJobDetailBtn',function(){
        var data = $(this).attr("data");
        console.log(data);
        var dataObj = JSON.parse(data);
        var html = '';
        html += '<div>'
        for(var i=0; i<dataObj.length; i++){
          html += '<div class="jobAppliedBox" style="background: aliceblue;padding: 10px;border: 1px solid #ccc;">'
          html += '<div style="display: inline-block;">'
          html += '<div class="profile-name">'+dataObj[i].tutor.name+'</div>'
          html += '<div><i class="fa fa-mobile" aria-hidden="true"></i> '+dataObj[i].tutor.mobile+' | <i class="fa fa-envelope-o" aria-hidden="true"></i> '+dataObj[i].tutor.email+'</div>'
          html += '<div><i class="fa fa-map-marker" aria-hidden="true"></i> '+dataObj[i].tutor.location+'</div>'
          html += '<div>Experience : '+dataObj[i].tutor.experience+'</div>'
          html += '<div>Qualification : '+dataObj[i].tutor.qualification+'</div>'
          html += '</div>'
          html += '<div style="float: right;font-size: 14px;border: 1px solid #ccc;padding: 5px;background: white;">'
          html += '<div>Status : '+dataObj[i].status+'</div>'
          html += '<div>UpdatedOn : '+dataObj[i].updatedOn.split("T")[0]+'</div>'
          html += '</div>'
          html += '</div>'
          html += '<hr>'
        }
        html += '</div>'
        $("#viewJobApplicationModal").find(".modal-body").html(html);
      });
      $(document).on('click','.changeStatusBtn',function(){
        var jobId = $(this).attr("data-id");
        $("#changeStatusForm").find("#jobId").val(jobId);
      });
      $(document).on('click','.saveStatus',function(){
        var jobID = $("#changeStatusForm").find("#jobId").val();
        var status = $("#changeStatusForm").find("#changeStatus").val();
        if (status == null || status == "") {
          $("#changeStatusForm").find("#changeStatus").css('border-color','red');
        } else {
            $.ajax({
              type: 'PUT',
              url: baseUrl+"/job/"+jobID+"/?status="+status,
              success: function(resultData) { 
                $("#changeStatusModal").modal('hide');
                showToast("Status Updated successfully.")
               },
               error: function(resultData){
                 $("#changeStatusModal").modal('hide');
                 showToast(resultData.responseJSON.message)
               }
          });
        }
      });
      function showToast(data) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerText = data;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
    });

    $(".sidenav a").click(function(){
      closeNav();
      $(".sidenav a").removeClass("active");
      $(this).addClass("active");
    });
    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    }
  
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    $("#openSideNav").click(function(){
        openNav();
    })
    $("#closeSideNav").click(function(){
      closeNav();
    })
    
    $("#dashboard").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#dashboardView').css('display','block');
      $("#viewTabName").text("Student Dashboard");
    });
    $("#profile").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#profileView').css('display','block');
      $("#viewTabName").text("Profile");
    });
    $("#editProfile").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#editProfileView').css('display','block');
      $("#viewTabName").text("Edit Profile");
    });
    $("#nearbyTutors").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#nearbyTutorsView').css('display','block');
      $("#viewTabName").text("Nearby Tutors");
    });
    $(document).on('click','.findMoreTutors',function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#findMoreTutorsView').css('display','block');
      $("#viewTabName").text("Find More Tutors");
    }); 
    $("#updateStatus").click(function(){
      $('.registrationDiv').css("display","none");
      $('.allNavElements').css('display','none');
      $('#updateStatusView').css('display','block');
      $("#viewTabName").text("Update Status");
    });
  }

}
