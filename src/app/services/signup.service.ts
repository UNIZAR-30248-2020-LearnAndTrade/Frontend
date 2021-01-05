import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://learn-and-trade-backend.herokuapp.com/user/signin';

  }

  createUser(user): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url, JSON.stringify(user), {headers: headers});
  }
}