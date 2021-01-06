import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {theme} from "../models/theme";

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'https://learn-and-trade-backend.herokuapp.com/';
  }

  public search(theme: string) : Observable<any>{
    let params = new HttpParams().set("themeName",theme);
    return this.http.get(this.url + 'reservation/getthemeranking', { params: params });
  }
}
