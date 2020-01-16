import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-update-education-qualification',
  templateUrl: './update-education-qualification.component.html',
  styleUrls: ['./../update-tutor-profile.component.css']
})
export class UpdateEducationQualificationComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      var id;
      this.route.params.subscribe(params => {
        id = params["id"];
      });
      $("#viewTabName").text("Update Educational Qualification");
      $(".sidenav a").removeClass("active");
      $("#editProfile").addClass("active");
      $(document).ready(function() {
        $('.selectpicker').selectpicker();
      });
      //new 
      $.ajax({
        type: 'GET',
        url: baseUrl+"/tutor/"+id,
        success : function(data){
          $("#qualification").text(data.qualification);
        }
      });
      $(".eduTab").click(function(){
        $("#educationModal").modal('show');
        var dataId = $(this).attr("data-id");
        $("#educationForm").attr("data-id",dataId);
        $("#educationModal").find(".passing-deg").text(dataId.toUpperCase());
        if(dataId == "intermidiate"){
            $("#boardForOtherDiv,.streamForOther").prop("hidden",true);
            $("#boardForInterDiv,.streamForInter").prop("hidden",false);
        }else{
            $("#boardForInterDiv,.streamForInter").prop("hidden",true);
            $("#boardForOtherDiv,.streamForOther").prop("hidden",false);
        }
        
        $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id+"/education",
          success: function(resultData) { 
            console.log(resultData);    
            var grouped = {};
            var keepGoing = true;
            resultData.forEach(function (a) {
              if(keepGoing){
                if(a.degree == dataId){
                  $("#eduId").val(a.id);
                  if(dataId == "intermidiate"){
                    $("#examStreamInter").val(a.stream).selectpicker('refresh');
                    $("#boardForInter").val(a.board).selectpicker('refresh');
                  }else{
                    $("#examStreamOther").val(a.stream);
                    $("#boardForOther").val(a.board)
                  }
                  var stateSel = $(".states option").filter(function() { 
                    return this.text == a.state; 
                  }).val();
                  $(".states").val(stateSel).selectpicker('refresh');
                  $("#passingYear").val(a.year);
                  $("#modeOfStudy ").val(a.mode).selectpicker('refresh');
                  $("#markObtained").val(a.marksObtained);
                  $("#schoolType").val(a.type).selectpicker('refresh');
                  keepGoing = false;
                }else{
                  $("#eduId").val(null);
                  if(dataId == "intermidiate"){
                    $("#examStreamInter").val("").selectpicker('refresh');
                    $("#boardForInter").val("").selectpicker('refresh');
                  }else{
                    $("#examStreamOther").val("");
                    $("#boardForOther").val("")
                  }
                  $(".states").val("").selectpicker('refresh');
                  $("#passingYear").val("");
                  $("#modeOfStudy ").val("").selectpicker('refresh');
                  $("#markObtained").val("");
                  $("#schoolType").val("").selectpicker('refresh');
                }
              }
            });            
          }
        });
      });
      //new
      // Function for update qualification
      var statesHtml = '<option value="" selected disabled>Passing State</option>';
    
      $.ajax({
        type: 'GET',
        url: baseUrl+"/config/state",
        async:false,
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            resultData.forEach(function (a){
              statesHtml += '<option value="'+a.id+'">'+a.name+'</option>';
            })
          }
      });
      $(".states").html(statesHtml).selectpicker();
      $("#saveQualification").click(function(){
        var jsonObj = [];
        var interEduId = $("#eduId").val();
        if(interEduId == "" || interEduId == undefined){
          interEduId = null;
        }
        var degree = $("#educationForm").attr("data-id");
        var interExam = "";
        if(degree == "intermidiate"){
          interExam = $("#examStreamInter").val();
        }else{
          interExam = $("#examStreamOther").val();
        }
        var interBoard = "";
        if(degree == "intermidiate"){
          interBoard = $("#boardForInter").val();
        }else{
          interBoard = $("#boardForOther").val();
        }
        var interStateText = $("select.states option:selected").text();
        console.log(interStateText);
        var interYear = $("#passingYear").val();
        var interMode = $("#modeOfStudy ").val();
        var interMarks = $("#markObtained").val();
        var interType = $("#schoolType").val();
        if(checkNullOrUndefined(interBoard) !="" || checkNullOrUndefined(interExam) != "" || checkNullOrUndefined(interMarks) != "" || checkNullOrUndefined(interStateText) != "" || checkNullOrUndefined(interType) != "" || checkNullOrUndefined(interYear) != "" || checkNullOrUndefined(interMode) != ""){
          var inter = {"id":interEduId,"degree":degree,"stream":interExam,"board" : interBoard,"state":interStateText,"year":interYear,"mode":interMode,"marksObtained":interMarks,"type":interType};
          jsonObj.push(inter);
          console.log(jsonObj);
        }

        if(jsonObj.length > 0){
          $.ajax({
                type: 'POST',
                url: baseUrl+"/tutor/"+id+"/education",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(jsonObj),
                success: function(resultData) { 
                  showToast("Educational Qualifications saved successfully.");
                  $("#educationModal").modal('hide');
                },
                error :function(resultData){
                  console.log(resultData);
                }
          });
        }else{
          showToast("You can not save an empty table.");
        }
    });

        // $("#saveQualification").click(function(){
        //     var jsonObj = [];
        //     var interEduId = $("#intermidiate").find(".eduId").val();
        //     if(interEduId == "" || interEduId == undefined){
        //       interEduId = null;
        //     }
        //     var interExam = $("#intermidiate").find(".examStream").val();
        //     var interBoard = $("#intermidiate").find(".board").val();
        //     var interState = $("#intermidiate").find("select.states").val();
        //     var interYear = $("#intermidiate").find(".passingYear").val();
        //     var interMode = $("#intermidiate").find(".modeOfStudy ").val();
        //     var interMarks = $("#intermidiate").find(".markObtained").val();
        //     var interType = $("#intermidiate").find(".schoolType").val();
        //     if(checkNullOrUndefined(interBoard) !="" || checkNullOrUndefined(interExam) != "" || checkNullOrUndefined(interMarks) != "" || checkNullOrUndefined(interState) != "" || checkNullOrUndefined(interType) != "" || checkNullOrUndefined(interYear) != "" || checkNullOrUndefined(interMode) != ""){
        //       var inter = {"id":interEduId,"degree":"intermidiate","stream":interExam,"board" : interBoard,"state":interState,"year":interYear,"mode":interMode,"marksObtained":interMarks,"type":interType};
        //       jsonObj.push(inter);
        //       console.log(jsonObj);
        //     }

        //     var gradEduId = $("#graduation").find(".eduId").val();
        //     if(gradEduId == "" || gradEduId == undefined){
        //       gradEduId = null;
        //     }
        //     var gradExam = $("#graduation").find(".examStream").val();
        //     var gradBoard = $("#graduation").find(".board").val();
        //     var gradState = $("#graduation").find("select.states").val();
        //     var gradYear = $("#graduation").find(".passingYear").val();
        //     var gradMode = $("#graduation").find(".modeOfStudy ").val();
        //     var gradMarks = $("#graduation").find(".markObtained").val();
        //     var gradType = $("#graduation").find(".schoolType").val();
        //     if(checkNullOrUndefined(gradBoard) != "" || checkNullOrUndefined(gradState) != "" || checkNullOrUndefined(gradExam) != "" || checkNullOrUndefined(gradYear) != "" || checkNullOrUndefined(gradMode) != "" || checkNullOrUndefined(gradType) != "" || checkNullOrUndefined(gradMarks) != ""){
        //       var graduation = {"id":gradEduId,"degree":"graduation","stream":gradExam,"board" : gradBoard,"state":gradState,"year":gradYear,"mode":gradMode,"marksObtained":gradMarks,"type":gradType};
        //       jsonObj.push(graduation);
        //       console.log(jsonObj);
        //     }

        //     var masterEduId = $("#master").find(".eduId").val();
        //     if(masterEduId == "" || masterEduId == undefined){
        //       masterEduId = null;
        //     }
        //     var masterExam = $("#master").find(".examStream").val();
        //     var masterBoard = $("#master").find(".board").val();
        //     var masterState = $("#master").find("select.states").val();
        //     var masterYear = $("#master").find(".passingYear").val();
        //     var masterMode = $("#master").find(".modeOfStudy ").val();
        //     var masterMarks = $("#master").find(".markObtained").val();
        //     var masterType = $("#master").find(".schoolType").val();
        //     if(checkNullOrUndefined(masterBoard) != "" || checkNullOrUndefined(masterState) != "" || checkNullOrUndefined(masterExam) != "" || checkNullOrUndefined(masterYear) != "" || checkNullOrUndefined(masterMode) != "" || checkNullOrUndefined(masterType) != "" || checkNullOrUndefined(masterMarks) != ""){
        //       var master = {"id":masterEduId,"degree":"master","stream":masterExam,"board" : masterBoard,"state":masterState,"year":masterYear,"mode":masterMode,"marksObtained":masterMarks,"type":masterType};
        //       jsonObj.push(master);
        //       console.log(jsonObj);
        //     }

        //     var otherEduId = $("#other").find(".eduId").val();
        //     if(otherEduId == "" || otherEduId == undefined){
        //       otherEduId = null;
        //     }
        //     var otherExam = $("#other").find(".examStream").val();
        //     var otherBoard = $("#other").find(".board").val();
        //     var otherState = $("#other").find("select.states").val();
        //     var otherYear = $("#other").find(".passingYear").val();
        //     var otherMode = $("#other").find(".modeOfStudy ").val();
        //     var otherMarks = $("#other").find(".markObtained").val();
        //     var otherType = $("#other").find(".schoolType").val();
        //     if(checkNullOrUndefined(otherBoard) != "" || checkNullOrUndefined(otherState) != "" || checkNullOrUndefined(otherExam) != "" || checkNullOrUndefined(otherYear) != "" || checkNullOrUndefined(otherMode) != "" || checkNullOrUndefined(otherType) != "" || checkNullOrUndefined(otherMarks) != ""){
        //       var other = {"id":otherEduId,"degree":"other","stream":otherExam,"board" : otherBoard,"state":otherState,"year":otherYear,"mode":otherMode,"marksObtained":otherMarks,"type":otherType};
        //       jsonObj.push(other);
        //     }
        //     if(jsonObj.length > 0){
        //       $.ajax({
        //             type: 'POST',
        //             url: baseUrl+"/tutor/"+id+"/education",
        //             contentType: "application/json;charset=utf-8",
        //             data: JSON.stringify(jsonObj),
        //             success: function(resultData) { 
        //               showToast("Educational Qualifications saved successfully.");
        //               setTimeout(function(){ 
        //                 window.location.href = "tutor/education/"+id;
        //               }, 3000);
        //             },
        //             error :function(resultData){
        //               console.log(resultData);
        //             }
        //       });
        //     }else{
        //       showToast("You can not save an empty table.");
        //     }
        // });

        // $.ajax({
        //   type: 'GET',
        //   url: baseUrl+"/tutor/"+id+"/education",
        //   success: function(resultData) { 
        //     console.log(resultData);    
        //     var grouped = {};
        //     resultData.forEach(function (a) {
        //       if(a.degree == "intermidiate"){
        //         $("#intermidiate").find(".eduId").val(a.id);
        //         $("#intermidiate").find(".examStream").val(a.stream);
        //         $("#intermidiate").find(".board").val(a.board);
        //         $("#intermidiate").find("select.states").val(a.state);
        //         $(".states").selectpicker('refresh');
        //         $("#intermidiate").find(".passingYear").val(a.year);
        //         $("#intermidiate").find(".modeOfStudy ").val(a.mode);
        //         $("#intermidiate").find(".markObtained").val(a.marksObtained);
        //         $("#intermidiate").find(".schoolType").val(a.type);
        //       }
        //       if(a.degree == "graduation"){
        //         $("#graduation").find(".eduId").val(a.id);
        //         $("#graduation").find(".examStream").val(a.stream);
        //         $("#graduation").find(".board").val(a.board);
        //         $("#graduation").find("select.states").val(a.state);
        //         $(".states").selectpicker('refresh');
        //         $("#graduation").find(".passingYear").val(a.year);
        //         $("#graduation").find(".modeOfStudy ").val(a.mode);
        //         $("#graduation").find(".markObtained").val(a.marksObtained);
        //         $("#graduation").find(".schoolType").val(a.type);
        //       }
        //       if(a.degree == "master"){
        //         $("#master").find(".eduId").val(a.id);
        //         $("#master").find(".examStream").val(a.stream);
        //         $("#master").find(".board").val(a.board);
        //         $("#master").find("select.states").val(a.state);
        //         $(".states").selectpicker('refresh');
        //         $("#master").find(".passingYear").val(a.year);
        //         $("#master").find(".modeOfStudy ").val(a.mode);
        //         $("#master").find(".markObtained").val(a.marksObtained);
        //         $("#master").find(".schoolType").val(a.type);
        //       }
        //       if(a.degree == "other"){
        //         $("#other").find(".eduId").val(a.id);
        //         $("#other").find(".examStream").val(a.stream);
        //         $("#other").find(".board").val(a.board);
        //         $("#other").find("select.states").val(a.state);
        //         $(".states").selectpicker('refresh');
        //         $("#other").find(".passingYear").val(a.year);
        //         $("#other").find(".modeOfStudy ").val(a.mode);
        //         $("#other").find(".markObtained").val(a.marksObtained);
        //         $("#other").find(".schoolType").val(a.type);
        //       }
        //     });            
        //   }
        // });
         //general functions
         function showToast(data) {
          var x = document.getElementById("snackbar");
          x.className = "show";
          x.innerText = data;
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        function checkNullOrUndefined(str){
          var blank = "";
          if(str == null || str == undefined){
            return blank;
          }else{
            return str
          }
        }
        $(document).on('change','.selectpicker',function() {
          $(this).next().blur();
        });
  }

}
