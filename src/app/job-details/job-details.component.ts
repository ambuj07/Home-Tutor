import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  constructor(private title: Title, private meta: Meta,private http: HttpClient) {}
  baseUrl :  String = environment.baseUrl;
  jobs: any = [];
  seqId : String = decodeURI(window.location.pathname.split("/")[2]);
  hasApplied : boolean = false;
  tutorId = localStorage.getItem('userId');
  getJobData(){
      this.http.get(this.baseUrl+'/job/sequence/'+this.seqId)
      .subscribe(data => {
        this.jobs = [data];
        console.log(this.jobs)
        this.jobs.forEach(element => {
          if(element.applications.length > 0){
            element.applications.forEach(element => {
              if(element.tutor.id == this.tutorId){
                this.hasApplied = true;
              }
            });
          }
        })
      });
  }
  showToast(data) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = data;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  applyJob(jobId){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    var tutorId = localStorage.getItem('userId');
    this.http.put(this.baseUrl+"/job/"+jobId+"/apply?tutorId="+tutorId,httpOptions)
    .subscribe(response => {
      console.log(response);
      this.showToast("You have successfully applied for the job.");
    })
  }
  public defaultTime = new Date(2018, 1, 12, 10, 0);
  public defaultDate = new Date();
  // var jobID = $(this).attr("job-id");
  //       var tutorId = localStorage.getItem('userId');
  //           $.ajax({
  //               type: 'PUT',
  //               url: baseUrl+"/job/"+jobID+"/apply?tutorId="+tutorId,
  //               success: function(resultData) { 
  //                 $("#myProfileModal").modal('hide');
  //                 console.log(resultData)
  //                 showToast("You have successfully applied for the job.")
  //                 setTimeout(function(){ 
  //                   window.location.href = "/dashboard/tutor/"+tutorId;
  //                  }, 3000);
  //                },
  //                error: function(resultData){
  //                  $("#myProfileModal").modal('hide');
  //                  console.log(resultData.responseJSON.message)
  //                  showToast(resultData.responseJSON.message)
  //                }
  //           });

  ngOnInit() {
    $("#viewTabName").text("");
    $(".sidenav a").removeClass("active");
    $(".findJobs").addClass("active");
    this.getJobData();
    $(document).on('hide.bs.modal','#contactModal', function () {
      window.location.reload();
    });
    $(document).on('show.bs.modal','#updateStatusModal', function () {
      $('.selectpicker').selectpicker();
    });
    $(document).ready(function(){
        $(document).on('change',"#status",function(){
          var status = $(this).val();
          if(status == "Confirmed"){
            $(".confirmDiv").prop('hidden',false);
            $(".demoDiv").prop('hidden',true);
          }else if(status == "Demo Scheduled" || status == "Demo Taken"){
            $(".demoDiv").prop('hidden',false);
            $(".confirmDiv").prop('hidden',true);
          }else{
            $(".demoDiv").prop('hidden',true);
            $(".confirmDiv").prop('hidden',true);
          }
        });
    });
  }

}
