import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import {chatRoom} from "../../../models/chatRoom";
import {chatMessage} from "../../../models/chatMessage";
import {user} from "../../../models/user";
import {ReservationService} from "../../../services/reservation.service";
import {GetUserService} from "../../../services/get-user.service";
import {LoginService} from "../../../services/login.service";



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public user: user;
  public autenticado: boolean;

  message;
  rooms: chatRoom[];
  listaMessages: chatMessage[];

  conversacionActiva = -1;

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(private chatService: ChatService, private UserService: GetUserService,
              private loginService: LoginService) {
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

    this.autenticado = this.loginService.isAuthenticated(); // Comprobar si está autentificado
    if (this.autenticado) {
      this.getMyProfile();
      this.connect(this.user.username);
      this.getRooms();

    } else {
      window.location.href = "/login";
    }
  }
  getMyProfile(){
    this.user = JSON.parse(localStorage.getItem('userJSON'));
    console.log(this.user);
    this.UserService.getUser(this.user.username).subscribe(
      response => {
        this.user = response;
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          //this.status = 'error';
        }
      }
    );
  }

  connect(username){
    this.chatService._connect(username);
  }

  disconnect(){
    this.chatService._disconnect();
  }

  sendMessage(){

    let newMessage: chatMessage = {
      senderId: this.user.username,
      recipientId: this.rooms[this.conversacionActiva].recipientId,
      senderName: this.user.username,
      recipientName: this.rooms[this.conversacionActiva].recipientId,
      content: this.message,
      timestamp: new Date()
    }

    this.chatService._send(newMessage);
    this.listaMessages.push(newMessage);
  }

  contar() {
    for (let i = 0; i < this.rooms.length; i++) {
      this.chatService.countMessages(this.rooms[i].recipientId, this.user.username).subscribe(count => {
        this.rooms[i].messagesToRead = <number>count;
      });
    }
  }

  cambiarChat(index) {
    this.conversacionActiva = index;
    this.chatService.seeMessages(this.user.username, this.rooms[index].recipientId).subscribe(result => {
      this.listaMessages = <chatMessage[]>result;
      this.listaMessages = this.listaMessages.map(function(message) {
        message.timestamp = new Date(message.timestamp);
        return message;
      });
      console.log(this.listaMessages);
    });
  }

  getRooms() {
    this.chatService.getRooms(this.user.username).subscribe(result => {
      this.rooms = <chatRoom[]>result;
      console.log(this.rooms);
      this.contar();
    });
  }

}



