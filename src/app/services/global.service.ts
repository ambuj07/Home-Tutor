import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalService {
  baseUrl = '';

  constructor(protected http: HttpClient){}

  submitForgotPwd(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '');
  }
}
