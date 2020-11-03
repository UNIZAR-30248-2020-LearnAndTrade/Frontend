import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://learn-and-trade-backend.herokuapp.com/user/updateuser';

  }

  editProfile(user): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(headers);
    return this.http.post(this.url, JSON.stringify(user), {headers: headers});
  }
}
