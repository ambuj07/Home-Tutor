import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }


  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url })
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }
  
  updateOgImage(ogimage: string) {
    this.meta.updateTag({ property: 'og:image', content: ogimage })
  }

  updateOgTitle(ogtitle: string) {
    this.meta.updateTag({ property: 'og:title', content: ogtitle })
  }

  updateOgDesc(ogdesc: string) {
    this.meta.updateTag({ property: 'og:title', content: ogdesc })
  }

}
