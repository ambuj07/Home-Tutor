import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor( private route: ActivatedRoute, private http: HttpClient) { }
  data :any;
  getData(){
    this.http.get(environment.baseUrl+'/text/?type=PRIVACY')
      .subscribe(res => {
        console.log(res);
        this.data = [res];
    });
  }

  ngOnInit() {
    this.getData();
    $(document).ready(function(){
      $("#viewTabName").html("PRIVACY POLICY");
      $(".sidenav a").removeClass("active");
      $(".policyA").addClass("active");
    });
  }

}
