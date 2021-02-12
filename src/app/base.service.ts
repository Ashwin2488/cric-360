import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  constructor(
    private http: HttpClient
  ) {}

  doGet(url: string, options?): Observable<any> {
    return this.http.get<any>(url, options);
  }

  doPost(url, payload, options?): Observable<any> {
    return this.http.post(url, payload, options);
  }

  doPut(url, payload, options?): Observable<any> {
    return this.http.put(url, payload, options);
  }

  doDelete(url, options?): Observable<any> {
    return this.http.delete(url, options);
  }
}
