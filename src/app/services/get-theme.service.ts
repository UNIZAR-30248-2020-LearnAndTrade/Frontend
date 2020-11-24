import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetThemeService {
  public urlGetTheme: string;

  constructor(private http: HttpClient) {
    this.urlGetTheme = 'https://learn-and-trade-backend.herokuapp.com/theme/getthemes';
   }

   getTheme(): Observable<any> {
    return this.http.get(this.urlGetTheme);
  }
}
