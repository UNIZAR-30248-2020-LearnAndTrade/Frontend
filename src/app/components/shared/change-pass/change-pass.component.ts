import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { EditProfileService } from '../../../services/edit-profile.service';
import { user } from 'src/app/models/user';
import * as MD5 from 'md5';



@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  public error: boolean = false;
  public editUser: user;

  email = new FormControl('');
  password = new FormControl('');
  passwordrepeat = new FormControl('');


  constructor(private loginService: LoginService, private EditProfileService:EditProfileService) { }

  ngOnInit(): void {
  }

  change(){
    this.loginService.validate(this.email.value, MD5(this.password.value))
      .subscribe((response) => {
        //SERVICIO CAMBIAR CONTRASEÑA
        this.editUser = JSON.parse(localStorage.getItem('userJSON'));
        this.editUser.password = MD5(this.passwordrepeat);
        this.EditProfileService.editProfile(this.editUser)
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
