import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SeoService } from '../app/seo.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Home Tutor, Online Trainer, Institutes, and Faculties. Our online tutoring platform makes connecting with students simple, convenient, and flexible. Find online tutoring opportunities. Apply now and earn extra money working part-time from home.';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _seoService: SeoService) { }

  ngOnInit() {
    this.router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route: any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route: any) => route.outlet === 'primary')
      .mergeMap((route: any) => route.data)
      .subscribe((event: any) => {
        if (event['title'] != undefined) {
          this.pageTitle = this.pageTitle + ' ' + event['title'] + ' ' + event['description'];
          this._seoService.updateTitle(event['title']);
          this._seoService.updateKeywords(event['keywords']);
          this._seoService.updateDescription(event['description']);
          this._seoService.updateOgUrl(event['ogUrl']);
          this._seoService.updateOgImage(event['ogImage']);
          this._seoService.updateOgTitle(event['title']);
          this._seoService.updateOgDesc(event['description']);
        }
      });
  }
}
