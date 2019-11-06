import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.css']
})
export class TncComponent implements OnInit {

  constructor( private route: ActivatedRoute, private http: HttpClient) { }
  data :any;
  tncType : any;
  getData(){
    let tncFor = "TNC";
    this.route.params.subscribe(params => {
      this.tncType = params["type"];
    });
    if(this.tncType == 'tutor'){
      tncFor = "TNC_FOR_TUTOR";
    }else if(this.tncType == 'student'){
      tncFor = "TNC_FOR_STUDENT";
    }
    this.http.get(environment.baseUrl+'/text/?type='+tncFor)
      .subscribe(res => {
        console.log(res);
        this.data = [res];
    });
  }

  ngOnInit() {
    this.getData();
    $("#viewTabName").html("Terms and Conditions");
  }

}
