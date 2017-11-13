import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class PlanningService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        let creds = JSON.stringify({username: username, password: password});
        return  this.http.post('http://localhost:8080/api/auth', creds, this.basic_header())
            .map((response: Response) => {
                return response.json();
            });
    }

    logout() {
        localStorage.removeItem('token');
    }

    
}