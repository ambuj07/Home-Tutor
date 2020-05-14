import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-nearby-tutors',
  templateUrl: './nearby-tutors.component.html',
  styleUrls: ['./nearby-tutors.component.css']
})
export class NearbyTutorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      //general function
      var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
      for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
          if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
      }
      
      $(document).on('click','.btn-page',function(e){
        e.preventDefault();
        var pageNumber = $(this).text();
        getPageData(parseInt(pageNumber)-1);
      });
      $(document).on('click','.btn-prev-page',function(e){
        e.preventDefault();
        var pageNumber = $('.active').text();
        getPageData(parseInt(pageNumber)-2);
      });
      $(document).on('click','.btn-next-page',function(e){
        e.preventDefault();
        var pageNumber = $('.active').text();
        getPageData(parseInt(pageNumber));
      });
      getPageData(0);
      function getPageData(pageNumber){
        var zip = getUrlParameter('zip');
        var classSel = getUrlParameter('class');
        $.ajax({
          type: 'GET',
          url: baseUrl+"/search?zip="+zip+"&stdClass="+classSel,
          //dataType: "json",
          contentType: "application/json;charset=utf-8",
          success: function(resultData) { 
              console.log(resultData);
              // var len = resultData.contents.length;
              // var isNext = resultData.next;
              // var pageSize = resultData.size;
              // var page = (resultData.page +1);
              var html = '';
              if(resultData.length > 0){
                for(var i = 0; i < resultData.length ; i++){
                  html += '<div class="col-md-3 col-xs-1">';
                  html += '<div class="tutorgrid">';
                  html += '<div class="text-centered">';
                  html += '<img src="/assets/userIcon.png" alt="hansa userIcon" width="36px">';
                  html += '<div class="profile-name">'+resultData[i].name+'</div>'
                  html += ' <div class="profile-heading">Math Teacher</div>'
                  html += '<div class="experiance">('+resultData[i].qualification+')</div>';
                  html += '<a title="hansa tutor" href="javascript:void(0)" class="btn btn-primary btn-details">Show Details</a>';
                  html += '</div>';
                  html += '</div>';
                  html += '</div>';
                  $("#tutorGrid").html(html);
                }
              }
              // if(pageSize > 1){
              //   var htmlPage = '';
              //   htmlPage +='<ul class="pagination">'
              //   htmlPage += '<li class="page-item">';
              //   htmlPage += '<a title="hansa tutor" class="page-link btn-prev-page" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span>';
              //   htmlPage += '<span class="sr-only">Previous</span></a>';
              //   htmlPage += '</li>';
              //   for(var i=1; i <= pageSize; i++){
              //     htmlPage += '<li class="page-item"><a title="hansa tutor" class="page-link btn-page" id="page_'+i+'" href="#">'+i+'</a></li>';
              //   }
              //   htmlPage += '<li class="page-item">';
              //   htmlPage += '<a title="hansa tutor" class="page-link btn-next-page" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span>';
              //   htmlPage += '<span class="sr-only">Next</span></a>';
              //   htmlPage += '</li>';
              //   htmlPage +='</ul>'
              //   $("#pagination").html(htmlPage);
              //   $("#page_"+page).closest('li').addClass("active");
              // }  
              // if(pageNumber == 0){
              //   $(".btn-prev-page").closest('li').addClass('disabled');
              // }
              // if(!isNext){
              //   $(".btn-next-page").closest('li').addClass('disabled');
              // } 
            }
          });
        }
    }

  }
