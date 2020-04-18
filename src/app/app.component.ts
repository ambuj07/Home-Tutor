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
        _seoService.updateTitle(event['title']);
        _seoService.updateDescription(event['description']);
        _seoService.updateOgUrl(event['ogUrl']);
        _seoService.updateOgImage(event['ogImage']);
        _seoService.updateOgTitle(event['title']);
        _seoService.updateOgTitle(event['description']);
        //Updating Description tag dynamically with title
      }); 
  }
}
