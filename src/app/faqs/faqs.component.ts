import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private http: HttpClient) { }
  faqType : string = "";
  faqs :any;
  getFaqType(){
    this.route.params.subscribe(params => {
      this.faqType = params["type"];
    });
    this.http.get(environment.baseUrl+'/faq/?category='+this.faqType.toUpperCase())
      .subscribe(faqs => {
        console.log(faqs);
        this.faqs = faqs;
    });
  }

  ngOnInit() {
    this.getFaqType();
    console.log(this.faqType+" joijo");
    $("#viewTabName").html(this.faqType.toUpperCase()+" FAQs ?");
  }

}
