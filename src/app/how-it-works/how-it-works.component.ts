import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  constructor( private route: ActivatedRoute, private http: HttpClient) { }
  data :any;
  type : any;
  getData(){
    let how = "HANSA_FOR_TUTOR";
    this.route.params.subscribe(params => {
      this.type = params["type"];
    });
    if(this.type == 'student'){
      how = "HANSA_FOR_STUDENT";
    }
    this.http.get(environment.baseUrl+'/text/?type='+how)
      .subscribe(res => {
        console.log(res);
        this.data = [res];
    });
  }

  ngOnInit() {
    this.getData();
    $("#viewTabName").html("How It Works");
  }

}
