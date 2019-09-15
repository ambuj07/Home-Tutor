import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.css']
})
export class FindJobsComponent implements OnInit {
  baseUrl :  String = environment.baseUrl;
  cities: any;
  constructor(private title: Title, private meta: Meta,private http: HttpClient) {}
  getCitiesBySearch(event: any){
    console.log();
    if(event.target.value.length >= 3){
      this.http.get(this.baseUrl+'/config/city?name='+event.target.value)
      .subscribe(cities => {
        this.cities = cities;
      });
    }else{
      this.cities = null;
    }
  }

  filterByCity(event : any){
    window.location.href = (<HTMLInputElement>document.getElementById("tutorTypeFilter")).value+"-in-"+event.target.textContent;
  }
  
  ngOnInit() {
    const baseUrl = this.baseUrl;
    const path = window.location.pathname;
    const pathString = path.split("/")[1];
    this.title.setTitle(pathString);
    $("#viewTabName").text(pathString);
    $(".sidenav a").removeClass("active");
    $(".findJobs").addClass("active");

    //filterNav
    $("#filterBtn").click(function(){
      openNav();
    });
    $(".closeFilterNav").click(function(){
      closeNav();
    });
    function openNav() {
      document.getElementById("filterNav").style.width = "350px";
    }
    
    function closeNav() {
      document.getElementById("filterNav").style.width = "0";
    }
    if(path.split("-in-").length > 1){
      $("#cityFilter").val(path.split("-in-")[1]);
    }else{
      $("#cityFilter").val("");
    }

    //Subjects and classes
    var classHtml = '<option value="" selected>All Classes</option>';
    $.ajax({
      type: 'GET',
      url: baseUrl+"/config/category",
      async:false,
      contentType: "application/json;charset=utf-8",
      success: function(resultData) { 
          console.log(resultData);
          resultData.forEach(function (a){
            var name = a.name;
            var nameArr = a.name.split("(");
            if(nameArr.length > 1){
              classHtml += '<option data-id="'+a.id+'" value="'+a.name+'">'+nameArr[0]+'</option>';
              classHtml += '<option style="font-size:12px;margin-top:-10px" data-id="'+a.id+'" value="'+a.name+'">('+nameArr[1]+'</option>';
            }else{
              classHtml += '<option data-id="'+a.id+'" value="'+a.name+'">'+a.name+'</option>';
            }
          })
        }
      });
      $("#chooseClass").html(classHtml).selectpicker('refresh');

      $("#chooseClass").on('change',function(){
        var subjectHtml = '';
        $("#chooseClass").val($(this).val()).selectpicker("refresh")
        var chooseClass = $('option:selected', this).attr('data-id');
        if(chooseClass == undefined){
          console.log(chooseClass);
          subjectHtml += '<option value="" selected>All Subjects</option>';
        }else{
          $.ajax({
              type: 'GET',
              url: baseUrl+"/config/subject?groupId="+chooseClass,
              async:false,
              contentType: "application/json;charset=utf-8",
              success: function(resultData) { 
                  console.log(resultData);
                  resultData.forEach(function (a){
                      subjectHtml += '<option value="'+a.id+'">'+a.name+'</option>';
                  })
              }
          });
        }
        $("#chooseSubject").html(subjectHtml).selectpicker('refresh');
      });
      $("#applyFilters").click(function(){
        saveFilterData();
      });
      function saveFilterData(){
        var city = $("#cityFilter").val();
        var tutorType = $("#tutorTypeFilter").val();
        var classCat = $("#chooseClass").val();
        var subject = $("#chooseSubject").val();
        var subjectTxt = $("#chooseSubject option:selected").text().trim().split(' ').join('_');
        sessionStorage.setItem("city_text",city);
        sessionStorage.setItem("tutor_val",tutorType);
        sessionStorage.setItem("class_val",classCat);
        sessionStorage.setItem("subject_val",subject);
        sessionStorage.setItem("subject_text",subjectTxt);
        var path = "/";
        if(subject != "" && subjectTxt != "" && subjectTxt != null && subjectTxt != undefined){
          path += subjectTxt+"-";
        }
        path += tutorType;
        if(city != ""){
            path += "-in-"+city;
        }
        window.location.href = path;
      }
      function getFilterData(){
        var city = sessionStorage.getItem("city_text");
        var tutorType = sessionStorage.getItem("tutor_val");
        var classCat = sessionStorage.getItem("class_val");
        var subject = sessionStorage.getItem("subject_val");
        var subjectTxt = sessionStorage.getItem("subject_text");
        $("#chooseClass").val(classCat).change();
        $(".selectpicker").selectpicker('refresh');
        $("#chooseSubject").val(subject);
        $(".selectpicker").selectpicker('refresh');
        sessionStorage.clear();
        console.log(city+" == "+tutorType+" == "+classCat+" == "+subject+" == "+subjectTxt)
      }
      $(document).ready(function(){
        getFilterData();
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
                var learning = "";
                if(resultData.contents[i].className != null){
                  learning += resultData.contents[i].className;
                }
                if(resultData.contents[i].subject != null){
                  learning += ", "+resultData.contents[i].subject;
                }
                if(resultData.contents[i].board != null){
                  learning += ", "+resultData.contents[i].board;
                }
                var location = "";
                if(resultData.contents[i].student.location != null){
                  location += resultData.contents[i].student.location;
                }
                if(resultData.contents[i].student.city != null){
                  location += ", "+resultData.contents[i].student.city;
                }
                if(resultData.contents[i].student.state != null){
                  location += ", "+resultData.contents[i].student.state;
                }
                if(resultData.contents[i].student.zipCode != null){
                  location += ", "+resultData.contents[i].student.zipCode;
                }
                html += '<div class="col-md-4" style="margin-bottom:20px">';
                html += '<div class="text-centered">';
                html += '<table class="table table-card table-bordered-thick table-bordered">';
                html += '<tr><td>Enq No : <b>'+resultData.contents[i].sequenceId+'</b></td><td style="width:50%">Status : <b>'+resultData.contents[i].status+'</b></td></tr>';
                html += '<tr style="background: #ccc;"><td colspan="2">Learning Need</td></tr>';
                html += '<tr><td colspan="2"><b>'+learning+'</b></td></tr>';
                html += '<tr><td colspan="2"><b>'+location+'</b></td></tr>';
                html += '<tr><td colspan="2" class="action-td" style="background: #0d2151;color: white;font-weight: bold"><a style="color:white" href="/enq/'+resultData.contents[i].sequenceId.split("/").join("%2F")+'">Veiw Details</a></td></tr>'
                html += '</table>';
                html += '</div>';
                html += '</div>';
              }
              $("#tutorGrid").html(html);
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
