import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public autenticado:boolean;

  constructor(private loginService: LoginService){
  }

  ngOnInit(): void {
    this.autenticado = this.loginService.isAuthenticated();
  }

  cerrarsesion(){
    console.log("ENTRA A CERRAR")
    this.loginService.cerrarSesion();

    //window.location.href = "homepage";
  }

  goToCalendar() {
    window.location.href = "/calendar";
  }

}
