import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public urlLogin: string;

  constructor(private http: HttpClient) {
    this.urlLogin = 'https://learn-and-trade-backend.herokuapp.com/user/login';
   }

  validate(email, password){
    console.log("EN SERVICIO");
    let params = new HttpParams().set("name",email).append("password", password);
    console.log(params);
    return this.http.get(this.urlLogin, {params: params});
  }

  //Almacena localmente la información del usuario que se le pasa como parámetro
  public setUserInfo(user){
    console.log("START function setUserInfo");
    console.log(user);

    localStorage.setItem('userJSON', JSON.stringify(user));
   
    console.log(user);
  }
}
