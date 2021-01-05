import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {theme} from "../models/theme";

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://learn-and-trade-backend.herokuapp.com/user';
  }

  public search(themes: string[], interests: boolean) {
    let params = new HttpParams().set("themes", this.parserThemeArray(themes))
      .set("interests", JSON.stringify(interests));
    return this.http.get(this.url + '/getusersbylist', { params: params });
  }

  parserThemeArray(themeList: string[]) {
    let stringReturn: string = "";
    for (let index in themeList) {
      if (stringReturn == "") {
        stringReturn = themeList[index];
      } else {
        stringReturn += "," + themeList[index];
      }
    }
    return stringReturn
  }

}
