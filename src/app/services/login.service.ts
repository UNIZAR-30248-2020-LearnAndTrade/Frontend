import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public urlLogin: string;

  constructor(private http: HttpClient) {
    this.urlLogin = 'http://localhost:8080/user/login';
   }

  validate(email, password){
    console.log("EN SERVICIO");
    let params = new HttpParams().set("username",email).append("password", password);
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

  //Devuelve true sii hay un usuario en sesión
  public isAuthenticated() : boolean {

    let userData = localStorage.getItem('userJSON');

    let aux = JSON.parse(userData);

    if(userData && JSON.parse(userData)){
      return true;
    }
    else{
      return false;
    }

  }

  public cerrarSesion(){
    localStorage.removeItem('userJSON');
    console.log(localStorage.getItem('userJSON'));
    window.location.href = "/login";
  }
}
