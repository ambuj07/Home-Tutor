import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private http: HttpClient) { }
  data :any;
  getData(){
    this.http.get(environment.baseUrl+'/text/?type=ABOUT_HANSA')
      .subscribe(res => {
        console.log(res);
        this.data = [res];
    });
  }

  ngOnInit() {
    this.getData();
    $(document).ready(function(){
      $("#viewTabName").text("About Us"); 
      $(".sidenav a").removeClass("active");
      $(".aboutUsA").addClass("active");
    });
  }

}
