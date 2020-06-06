import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment';
import {SeoService} from '../../app/seo.service';
declare var $:any;

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  baseUrl :  String = environment.baseUrl;
  jobs: any = [];
  seqId : any;
  hasApplied : boolean = false;
  tutorId = localStorage.getItem('userId');
  constructor(private route: ActivatedRoute,_seoService:SeoService,private http:HttpClient) {
    this.route.params.subscribe(params => {
      this.seqId = params["id"];
    });
    http.get(this.baseUrl+'/job/sequence/'+this.seqId)
    .subscribe(data => {
      this.jobs = [data];
      this.jobs[0].student.turorType = this.getTutorType(this.jobs[0].student.turorType);
      console.log(this.jobs)
      let location = "";
      if(this.jobs[0].student.location != null && this.jobs[0].student.location != undefined){
        location += this.jobs[0].student.location;
      }
      if(this.jobs[0].student.city != null && this.jobs[0].student.city != undefined){
        location += ", "+this.jobs[0].student.city;
      }
      if(this.jobs[0].student.states != null && this.jobs[0].student.states != undefined){
        location += ", "+this.jobs[0].student.states;
      }
      //Subject + Tuition Tutor Trainer Teacher Part Time Full-Time Teaching Jobs Near + Location + in + City
    _seoService.updateTitle(this.jobs[0].student.name+" is looking "+ this.jobs[0].student.turorType+" for "+this.jobs[0].student.particularClass+", "+this.jobs[0].student.subjects+" at "+location);
    _seoService.updateDescription(this.jobs[0].student.subjects+" Tuition Tutor Trainer Teacher Part Time Full-Time Teaching Jobs Near "+this.jobs[0].student.location+" in "+this.jobs[0].student.city);
    _seoService.updateOgUrl("http://hansatutor.com/enq/"+this.seqId);
    _seoService.updateOgImage("http://www.hansatutor.com/assets/fabicon.jpg");
    _seoService.updateOgTitle(this.jobs[0].student.name+" is looking "+ this.jobs[0].student.turorType+" for "+this.jobs[0].student.particularClass+", "+this.jobs[0].student.subjects+" at "+location);
    _seoService.updateOgDesc(this.jobs[0].student.subjects+" Tuition Tutor Trainer Teacher Part Time Full-Time Teaching Jobs Near "+this.jobs[0].student.location+" in "+this.jobs[0].student.city);
    _seoService.updateKeywords("Jobs in "+this.jobs[0].student.city+" Near me, Jobs in "+this.jobs[0].student.location+" "+this.jobs[0].student.city+" Near me, "+this.jobs[0].student.turorType+" Jobs "+this.jobs[0].student.location+" "+this.jobs[0].student.city+" Near me, "+this.jobs[0].student.classcategory+" Teaching Jobs in "+this.jobs[0].student.location+" "+this.jobs[0].student.city+" Near me, "+this.jobs[0].student.subjects+" Faculty Jobs in "+this.jobs[0].student.location+" "+this.jobs[0].student.city+" Near me, Part Time Jobs, Full-Time Jobs, Online Teaching Jobs, Free Listing, Tutorial Jobs, Mentor Jobs, Coach - Instructor Jobs, Lecturer Jobs ,SchoolTeacher Jobs")
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
  getTutorType(type){
    var retStr = "";
    if(type != undefined && type != null){
      if(type == "TUTOR"){
        retStr = "Home Tutor";
      } else if(type == "COACHING"){
        retStr = "Coaching Institute";
      }else if(type == "ONLINE"){
        retStr = "Online Teacher";
      }else if("TutorForTution" || "FACULTY"){
        retStr = "Faculty";
      }
    }
    return retStr;
  }
  get isLoggedIn(): boolean {
    let loggedIn = true;
    let userId = localStorage.getItem('userId');
    let type = localStorage.getItem('type');
    if(userId == undefined || userId == null || type != 'TUTOR'){
      loggedIn = false
    }
    return loggedIn;
  }
  goToLogin(){
    window.location.href = '/login';
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
      $(".showAfterApply").prop('hidden',false);
      $(".applyJobTd").prop('hidden',true);
    })
  }
  login(){
    var error = false;  
        $(".registration-form").find('input[type="tel"],input[type="password"]').each(function () {
            if ($(this).val() == "") {
                $(this).addClass('input-error');
                error = true;
            } else {
                $(this).removeClass('input-error');
            }
        });
        if(!error){
          var phone = $("#mobileNumber").val();
          var password = $("#password").val();
          var data = '{"userId":"'+phone+'","password":"'+password+'"}';
              $.ajax({
                  type: 'POST',
                  url: this.baseUrl+"/login",
                  contentType: "application/json;charset=utf-8",
                  data: data,
                  success: function(resultData) {
                      console.log(resultData) 
                      localStorage.setItem("userName",resultData.detail.name);
                      localStorage.setItem("type",resultData.type);
                      localStorage.setItem("userId",resultData.refId);
                      localStorage.setItem("token",resultData.token);
                      window.location.reload();
                   }
              });
        }
  }
  public defaultTime = new Date(2018, 1, 12, 10, 0);
  public defaultDate = new Date();

  ngOnInit() {
    $(document).on('hide.bs.modal','#contactModal', function () {
      window.location.reload();
    });
    $(document).on('show.bs.modal','#updateStatusModal', function () {
      $('.selectpicker').selectpicker();
    });
    $(document).ready(function(){
      $("#viewTabName").text("");
      $(".sidenav a").removeClass("active");
      $(".searchJobA").addClass("active");
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
        $(document).on('click','#show_hide_password a', function(event) {
          event.preventDefault();
          if($('#show_hide_password input').attr("type") == "text"){
              $('#show_hide_password input').attr('type', 'password');
              $('#show_hide_password i').addClass( "fa-eye-slash" );
              $('#show_hide_password i').removeClass( "fa-eye" );
          }else if($('#show_hide_password input').attr("type") == "password"){
              $('#show_hide_password input').attr('type', 'text');
              $('#show_hide_password i').removeClass( "fa-eye-slash" );
              $('#show_hide_password i').addClass( "fa-eye" );
          }
      });
    });
  }

}
