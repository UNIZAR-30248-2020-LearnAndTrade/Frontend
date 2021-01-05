import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import * as MD5 from 'md5';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error: boolean = false;


  email = new FormControl('');
  password = new FormControl('');

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.email.value);
    console.log(this.password.value);
    this.loginService.validate(this.email.value, MD5(this.password.value))
      .subscribe((response) => {
        this.error = false;
        // this.usuario = response[0];
        console.log("respuesta de LOGIN: ");
        console.log(response);
        //window.location.href = "/home";
        console.log("respuesta de LOGIN: ");
        this.loginService.setUserInfo(response);
        window.location.href = "/home";

      },
      (err) => {
        console.log(err.status);
        this.error = true;
      });
  }

}
