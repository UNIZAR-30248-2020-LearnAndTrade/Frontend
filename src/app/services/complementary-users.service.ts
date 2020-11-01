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

   getComplementaryUsers(usuario): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let user = JSON.stringify({ usuario });
    let body = new HttpParams;
    return this.http.get(this.urlGetComplementaryUsers + encodeURIComponent(user));
  }
}
