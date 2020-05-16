import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if(id == null || id == "" || id == undefined){
        window.location.href = '/login'
      }
      $(document).ready(function(){
        $("#viewTabName").text("Profile");
        $(".sidenav a").removeClass("active");
        $("#profile").addClass("active");
      });
      //for edit buttons
      $("#classesEdit").attr("href", "/tutor/edit/classAndSubject");
      $("#educationEdit").attr("href", "/tutor/edit/education");
      $("#worklocationEdit").attr("href", "/tutor/edit/workLocation");
      $("#experienceEdit").attr("href", "/tutor/edit/experience");
      $("#addressEdit").attr("href", "/tutor/edit/address");
      $("#guarantorEdit").attr("href", "/tutor/edit/guarantor");
      $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id,
          // beforeSend: function(xhr) {
          //   xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
          // },
          success : function(data){
            $("#name").text(data.name);
            $("#find").text("Job");
            $("#mobile").text(data.mobile);
            $("#whatsappNumber").text(data.whatsappNumber)
            $("#email").text(data.email);
            if(data.gender != null && data.gender != undefined){
              $("#gender").text(data.gender.toLowerCase());
            }
            $("#age").text(data.age);
            $("#location").text(data.location+", "+data.city+", "+data.state+", "+(data.defaultZip != null ? data.defaultZip : ''));
            $("#experience").text(data.experience);
            $(".qualification").text(data.qualification);
            if(data.types.length > 0){
              data.types.forEach(function(a,i){
                if(a.teacherType != null){
                  if(i == 0){
                    $("#tutorType").append(getTutorType(a.teacherType));
                  }else{
                    $("#tutorType").append(", "+getTutorType(a.teacherType));
                  }
                }
              })
            }
            if(data.jobType != null){
              $("#jobType").text(data.jobType.toLowerCase());
              if(data.partTimeReason != null){
                $("#jobType").text(data.jobType.toLowerCase()+", "+data.partTimeReason);
              }
            }
            if(data.fluencyInEnglish != null){
              $("#fluencyInEnglish").text(data.fluencyInEnglish.toLowerCase());
            }
            $("#category").text(data.category);
            if(data.imageUrl != null){
              $(".profilePic").attr("src",data.imageUrl+"?v="+Math.random());
            }else{
              $(".profilePic").attr("src","/assets/userIcon.png");
            }
            if(data.credit != null){
              $(".total-credit").html(data.credit+" &#8364;");
            }else{
              $(".total-credit").html("0 &#8364;");
            }
            $(".sequence").text(data.sequenceId);
            if(data.education.length > 0){
              var eduTable = '';
              eduTable += '<table class="table table-bordered swapTable" style="max-width: 800px;text-align: center;font-size: 14px;font-weight: bold;table-layout: fixed;min-width: 450px;">';
              eduTable += '<tr class="inlineList">';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;width: 100px;">Name Of <br>Passing</td>';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;">Stream <br> or<br> Branch</td>';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;">Board <br> or <br>University</td>';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;">Passing <br>State</td>';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;">Passing <br>Year</td>';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;">Mode Of <br>Study</td>';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;">Marks <br> Obtained<br>(%)</td>';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;">Type Of School <br> Collage</td>';
              eduTable += '<td style="background: #bfbfbf;font-weight: bold;">Document <br>Proof</td>';
              eduTable += '</tr>';
              data.education.forEach(function(a){
                eduTable += '<tr>';
                eduTable += '<td style="background: #061f50;text-transform: capitalize;font-weight: bold;color: white;">'+a.degree+'</td>'
                if(a.stream != undefined && a.stream != null){
                  eduTable += '<td>'+a.stream +'</td>'
                }else{
                  eduTable += '<td> </td>'
                }
                if(a.board != undefined && a.board != null){
                  eduTable += '<td>'+a.board +'</td>'
                }else{
                  eduTable += '<td> </td>'
                }
                if(a.state != undefined && a.state != null){
                  eduTable += '<td>'+a.state +'</td>'
                }else{
                  eduTable += '<td> </td>'
                }
                if(a.year != undefined && a.year != null){
                  eduTable += '<td>'+a.year +'</td>'
                }else{
                  eduTable += '<td> </td>'
                }
                if(a.mode != undefined && a.mode != null){
                  eduTable += '<td>'+a.mode +'</td>'
                }else{
                  eduTable += '<td> </td>'
                }
                if(a.marksObtained != undefined && a.marksObtained != null){
                  eduTable += '<td>'+a.marksObtained +'</td>'
                }else{
                  eduTable += '<td> </td>'
                }
                if(a.type != undefined && a.type != null){
                  eduTable += '<td>'+a.type +'<br><br></td>'
                }else{
                  eduTable += '<td> </td>'
                }
                eduTable += '<td> </td>'
                eduTable += '</tr>';
              }); 
              eduTable += '</table>';
              eduTable += '</div>';
              $("#educationalTable").append(eduTable);
              // $(".swapTable").css({ "border-collapse": "collapse"});
              // $(".swapTable tr").css({ "display": "block","float": "left"});
              $(".swapTable td").css({ "padding": "4px","border":"1px solid #000000","vertical-align": "middle"});
            }
            $(".swapTable").each(function() {
              var $this = $(this);
              var newrows = [];
              $this.find("tr").each(function(){
                  var i = 0;
                  $(this).find("td").each(function(){
                      i++;
                      if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                      newrows[i].append($(this));
                  });
              });
              $this.find("tr").remove();
              $.each(newrows, function(){
                  $this.append(this);
              });
            });
            //for zip code
            if(data.zipCode.length > 0){
              var zipTable = '';
                zipTable += '<tr>';
                zipTable += '<td><b>Pin Code</b></td>'
                zipTable += '<td><b>Location</b></td>'
                zipTable += '</tr>';
              data.zipCode.forEach(function(a){
                if(a.zip != ""){
                  zipTable += '<tr>';
                  zipTable += '<td>'+a.zip+'</td>'
                  zipTable += '<td>'+(a.location != null ? a.location : "NA")+'</td>'
                  zipTable += '</tr>';
                }
              }); 
              $("#zipCodeTable").append(zipTable);
            }
            //for experience
            if(data.experiences.length > 0){
              var expTable = '';
              expTable += '<tr>';
              expTable += '<td>Total Experiance</td>';
              expTable += '<td>'+data.experience+' years</td>';
              expTable += '</tr>';
              data.experiences.forEach(function(a){
                if(a.tutorType == 'HOME_TUTOR'){
                  expTable += '<tr>';
                  expTable += '<td><b>Home Tutor</b></td>';
                  expTable += '<td>From '+a.fromDate+' To '+a.toDate+'</td>';
                  expTable += '<tr>';
                }else if(a.tutorType == 'ONLINE_TUTOR'){
                  expTable += '<tr>';
                  expTable += '<td><b>Online Tutor</b></td>';
                  expTable += '<td>From '+a.fromDate+' To '+a.toDate+'</td>';
                  expTable += '<tr>';
                }else if(a.tutorType == 'TEACHING_AT_MY_PLACE'){
                  expTable += '<tr>';
                  expTable += '<td><b>At My Place</b></td>';
                  expTable += '<td>From '+a.fromDate+' To '+a.toDate+'</td>';
                  expTable += '<tr>';
                }else if(a.tutorType == 'FACUTLTY_AT_INSTITUTE'){
                  expTable += '<tr>';
                  expTable += '<td colspan="2" style="text-align: center;font-size: 18px;"><b>At Institute</b></td>';
                  expTable += '</tr>';
                  expTable += '<tr>';
                  expTable += '<td>'+(a.institute != null ? a.institute : 'NA')+'</td>';
                  expTable += '<td>From '+a.fromDate+' To '+a.toDate+'</td>';
                  expTable += '<tr>';
                  expTable += '<tr>';
                  expTable += '<td>Address</td>';
                  expTable += '<td>'+(a.address != null ? a.address : 'NA')+'</td>';
                  expTable += '<tr>';
                  expTable += '<tr>';
                  expTable += '<td>Position</td>';
                  expTable += '<td>'+(a.position != null ? a.position : 'NA')+'</td>';
                  expTable += '<tr>';
                }else  if(a.tutorType == 'FACULTY_AT_SCHOOL'){
                  expTable += '<tr>';
                  expTable += '<td colspan="2" style="text-align: center;font-size: 18px;"><b>At School</b></td>';
                  expTable += '</tr>';
                  expTable += '<tr>';
                  expTable += '<td>'+(a.institute != null ? a.institute : 'NA')+'</td>';
                  expTable += '<td>From '+a.fromDate+' To '+a.toDate+'</td>';
                  expTable += '<tr>';
                  expTable += '<tr>';
                  expTable += '<td>Address</td>';
                  expTable += '<td>'+(a.address != null ? a.address : 'NA')+'</td>';
                  expTable += '<tr>';
                  expTable += '<tr>';
                  expTable += '<td>Position</td>';
                  expTable += '<td>'+(a.position != null ? a.position : 'NA')+'</td>';
                  expTable += '<tr>';
                }
              });
              $("#experienceTable").append(expTable);
            }
          },
          error : function(data){
            console.log(data)
          }
        });
        //for classes and subject
        $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id+"/map",
          success: function(resultData) { 
            console.log(resultData);
            var grouped = {};
            resultData.forEach(function (a) {
                grouped[a.group.name] = grouped[a.group.name] || [];
                grouped[a.group.name].push(a.classSubjectMapping.subjectMaster.name);
            });
            var tableHtml = '';
            for (var key in grouped) {
              tableHtml += '<tr>';
              tableHtml += '<td>'+key+'</td>'
              tableHtml += '<td>'+grouped[key]+'</td>'
              tableHtml += '</tr>';
            }
            $("#classesAndSubjectTable").append(tableHtml);
            
          }
        });
        //get  address
        $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id+"/address",
          success: function(resultData) { 
            //addreesTable
            var addrHtml = "<tr><th>Current Address</th><th>Permanent Address</th></tr>";
            addrHtml += '<tr><td style="width:50%">';
            if(resultData.address.currentAddress != undefined && resultData.address.currentAddress != null){
                addrHtml +=   resultData.address.currentAddress.line1;
                addrHtml += ', '+resultData.address.currentAddress.line2;
                addrHtml += ', '+resultData.address.currentAddress.city;
                addrHtml += ', '+resultData.address.currentAddress.state;
                addrHtml += ', '+resultData.address.currentAddress.zipcode;
              }  
            addrHtml += '</td>';
            addrHtml += '<td>';
            if(resultData.address.permanentAddress != undefined && resultData.address.permanentAddress != null){
              addrHtml +=   resultData.address.permanentAddress.line1;
              addrHtml += ', '+resultData.address.permanentAddress.line2;
              addrHtml += ', '+resultData.address.permanentAddress.city;
              addrHtml += ', '+resultData.address.permanentAddress.state;
              addrHtml += ', '+resultData.address.permanentAddress.zipcode;
            }  
            addrHtml += '</td></tr>'; 
            addrHtml += '<tr>'; 
            if(resultData.address.currentAddress != undefined && resultData.address.currentAddress != null){
              if(resultData.address.currentAddress.url != null && resultData.address.currentAddress.url != ""){
                addrHtml += '<td><img alt="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" style="width: 250px;height:200px" src="'+resultData.address.currentAddress.url+'?v='+Math.random()+'"></td>';
              }else{
                addrHtml += '<td><a rel="nofollow" title="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" style="color: #f26832;font-weight: bold;" href="/tutor/edit/address/#addressProof">Upload Proof >></a></td>';
              }
            }else{
              addrHtml += '<td></td>';
            }
            if(resultData.address.permanentAddress != undefined && resultData.address.permanentAddress != null && resultData.address.permanentAddress.url != null && resultData.address.permanentAddress.url != ""){
              addrHtml += '<td><img alt="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" style="width: 250px;height:200px" src="'+resultData.address.permanentAddress.url+'?v='+Math.random()+'"></td>';
            } else{
              addrHtml += '<td></td>';
            } 
            addrHtml += '<tr>';
            $("#addreesTable").html(addrHtml);  
          }
        });
        //for guarentor
        $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id+"/guarantor",
          // beforeSend: function(xhr) {
          //   xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
          // },
          success : function(data){
            if(data.length > 0){
              var gueTable = '';
              gueTable += '<tr style="background: #061f50;color: white;">';
              gueTable += '<th>Name</th>';
              gueTable += '<th>Mobile</th>';
              gueTable += '<th>Relation</th>';
              gueTable += '</tr>';
              data.forEach(function(a){
                if(a.name != null){
                  gueTable += '<tr>';
                  gueTable += '<td>'+a.name+'</td>';
                  gueTable += '<td>'+a.mobileNumber+'</td>';
                  gueTable += '<td>'+a.relation+'</td>';
                  gueTable += '<tr>';
                }
              });
              $("#guarantorTable").append(gueTable);
            }
          }
        });
    $(".profileNav .nav-link").click(function(){
      var navclick = $(this).attr("data-value");
      if(navclick == "Basic"){
        $(".slidable").slideDown();
        $(".total-credit").css("position","absolute");
      }else{
        $(".slidable").slideUp();
        $(".total-credit").css("position","relative");
      }
    });

    //upload profile pic
    $("#uploadProfilePic").change(function(){
      var fileInput = document.getElementById('uploadProfilePic');
      var file = (<HTMLInputElement>fileInput).files[0];
      var formData = new FormData();
      formData.append('file', file);
      $.ajax({
             url: baseUrl+"/tutor/"+id+"/upload",
             type : 'POST',
             data : formData,
             processData: false,
             contentType: false,  
             success : function(data) {
                location.reload(false); 
             }
      });
    });

    //get tutor type
    function getTutorType(type){
      var retStr = "";
      if(type != undefined && type != null){
        if(type == "TUTOR"){
          retStr = "Home Tutor <small>(Travel at Student Place)</small>";
        } else if(type == "COACHING"){
          retStr = "Run a Coaching Center <small>(Teaching at my Place)</small>";
        }else if(type == "ONLINE"){
          retStr = "Online Tutor / Trainer";
        }else if("FACULTY"){
          retStr = "Faculty <small>(Looking a Coaching Center where i can teach)</small>";
        }
      }
      return retStr;
    }
  }

}
