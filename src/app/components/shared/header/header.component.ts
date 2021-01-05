import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from "@angular/router";
import { LoginService } from '../../../services/login.service';
import {user} from "../../../models/user";
import {GetUserService} from "../../../services/get-user.service";
import {ChatService} from "../../../services/chat.service";
import {Observable, Subscriber} from "rxjs";
import {chatMessage} from "../../../models/chatMessage";
import {RateModalComponent} from "../../shared/rate-modal/rate-modal.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public user: user;
  public autenticado:boolean;

  newMessages: boolean = false;

  messageObservable: Observable<chatMessage> = undefined;

  constructor(private loginService: LoginService, private UserService: GetUserService,
              private router: Router, private chatService: ChatService, public dialog: MatDialog) {
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
      this.connectChat();
      this.countAnyMessages();
    }
  }

  getMyProfile(){
    this.user = JSON.parse(localStorage.getItem('userJSON'));
    this.UserService.getUser(this.user.username).subscribe(
      response => {
        this.user = response;
      });
  }

  connectChat(){
    if (this.messageObservable == undefined) {
      this.messageObservable = this.chatService.getObserverHeader();
      this.messageObservable.subscribe((msg) => {
        console.log("MENSAJE EN HEADER");
        this.countAnyMessages();
      });
      this.chatService._connect(this.user.username);
    }
  }

  public countAnyMessages() {
    this.chatService.countAnyMessages(this.user.username).subscribe(count => {
      this.newMessages = count > 0;
      console.log(this.newMessages);
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
