import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment';
import {SeoService} from '../../app/seo.service';
import { HttpClient } from '@angular/common/http';
declare var $:any;

@Component({
  selector: 'app-tutor-public',
  templateUrl: './tutor-public.component.html',
  styleUrls: ['./tutor-public.component.css']
})
export class TutorPublicComponent implements OnInit {
  baseUrl :String = environment.baseUrl;
  id : any;
  tutor : any;
  constructor( private route: ActivatedRoute,_seoService:SeoService,http:HttpClient) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    //get tutor type short
    function getTutorTypeShort(type){
      var retStr = "";
      if(type != undefined && type != null){
        if(type == "TUTOR"){
          retStr = "Home Tutor";
        } else if(type == "COACHING"){
          retStr = "Run a Coaching Center";
        }else if(type == "ONLINE"){
          retStr = "Online Tutor / Trainer";
        }else if("FACULTY"){
          retStr = "Faculty";
        }
      }
      return retStr;
    }
    http.get(this.baseUrl+'/tutor/'+this.id)
      .subscribe(tutor => {
        this.tutor = tutor;
        var data = this.tutor;
        if(data != undefined){
                var modeofteach = "";
                if(data.types.length > 0){
                  data.types.forEach(function(a,i){
                    if(a.teacherType != null){
                      if(i == 0){
                        modeofteach += getTutorTypeShort(a.teacherType);
                      }else{
                        modeofteach += ", "+getTutorTypeShort(a.teacherType);
                      }
                    }
                  })
                }
                var grouped = {};
                data.mapping.forEach(function (a) {
                    grouped[a.classGroup.name] = grouped[a.classGroup.name] || [];
                    grouped[a.classGroup.name].push(a.subjectMaster.name);
                });
                var classCat = '';
                var subjects = '';
                for (var key in grouped) {
                  classCat = key+", ";
                  subjects = grouped[key]+', ';
                }
                var address = "";
                if(data.location != null){
                  address+= data.location+", ";
                }
                if(data.city != null){
                  address+= data.city+", ";
                }
                if(data.state != null){
                  address+= data.state+", ";
                }
                if(data.defaultZip != null){
                  address+= data.defaultZip;
                }
                var imageUrl = data.imageUrl != null ? data.imageUrl.replace('https://','http://') : 'http://hansatutor.com/assets/userIcon.png';
                _seoService.updateTitle(data.name+" "+modeofteach+" in "+data.city);
                _seoService.updateDescription("Teaching "+classCat+" "+subjects+" near "+data.location+" in "+data.city);
                _seoService.updateOgUrl("http://hansatutor.com/tutor/"+this.id);
                _seoService.updateOgImage(imageUrl);
                _seoService.updateOgTitle(data.name+" "+modeofteach+" in "+data.city);
                _seoService.updateOgDesc("Teaching "+classCat+" "+subjects+" near "+data.location+" in "+data.city);
                let keyWords = "";
                keyWords+= "ICSE "+modeofteach+", ";
                keyWords+= "IB "+modeofteach+" Near me, ";
                keyWords+= "IGCSE "+modeofteach+" in "+data.location+" "+data.city+", ";
                keyWords+= subjects +" "+modeofteach+", ";
                keyWords+= subjects +" "+modeofteach+" Near me, ";
                keyWords+= subjects +" "+modeofteach+" in "+data.location+" "+data.city+", ";
                keyWords+= classCat+" "+subjects +" "+modeofteach+" Near me, ";
                keyWords+= classCat+" "+subjects +" "+modeofteach+" in "+data.location+" "+data.city+", ";
                keyWords+= "Search Find and Hire Trusted Tested and Verified best Personal Private Professional Male Female Home Tuition Tutors Online Trainers School Teachers Group Classes Coaching Centers Institutes Faculty Lecturer Tutorial Mentor Coach – Instructor CBSE IB ICSE IGCSE ISC NIOS";
                _seoService.updateKeywords(keyWords);
                var html="";
                html += '<div style="margin-bottom:20px">';
                html += '<div class="text-centered">';
                html += '<div style="background: #061f50;padding: 10px;color:white;">';
                html += '<h1>'+data.name+' '+modeofteach+'</h1>';
                html += '<h2>Teaching '+classCat+' '+subjects+' Near '+data.location+' in '+data.city+'</h2>';
                html += '</div>';
                html += '<table class="table table-card-small table-bordered-thick table-bordered" style="table-layout: fixed;background: #f8fffd !important;">';
                html += '<tr>';
                if(data.imageUrl != null){
                  html += '<td colspan="4" style="vertical-align: middle;padding: 20px !important;"><img alt="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" src="'+data.imageUrl+'" width="280px" height="280px"></b></td>';
                }else{
                  html += '<td colspan="4" style="vertical-align: middle;padding: 20px !important;"><img alt="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" src="/assets/userIcon.png" width="280px" height="280px"></b></td>';
                }
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="3"><b><span class="fa fa-star checked" style="color:orange"></span>';
                html += '<span class="fa fa-star checked" style="color:orange"></span>';
                html += '<span class="fa fa-star checked" style="color:orange"></span>';
                html += '<span class="fa fa-star checked" style="color:orange"></span>';
                html += '<span class="fa fa-star"></span></b></td>';
                html += '<td rowspan="2" style="vertical-align: middle;font-size: 30px;color: #061f50;"><b id="share"><i class="fa fa-share-alt-square" aria-hidden="true"></i></b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="3">Reg No : <b>'+data.sequenceId+'</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="3"><b>'+data.name+'</b></td>';
                html += '<td></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>Gen</td>';
                html += '<td style="text-transform:lowercase"><b>'+data.gender+'</b></td>';
                html += '<td>Age</td>';
                html += '<td><b>'+data.age+'</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="2">Total Experiance</td>';
                html += '<td colspan="2"><b>'+data.experience+' Years</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="2">Mode of Teaching</td>';
                html += '<td colspan="2"><b>'+modeofteach+'</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="2">Job Type</td>';
                html += '<td colspan="2"><b>'+data.jobType+'</b></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td colspan="2">Fluency in English</td>';
                html += '<td colspan="2"><b>'+data.fluencyInEnglish+'</b></td>';
                html += '</tr>';
                html += '<tr><td colspan="4" class="action-td" style="background: #0d2151;color: white;font-weight: bold">';
                html += '<a rel="nofollow" title="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" style="color:white;display: inline-block;width: 48%;margin:0 1%;background: #49bbe8eb;padding: 8px 2px;white-space: nowrap;" >Request A Callback</a>';
                html += '<a rel="nofollow" title="Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes | hansa tutor" style="color:white;display: inline-block;width: 48%;margin:0 1%;background: #49bbe8eb;padding: 8px 2px;white-space: nowrap;" >Rate/Review</a>';
                html += '</td></tr>';
                html += '</table>';
                html += '</div>';
                html += '</div>';
                $("#tutorGrid").html(html);
                $(".qualification").text(data.qualification);
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
                  zipTable += '<td>'+a.location+'</td>'
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
                  // expTable += '<td>'+(a.institute != null ? a.institute : 'NA')+'</td>';
                  // expTable += '<td>'+(a.address != null ? a.address : 'NA')+'</td>';
                  // expTable += '<td>'+(a.position != null ? a.position : 'NA')+'</td>';
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
          }
    });
  }

  ngOnInit() {
      $("#viewTabName").text("");
      var id = this.id;
      var baseUrl = this.baseUrl;
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
  
    $(".btn-back").click(function(){
      window.history.back();
    });
    //share
    
    // Must be triggered some kind of "user activation"
    $(document).on('click',"#share",function(){
         let newVariable: any;
         newVariable = window.navigator;

        if (newVariable && newVariable.share) {
          newVariable.share({
            title: 'title',
            text: 'description',
            url: 'https://soch.in//',
          })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
          alert('share not supported');
        }
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
