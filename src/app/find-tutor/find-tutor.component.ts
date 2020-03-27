import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-find-tutor',
  templateUrl: './find-tutor.component.html',
  styleUrls: ['./find-tutor.component.css']
})
export class FindTutorComponent implements OnInit {
  baseUrl :  String = environment.baseUrl;
  cities: any;
  get isLoggedIn(): boolean {
    let loggedIn = true;
    let userId = localStorage.getItem('userId');
    if(userId == undefined || userId == null){
      loggedIn = false
    }
    return loggedIn;
  }
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
    window.location.href = "edu/search/"+(<HTMLInputElement>document.getElementById("tutorTypeFilter")).value+"-in-"+event.target.textContent;
    sessionStorage.setItem("city_text",event.target.textContent);
  }
  
  ngOnInit() {
    var isLoggedIn = true;
    let userId = localStorage.getItem('userId');
    if(userId == undefined || userId == null){
      isLoggedIn = false
    }
    const baseUrl = this.baseUrl;
    const path = window.location.pathname;
    const pathString = path.split("/")[3];
    this.title.setTitle(pathString);
    document.addEventListener('DOMContentLoaded', function(){ 
      $("#viewTabName").text(pathString); 
      $(".sidenav a").removeClass("active");
      $(".searchTutorA").addClass("active");
    });

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
    $("#tutorTypeFilter").val(pathString.split("-in-")[0]);
    if(pathString.split("-in-").length > 1){
      $("#cityFilter").val(pathString.split("-in-")[1]);
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
        var pinCodeFilter = $("#pinCodeFilter").val();
        var genderFilter = $("#genderFilter").val();
        var jobTypeFilter = $("#jobTypeFilter").val();
        var experianceFilter = $("#experianceFilter").val();
        var englishFilter = $("#englishFilter").val();

        sessionStorage.setItem("city_text",city);
        sessionStorage.setItem("tutor_val",tutorType);
        sessionStorage.setItem("class_val",classCat);
        sessionStorage.setItem("subject_val",subject);
        sessionStorage.setItem("subject_text",subjectTxt);
        sessionStorage.setItem("pin_val",pinCodeFilter);
        sessionStorage.setItem("gender_val",genderFilter);
        sessionStorage.setItem("jobtype_val",jobTypeFilter);
        sessionStorage.setItem("exp_val",experianceFilter);
        sessionStorage.setItem("eng_val",englishFilter);
        var path = "edu/search/";
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
        var filterText = "";
        var city = sessionStorage.getItem("city_text");
        var tutorType = sessionStorage.getItem("tutor_val");
        var classCat = sessionStorage.getItem("class_val");
        var subject = sessionStorage.getItem("subject_val");
        var subjectTxt = sessionStorage.getItem("subject_text");
        var pinCodeFilter = sessionStorage.getItem("pin_val");
        var genderFilter = sessionStorage.getItem("gender_val");
        var jobTypeFilter = sessionStorage.getItem("jobtype_val");
        var experianceFilter = sessionStorage.getItem("exp_val");
        var englishFilter = sessionStorage.getItem("eng_val");

        if(tutorType != null || tutorType != undefined){
          $("#tutorTypeFilter").val(tutorType);
        }
        $("#chooseClass").val(classCat).change();
        $("#chooseSubject").val(subject);
        $("#pinCodeFilter").val(pinCodeFilter);
        $("#genderFilter").val(genderFilter);
        $("#jobTypeFilter").val(jobTypeFilter);
        $("#experianceFilter").val(experianceFilter);
        $("#englishFilter").val(englishFilter);
        $(".selectpicker").selectpicker('refresh');

        //locality=Delhi&qualification=M.Sc&=PARTTIME&teacherType=FACULTY&state=Delhi&page=1


        if(city != null && city != "" && city != undefined){
          filterText += "&city="+city;
        }
        console.log(tutorType+" ===================")
        if(tutorType != null && tutorType != "" && tutorType != undefined){
          if(getTutorType(tutorType) != ""){
            filterText += "&teacherType="+getTutorType(tutorType);
          }
        }
        if(subjectTxt != null && subjectTxt != "" && subjectTxt != undefined){
          filterText += "&subject="+subjectTxt;
        }
        if(pinCodeFilter != null && pinCodeFilter != "" && pinCodeFilter != undefined){
          filterText += "&pincode="+pinCodeFilter;
        }
        if(genderFilter != null && genderFilter != "" && genderFilter != undefined){
          filterText += "&gender="+genderFilter;
        }
        if(jobTypeFilter != null && jobTypeFilter != "" && jobTypeFilter != undefined){
          filterText += "&jobType="+jobTypeFilter;
        }
        if(experianceFilter != null && experianceFilter != "" && experianceFilter != undefined){
          filterText += "&experience="+experianceFilter;
        }
        if(englishFilter != null && englishFilter != "" && englishFilter != undefined){
          filterText += "&fluencyInEnglish="+englishFilter;
        }
        return filterText;
      }
      $(document).ready(function(){
        var filterText = getFilterData();
        console.log(filterText);
        getJobDataByPage(0,filterText);
      });
    $(document).on('click','.btn-job-page',function(e){
      e.preventDefault();
      var filterText = getFilterData();
      var pageNumber = $(this).text();
      $(".page-link").css("background","white");
      getJobDataByPage(parseInt(pageNumber)-1,filterText);
    });
    function getJobDataByPage(pageNumber,filterText){
      $.ajax({
        type: 'GET',
        url: baseUrl+"/tutor?page="+pageNumber+filterText,
        //dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            var len = resultData.contents.length;
            var pageSize = 1;
            var html = '';
            if(len > 0){
              pageSize = (resultData.totalSize/10)+1;
              for(var i = 0; i < len; i++){
                var address = "";
                if(resultData.contents[i].location != null){
                  address+= resultData.contents[i].location+", ";
                }
                if(resultData.contents[i].city != null){
                  address+= resultData.contents[i].city+", ";
                }
                if(resultData.contents[i].state != null){
                  address+= resultData.contents[i].state+", ";
                }
                if(resultData.contents[i].defaultZip != null){
                  address+= resultData.contents[i].defaultZip;
                }
                html += '<div class="col-md-4" style="margin-bottom:20px">';
                html += '<div class="text-centered">';
                html += '<table class="table table-card-small table-bordered-thick table-bordered" style="table-layout: fixed;background: #f8fffd !important;">';
                html += '<tr>';
                if(resultData.contents[i].imageUrl != null){
                  html += '<td rowspan="4" style="width: 30%;vertical-align: middle;"><img src="'+resultData.contents[i].imageUrl+'" width="80px" height="80px"></b></td>';
                }else{
                  html += '<td rowspan="4" style="width: 30%;vertical-align: middle;"><img src="/assets/userIcon.png" width="80px" height="80px"></b></td>';
                }
                html += '<td colspan="3">Reg No : <b>'+resultData.contents[i].sequenceId+'</b></td>';
                html += '<td rowspan="2" style="vertical-align: middle;font-size: 30px;color: #061f50;"><b><i class="fa fa-share-alt-square" aria-hidden="true"></i></b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="3"><b>'+resultData.contents[i].name+'</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>Gen</td>';
                html += '<td style="text-transform:lowercase"><b>'+resultData.contents[i].gender+'</b></td>';
                html += '<td>Age</td>';
                html += '<td><b>'+resultData.contents[i].age+'</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>Qua</b></td>';
                html += '<td colspan="3" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"><b>'+resultData.contents[i].qualification+'</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td><b><span class="fa fa-star checked" style="color:orange"></span>';
                html += '<span class="fa fa-star checked" style="color:orange"></span>';
                html += '<span class="fa fa-star checked" style="color:orange"></span>';
                html += '<span class="fa fa-star checked" style="color:orange"></span>';
                html += '<span class="fa fa-star"></span></b></td>';

                html += '<td>Exp</td>';
                html += '<td colspan="3"><b>'+resultData.contents[i].experience+' Years</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="5" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: left;"><b><i style="margin: 5px;" class="fa fa-map-marker" aria-hidden="true"></i> '+address+'</b></td>';
                html += '</tr>';
                if(isLoggedIn){
                  html += '<tr><td colspan="5" class="action-td" style="background: #0d2151;color: white;font-weight: bold">';
                  html += '<a style="color:white;display: inline-block;width: 35%;background: #49bbe8eb;padding: 8px 2px;white-space: nowrap;" href="/tutor/'+resultData.contents[i].id+'" >Veiw Details</a>';
                  html += '<a style="color:white;display: inline-block;width: 28%;margin:0 1%;background: #49bbe8eb;padding: 8px 2px;white-space: nowrap;" >Hire Me</a>';
                  html += '<a style="color:white;display: inline-block;width: 35%;background: #49bbe8eb;padding: 8px 2px;white-space: nowrap;" >Rate/Review</a>';
                  html += '</td></tr>';
                }else{
                  html += '<tr><td colspan="5" class="action-td" style="background: #0d2151;color: white;font-weight: bold">';
                  html += '<a style="color:white;display: inline-block;width: 35%;background: #49bbe8eb;padding: 8px 2px;white-space: nowrap;" href="/tutor/'+resultData.contents[i].id+'">Veiw Details</a>';
                  html += '<a style="color:white;display: inline-block;width: 28%;margin:0 1%;background: #49bbe8eb;padding: 8px 2px;white-space: nowrap;" >Hire Me</a>';
                  html += '<a style="color:white;display: inline-block;width: 35%;background: #49bbe8eb;padding: 8px 2px;white-space: nowrap;" >Rate/Review</a>';
                  html += '</td></tr>';                
                }
                html += '</table>';
                html += '</div>';
                html += '</div>';
              }
            }else{
              html += "<div style='color: #f76f58;padding: 20px;text-align: center;width: 100%;font-weight: bold;font-size: 18px;text-decoration: underline;'>No Data Available, Please Check Applied Filters.</div>"
            }
            $("#tutorGrid").html(html);
            if(pageSize > 1){
              var htmlPage = '';
              htmlPage +='<ul class="pagination">'
              for(var i=1; i <= pageSize; i++){
                htmlPage += '<li class="page-item"><a id="pageId'+i+'" class="page-link btn-job-page" href="#">'+i+'</a></li>';
              }
              htmlPage +='</ul>'
              $("#pagination1").html(htmlPage);
              $("#pageId"+(pageNumber+1)).css("background","#ccc");
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
        if(this.isLoggedIn){
          var tutorId = localStorage.getItem('userId');
          $.ajax({
              type: 'PUT',
              url: baseUrl+"/job/"+jobID+"/apply?tutorId="+tutorId,
              success: function(resultData) { 
                $("#myProfileModal").modal('hide');
                console.log(resultData)
                showToast("You have successfully applied for the job.")
                setTimeout(function(){ 
                  window.location.href = "/dashboard/tutor";
                 }, 3000);
               },
               error: function(resultData){
                 $("#myProfileModal").modal('hide');
                 console.log(resultData.responseJSON.message)
                 showToast(resultData.responseJSON.message)
               }
          });
        }else{
          window.location.href = '/login'
        }
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
          if(type == "home-tutor"){
            retStr = "TUTOR";
          } else if(type == "tution-teacher"){
            retStr = "COACHING";
          }else if(type == "online-tutor"){
            retStr = "ONLINE";
          }else if(type == "faculty"){
            retStr = "FACULTY";
          }
        }
        return retStr;
      }

  }

}
