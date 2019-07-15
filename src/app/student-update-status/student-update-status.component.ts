import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-student-update-status',
  templateUrl: './student-update-status.component.html',
  styleUrls: ['./student-update-status.component.css']
})
export class StudentUpdateStatusComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {

    var baseUrl = environment.baseUrl;

    var id;
    this.route.params.subscribe(params => {
        id = params["id"];
    });
    $(document).ready(function(){
      $("#viewTabName").text("Update Status");
      $(".sidenav a").removeClass("active");
      $(".updateStatus").addClass("active");
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
          console.log(response)
          if(response.contents.length > 0){
            html += '<table class="table table-bordered"><tr class="thead-light"><th>Job Id</th><th>Posted On</th><th>Class</th><th>Subject</th><th>Location</th><th>Preferred Tutor</><th>Job Status</th><th>Applied By Tutor</th></tr>';
            for(var i = 0; i < response.contents.length; i++){
                var html = '';
                    html += '<div class="col-md-4 col-xs-1">';
                    html += '<div class="tutorgrid">';
                    html += '<div>';
                    html += '<div style="float: right;">Posted On : <b>'+response.contents[i].createdOn.split("T")[0]+'</b></div>';
                    html += '<div>Enquiry Id : <b>'+response.contents[i].sequenceId+'</b></div>';
                    html += '<hr>';
                    html += '<div>Learning Need : <b>'+response.contents[i].className+', '+response.contents[i].subject+'</b></div>';
                    html += '<div>Location : <b>'+response.contents[i].location+'</b></div>';
                    html += '<div>Status : <b>'+response.contents[i].status+'</b></div>';
                    html += '<a data-id="'+response.contents[i].id+'" href="javascript:void(0)" class="btn btn-primary btn-details updateStatusBtn">Update Status</a>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
            }
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
          $(".updateStatusBtn").click(function(){
            $("#changeStatusModal").modal('show');
            var jobId = $(this).attr("data-id");
            $("#changeStatusForm").find("#jobId").val(jobId);
          });
          $(".saveStatus").click(function(){
            var jobID = $("#changeStatusForm").find("#jobId").val();
            var status = $("#changeStatusForm").find("input[name=status]:checked").val();
            var statusRemark = $("#statusRemark").val();
            if (status == null || status == "") {
              showToast("Please select one status.");
            } else if(statusRemark == null || statusRemark == ""){
              showToast("Status Remark is Mandatory.");
            }else {
              $.ajax({
                type: 'PUT',
                url: baseUrl+"/job/"+jobID+"/status?status="+status,
                contentType: "application/json;charset=utf-8",
                headers: {
                  'userId': id,
                  'role': 'STUDENT'
                },
                success: function(resultData) {
                  console.log(resultData) 
                  $("#changeStatusModal").modal('hide');
                  showToast("Status Updated successfully.")
                  $("#status_"+jobID).text(status);
                  return false;
                },
                error: function(resultData){
                  $("#changeStatusModal").modal('hide');
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
      }
  });

}
}
