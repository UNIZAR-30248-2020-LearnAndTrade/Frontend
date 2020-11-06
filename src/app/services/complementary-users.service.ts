import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplementaryUsersService {
  public urlGetComplementaryUsers: string;

  constructor(private http: HttpClient) {
    this.urlGetComplementaryUsers = 'https://learn-and-trade-backend.herokuapp.com/user/getcomplementaryusers';
   }

   getComplementaryUsers(username): Observable<any> {
    console.log("En get Complementary");
    let params = new HttpParams().set("username",username); //Create new HttpParams
    
    return this.http.get(this.urlGetComplementaryUsers, { params:params });
  }
}
