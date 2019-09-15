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
      // var reg = localStorage.getItem('from_reg');
      // if(reg == 'Yes'){
      //   $('.registrationDiv').css("display","block");
      //   localStorage.setItem('from_reg','No');
      // }else{
      //   $('.registrationDiv').css("display","none");
      // }
      getJobDataByPage(0);
      $(document).on('click','.job-page-btn',function(){
        var pageNumber = $(this).text();
        getJobDataByPage(parseInt(pageNumber)-1);
      });

      function getJobDataByPage(page){
        $.get(baseUrl+"/job/student/"+id+"?page="+page,function(response){
          var html = "";
          if(response.contents.length > 0){
            // html += '<table class="table table-bordered"><tr class="thead-light"><th>Job Id</th><th>Posted On</th><th>Class</th><th>Subject</th><th>Preferred Tutor</><th>Job Status</th><th>Applied By Tutor</th></tr>';
            // for(var i = 0; i < response.contents.length; i++){
            //     html += '<tr>';
            //     html += '<td>'+response.contents[i].id+'</td>';
            //     html += '<td>'+response.contents[i].createdOn.split("T")[0]+'</td>';
            //     html += '<td>'+response.contents[i].className+'</td>';
            //     html += '<td>'+response.contents[i].subject+'</td>';
            //     html += '<td>'+response.contents[i].preferGender+'</td>';
            //     html += '<td><span id="status_'+response.contents[i].id+'">'+response.contents[i].status+'</span></td>'; 
            //     //<button data-id="'+response.contents[i].id+'" data-toggle="modal" data-target="#changeStatusModal" class="btn btn-xs changeStatusBtn"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>';
            //     if(response.contents[i].applications.length > 0){
            //       var data = JSON.stringify(response.contents[i].applications)
            //       html += "<td>"+response.contents[i].applications.length+" tutor applied <button data='"+data+"' data-toggle='modal' data-target='#viewJobApplicationModal' class='btn btn-xs viewJobDetailBtn'><i class='fa fa-eye' aria-hidden='true'></i></button></td>";
            //     }else{
            //       html += '<td>No tutor applied</td>';
            //     }
            //     html += '</tr>';
            // }
            // html += '</table>';
            html += '<div class="row">';
            for(var i = 0; i < response.contents.length; i++){
              html += '<div class="col-md-6" style="padding-left: 0;">';
              html += '<table class="table table-card table-bordered">';
              html += '<tr><td style="width:50%">Status : <b>'+response.contents[i].status+'</b></td><td rowspan="2">Remark : </td></tr>';
              html += '<tr><td>Enq No. : <b>'+response.contents[i].sequenceId+'</b></td></tr>';
              html += '<tr><td colspan="2">Enq Date Time : <b>'+getDateTimeFormat(response.contents[i].createdOn)+'</b></td></tr>';
              html += '<tr><td colspan="2"><b>'+response.contents[i].className+', '+response.contents[i].subject+', '+response.contents[i].board+'</b></td></tr>';
              html += '<tr style="text-align:center"><td class="action-td" style="background: #0d2151;color: white;font-weight: bold"><a style="color:white" href="/enquiry/'+response.contents[i].id+'">Veiw Details</a></td><td class="action-td" style="background: #f26832;color: white;font-weight: bold"><a style="color:white" data-id="'+response.contents[i].id+'" href="javascript:void(0)" class="updateStatusBtn">Cancle</a></td></tr>';
              if(response.contents[i].applications.length > 0){
              var data = JSON.stringify(response.contents[i].applications)
              html += "<tr style='text-align:center'><td class='action-td viewJobDetailBtn' colspan='2' style='background: #006153;color: white;font-weight: bold' data='"+data+"' data-toggle='modal' data-target='#viewJobApplicationModal'>Response By Tutors<div style='float:right;background: #f9e608;border-radius: 50%;padding: 2px 10px;color: black;'>"+response.contents[i].applications.length+"</div></td></tr>";
              }else{
                html += "<tr style='text-align:center'><td class='action-td' colspan='2' style='background: #006153;color: white;font-weight: bold'>Response By Tutors<div style='float:right;background: #f9e608;border-radius: 50%;padding: 2px 10px;color: black;'>0</div></td></tr>"; 
              }
              html += '</table><hr>';
              html += '</div>';
            }
            html += '</div>';
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
            } else if($("#statusRemark").is(":visible") && (statusRemark == null || statusRemark == "")){
              showToast("Reason for cancle is Mandatory.");
            }else {
              $.ajax({
                type: 'PUT',
                url: baseUrl+"/job/"+jobID+"/status?status=CANCELLED",
                contentType: "application/json;charset=utf-8",
                headers: {
                  'userId': id,
                  'role': 'STUDENT'
                },
                success: function(resultData) {
                  console.log(resultData) 
                  $("#changeStatusModal").modal('hide');
                  showToast("Status Updated as cancelled.");
                  setTimeout(function(){
                    location.reload();
                  },3000)
                },
                error: function(resultData){
                  $("#changeStatusModal").modal('hide');
                }
              });
            }
          });
          $("#changeStatusForm input[name=status]").change(function(){
            if($(this).val() == "Other"){
              $("#statusRemark").attr("hidden",false);
            }else{
              $("#statusRemark").attr("hidden",true);
            }
          });
        });
      }

      $(document).on('click','.viewJobDetailBtn',function(){
        var data = $(this).attr("data");
        console.log(data);
        var dataObj = JSON.parse(data);
        var html = '';
        html += '<div>'
        for(var i=0; i<dataObj.length; i++){
          html += '<div class="jobAppliedBox" style="background: #f5f5f5;padding: 10px 10px 20px;border: 1px solid #ccc;">'
          html += '<div style="display: inline-block;">'
          html += '<div class="profile-name">'+dataObj[i].tutor.name+'</div>'
          html += '<div><i class="fa fa-mobile" aria-hidden="true"></i> '+dataObj[i].tutor.mobile+' | <i class="fa fa-envelope-o" aria-hidden="true"></i> '+dataObj[i].tutor.email+'</div>'
          html += '<div><i class="fa fa-map-marker" aria-hidden="true"></i> '+dataObj[i].tutor.location+'</div>'
          html += '<div>Experience : '+dataObj[i].tutor.experience+'</div>'
          html += '<div>Qualification : '+dataObj[i].tutor.qualification+'</div>'
          html += '</div>'
          html += '<div style="font-size: 14px;border: 1px solid #ccc;padding: 5px;background: white;">'
          html += '<div>Status : '+dataObj[i].status+'</div>'
          html += '<div>UpdatedOn : '+getDateFormat(dataObj[i].updatedOn)+'</div>'
          html += '</div>'
          html += '<div style="text-align: center;"><button type="button" class="btn btn-primary btn-details">Schedule Demo</button></div>'
          html += '</div>'
          html += '<hr>'
        }
        html += '</div>'
        $("#viewJobApplicationModal").find(".modal-body").html(html);
      });
      function showToast(data) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerText = data;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
      function getTutorType(type){
        var retStr = "";
        if(type != undefined && type != null){
          if(type == "TUTOR"){
            retStr = "Home Tutor / Trainer <br><small>(At Student's place)</small>";
          } else if(type == "COACHING"){
            retStr = "Tuition Centre <br><small>(At Tutor's place)</small>";
          }else if(type == "ONLINE"){
            retStr = "Online Tutor / Trainer";
          }
        }
        return retStr;
      }
      function getDateTimeFormat(date){
        var d = new Date(date);
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
      function getDateFormat(date){
        var d = new Date(date);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        date = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
        return date;
      }
    });
  }

}
