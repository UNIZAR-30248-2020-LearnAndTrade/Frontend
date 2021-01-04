import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { LoginService } from '../../../services/login.service';
import {user} from "../../../models/user";
import {GetUserService} from "../../../services/get-user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public user: user;
  public autenticado:boolean;

  constructor(private loginService: LoginService, private UserService: GetUserService, private router: Router){
  }

  ngOnInit(): void {
    this.user = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      birthdate: new Date,
      imageUrl: ''
    };
    this.autenticado = this.loginService.isAuthenticated();
    if (this.autenticado) {
      this.getMyProfile();
    }
  }

  getMyProfile(){
    this.user = JSON.parse(localStorage.getItem('userJSON'));
    this.UserService.getUser(this.user.username).subscribe(
      response => {
        this.user = response;
      });
  }

  cerrarsesion(){
    console.log("ENTRA A CERRAR")
    this.loginService.cerrarSesion();

    //window.location.href = "homepage";
  }

  goToCalendar() {
    this.router.navigate(["/calendar"]);
  }

  goToPerfil() {
    this.router.navigate(["/profile/" + this.user.username]);
  }

  goToSearch() {
    this.router.navigate(["/search"]);
  }

  goToChat() {
    this.router.navigate(["/chat"]);
  }

}
