import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class CanonicalService {

  constructor(@Inject(DOCUMENT) private dom) { }

  createCanonicalURL() {
    let link: HTMLLinkElement = this.dom.getElementById("canonicalId");
    link.setAttribute('href', this.dom.URL);
  }
}
