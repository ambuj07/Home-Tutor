import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
declare var $:any;


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {
    
  }
  ngOnInit() {
   // this.title.setTitle("Home Tuition Tutor");
    this.meta.updateTag({ property: 'og:image', content: 'http://www.hansatutor.com/assets/shareIcon.jpeg' });
    this.meta.updateTag({ property: 'og:title', content: 'Home Tuition Tutor Online Teacher/Trainer, Group Classes, Coaching Centre, Institutes' });
    document.onreadystatechange = function () {
      var state = document.readyState
      if (state == 'complete') {
          setTimeout(function(){
             document.getElementById('load').style.visibility="hidden";
             document.getElementById('contents').style.visibility="visible";
          },1000);
      }
    }
    const baseUrl = environment.baseUrl;
    var userName = localStorage.getItem("userName");
    var userId = localStorage.getItem("userId");
    var type = localStorage.getItem("type");
    $(function() {
      if(userName != null && userId != null && type != null){
        if(type == "TUTOR"){
          window.location.href = '/profile/tutor';
        }
        if(type == "STUDENT"){
          window.location.href = '/profile/student';
        }
      }
    });
    $(document).ready(function(){
      $(".sidenav a").removeClass("active");
      $(".homeA").addClass("active");
      $(".leftArrow").trigger("click");
      //Subjects and classes
      var classHtml = '<option value="" disabled selected>Select Class</option>';
      var subjectHtml = '';
      $.ajax({
        type: 'GET',
        url: baseUrl+"/config",
        async:false,
        //dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
            console.log(resultData);
            for(var i=0; i<resultData.classes.length; i++){
              classHtml += '<option value="'+resultData.classes[i].id+'">'+resultData.classes[i].name+'</option>';
            }
            for(var i=0; i<resultData.subjects.length; i++){
              subjectHtml += '<option value="'+resultData.subjects[i].id+'">'+resultData.subjects[i].name+'</option>';
            }
          }
        });
        $("#chooseClass").html(classHtml).selectpicker('refresh');
        //$("#chooseSubject").html(subjectHtml).selectpicker('refresh');
    })
    $("#find").click(function(){
      var zip = $("#zipCode").val();
      var classSel = $("select#chooseClass").val();
      if(zip == "" || zip == null){
        $("#zipCode").addClass('input-error');
        showToast("Zip code is mandatory.")
      }else{
        window.location.href = '/nearbyTutors?zip='+zip+'&class='+classSel;
      }
    });
    // element to detect scroll direction of
    $(".scrollable").on('scroll', function() {
      $(this).closest(".container").find(".rightArrow").css("display","block");
      $(this).closest(".container").find(".leftArrow").css("display","block");
    });
    //left right button
    $(".rightArrow").click(function () {
        var container = $(this).closest(".container").find(".scrollable").get(0);
        sideScroll(container,'right',10,250,10);
    });

    $(".leftArrow").click(function () {
        var container = $(this).closest(".container").find(".scrollable").get(0);
        sideScroll(container,'left',10,250,10);
    });

    function sideScroll(element,direction,speed,distance,step){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            if(direction == 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
            if(element.scrollLeft+element.offsetWidth  == element.scrollWidth){
              $(element).closest(".container").find(".rightArrow").css("display","none");
            }else{
              $(element).closest(".container").find(".rightArrow").css("display","block");
            }
            if(element.scrollLeft > 0){
              $(element).closest(".container").find(".leftArrow").css("display","block");
            }else{
              $(element).closest(".container").find(".leftArrow").css("display","none");
            }
        }, speed);
    }
    //general functions
    function showToast(data) {
      var x = document.getElementById("snackbar");
      x.className = "show";
      x.innerText = data;
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    $(document).on('change','.selectpicker',function() {
      $(this).next().blur();
    });
  }

}
