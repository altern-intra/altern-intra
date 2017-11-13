import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class HttpInterceptor {

  constructor(
    private http: Http,
  ) {}

  private headers() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Origin', '*');
      let currentUser = JSON.parse(localStorage.getItem('user_infos'));
      if (currentUser && currentUser.apikey) {
          headers.append('Authorization', currentUser.apikey);
      }
      return new RequestOptions({ headers: headers});
  }

  get(url: string) {
    this.headers();
    return this.http.get(url, this.headers());
  }

  post(url: string, data: any) {
    this.headers();
    return this.http.post(url, data, this.headers());
  }

  put(url: string, data: any) {
    this.headers();
    return this.http.put(url, data, this.headers());
  }

  delete(url: string, body: any) {
    this.headers();
    return this.http.delete(url, this.headers());
  }
}
