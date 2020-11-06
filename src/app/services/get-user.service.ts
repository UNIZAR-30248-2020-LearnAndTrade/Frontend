import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  public urlGetUser: string;

  constructor(private http: HttpClient) {
    this.urlGetUser = 'https://learn-and-trade-backend.herokuapp.com/user/getuser';
   }

   getUser(username): Observable<any> {
    //let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams().set("username",username); //Create new HttpParams
    
    return this.http.get(this.urlGetUser, { params:params });
  }
}
