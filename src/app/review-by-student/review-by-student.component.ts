import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-review-by-student',
  templateUrl: './review-by-student.component.html',
  styleUrls: ['./review-by-student.component.css']
})
export class ReviewByStudentComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {

    var baseUrl = environment.baseUrl;

    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if(id == null || id == "" || id == undefined){
      window.location.href = '/login'
    }
    $(document).ready(function(){
      $("#viewTabName").text("Review A Teacher");
      $(".sidenav a").removeClass("active");
      $(".review").addClass("active");
       /* 1. Visualizing things on Hover - See next part for action on click */
      $('#stars li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
      
        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
          if (e < onStar) {
            $(this).addClass('hover');
          }
          else {
            $(this).removeClass('hover');
          }
        });
        
      }).on('mouseout', function(){
        $(this).parent().children('li.star').each(function(e){
          $(this).removeClass('hover');
        });
      });
      
      
      /* 2. Action to perform on click */
      $('#stars li').on('click', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');
        
        for (var i = 0; i < stars.length; i++) {
          $(stars[i]).removeClass('selected');
        }
        
        for (var i = 0; i < onStar; i++) {
          $(stars[i]).addClass('selected');
        }
      });

      $.get(baseUrl+"/student/"+id,function(data){
        $(".student-name").val(data.name);
        $(".student-number").val(data.mobile);
      })
    });
  }

}
