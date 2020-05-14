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

    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if(id == null || id == "" || id == undefined){
      window.location.href = '/login'
    }
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
            for(var i = 0; i < response.contents.length; i++){
              html += '<div class="col-md-6 col-xs-12" style="padding-left: 0;">';
              html += '<table class="table table-card table-bordered">';
              html += '<tr><td style="width:50%">Status : <b>'+response.contents[i].status+'</b></td><td rowspan="2">Remark : </td></tr>';
              html += '<tr><td>Enq No. : <b>'+response.contents[i].sequenceId+'</b></td></tr>';
              html += '<tr><td colspan="2">Enq Date Time : <b>'+getDateTimeFormat(response.contents[i].createdOn)+'</b></td></tr>';
              html += '<tr><td colspan="2"><b>'+response.contents[i].className+', '+response.contents[i].subject+', '+response.contents[i].board+'</b></td></tr>';
              html += '<tr style="text-align:center"><td class="action-td" style="background: #0d2151;color: white;font-weight: bold"><a title="hansa tutor" style="color:white" href="/enquiry/'+response.contents[i].id+'">Veiw Details</a></td><td class="action-td" style="background: #f26832;color: white;font-weight: bold"><a style="color:white" data-id="'+response.contents[i].id+'" href="javascript:void(0)" class="updateStatusBtn">Update Status</a></td></tr>';
              html += '</table>';
              html += '</div>';
            }
            //pagination 
            if(response.page > 1){
              var htmlPage = '';
              htmlPage +='<ul class="pagination">'
              for(var i=1; i <= response.page; i++){
                htmlPage += '<li class="page-item"><a title="hansa tutor" class="page-link job-page-btn" href="javascript:void(0)">'+i+'</a></li>';
              }
              htmlPage +='</ul>'
              $("#pagination1").html(htmlPage);
            }  
            //pagination end
          }else{
            html += '<div style="padding: 10px;text-align: center;font-size: 18px;background: #f3f3f3;">You have not posted any requirement yet, <a title="hansa tutor" href="javascript:void(0)" class="findMoreTutors">Click here</a> to post your requirement.</div>'
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
        function getDateTimeFormat(date){
          var d = new Date(date+ 'Z');
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          date = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear()+" ; "+tConv24(d.toLocaleTimeString());
          function tConv24(time24) {
            var ts = time24;
            var H = +ts.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? " AM" : " PM";
            ts = h + ts.substr(2, 3) + ampm;
            return ts;
          };
          return date;
        }
      });
      }
  });

}
}
