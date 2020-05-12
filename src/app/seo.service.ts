import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }


  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }

  updateKeywords(keywords: string) {
    this.meta.updateTag({ name: 'keywords', content: keywords })
  }
  
  updateOgUrl(url: string) {
    this.meta.updateTag({ property: 'og:url', content: url })
  }

  updateOgImage(ogimage: string) {
    this.meta.updateTag({ property: 'og:image', content: ogimage })
  }

  updateOgTitle(ogtitle: string) {
    this.meta.updateTag({ property: 'og:title', content: ogtitle })
  }

  updateOgDesc(ogdesc: string) {
    this.meta.updateTag({ property: 'og:description', content: ogdesc })
  }

}
