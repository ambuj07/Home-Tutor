import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;


@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css']
})
export class WhyUsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private http: HttpClient) { }
  data :any;
  getData(){
    this.http.get(environment.baseUrl+'/text/?type=WHY_HANSA')
      .subscribe(res => {
        console.log(res);
        this.data = [res];
    });
  }

  ngOnInit() {
    this.getData();
    $(document).ready(function() {
      $("#viewTabName").html("WHY US");
      $(".sidenav a").removeClass("active");
      $(".whyUsA").addClass("active");
    });
  }

}
