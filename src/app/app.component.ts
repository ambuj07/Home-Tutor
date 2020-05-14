import { Component } from '@angular/core';
import {Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SeoService} from '../app/seo.service';
import 'rxjs/add/operator/filter'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Home Tutor, Online Trainer, Institutes, and Faculties. Our online tutoring platform makes connecting with students simple, convenient, and flexible. Find online tutoring opportunities. Apply now and earn extra money working part-time from home.';
  constructor(titleService: Title, router: Router,activatedRoute: ActivatedRoute,_seoService:SeoService) {
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        if(event['title'] != undefined){
          this.pageTitle = this.pageTitle + ' ' + event['title'] + ' ' + event['description'];
          _seoService.updateTitle(event['title']);
          _seoService.updateKeywords(event['keywords']);
          _seoService.updateDescription(event['description']);
          _seoService.updateOgUrl(event['ogUrl']);
          _seoService.updateOgImage(event['ogImage']);
          _seoService.updateOgTitle(event['title']);
          _seoService.updateOgDesc(event['description']);
        }
      }); 
  }
}
