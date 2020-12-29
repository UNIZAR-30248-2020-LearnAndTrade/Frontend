import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../../services/login.service';



@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  public error: boolean = false;


  email = new FormControl('');
  password = new FormControl('');
  passwordrepeat = new FormControl('');


  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  change(){
    this.loginService.validate(this.email.value, this.password.value)
      .subscribe((response) => {
        this.error = false;

        //SERVICIO CAMBIAR CONTRASEÑA
        this.loginService.validate(this.email.value, this.passwordrepeat.value)
          .subscribe((response) => {
            //OK Y REDIRECT AL HOME
            window.location.href = "/home";
          },
          (err) => {
            console.log(err.status);
            this.error = true;
          });



        

      },
      (err) => {
        console.log(err.status);
        this.error = true;
      });
  }

}
