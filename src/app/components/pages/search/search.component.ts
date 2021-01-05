import { Component, OnInit } from '@angular/core';
import { GetThemeService } from '../../../services/get-theme.service';
import {user} from "../../../models/user";
import {LoginService} from "../../../services/login.service";
import {SearchUsersService} from "../../../services/search-users.service";
import {theme} from "../../../models/theme";
import {ReservationModalComponent} from "../../shared/reservation-modal/reservation-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ReservationService} from "../../../services/reservation.service";
import {Router} from "@angular/router";
import {GetUserService} from "../../../services/get-user.service";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public usuarios: user[];
  public miPerfil: user;

  public themesList: theme[] = [];
  public interestsList: theme[] = [];
  public knowledgesList: theme[] = [];
  public selectedInterest: theme;
  public selectedKnowledge: theme;

  public selectingInterest: boolean = true;

  public autenticado: boolean;

  constructor(private loginService: LoginService, private ThemeService: GetThemeService,
              private searchUsersService: SearchUsersService, public dialog: MatDialog,
              private reservationService: ReservationService, private router: Router,
              private UserService: GetUserService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.miPerfil = {
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
    if(this.autenticado){
      this.getThemes();
      this.getMyProfile();
    } else {
      window.location.href = "/login";
    }

  }

  getThemes(){
    this.ThemeService.getTheme().subscribe(
      response => {
        this.themesList = response;
        console.log(this.themesList);
      });
  }

  getMyProfile(){
    this.miPerfil = JSON.parse(localStorage.getItem('userJSON'));
    console.log(this.miPerfil);
    this.UserService.getUser(this.miPerfil.username).subscribe(
      response => {
        this.miPerfil = response;
      });

  }

  addInterest(interest){
    let esRepetido = false;
    if(interest){
      for(let i=0; i < this.interestsList.length; i++){
        if(interest.name == this.interestsList[i].name){
          esRepetido = true;
        }
      }
      if(!esRepetido){
        this.interestsList.push(interest);
      }
    }
  }

  addKnowledge(knowledge){
    let esRepetido = false;
    if(knowledge){
      for(let i=0; i < this.knowledgesList.length; i++){
        if(knowledge.name == this.knowledgesList[i].name){
          esRepetido = true;
        }
      }
      if(!esRepetido){
        this.knowledgesList.push(knowledge);
      }
    }

  }

  deleteInterest(interest){
    let indice = this.interestsList.indexOf(interest);
    this.interestsList.splice(indice,1);
  }

  deleteKnowledge(knowledge){
    let indice = this.knowledgesList.indexOf(knowledge);
    this.knowledgesList.splice(indice,1);
  }

  changeSelected(bool) {
    this.selectingInterest = bool;
  }

  buscar() {
    if (this.selectingInterest) {

      this.searchUsersService.search(this.interestsList.map(function (theme) {
        return theme.name;
      }), true).subscribe( result => {
        this.usuarios = <any> result;
        this.filtrarMismoUsuario();
      });
    } else {

      this.searchUsersService.search(this.knowledgesList.map(function (theme) {
        return theme.name;
      }), false).subscribe( result => {
        this.usuarios = <any> result;
        this.filtrarMismoUsuario();
      });
    }
  }

  filtrarMismoUsuario() {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].name == this.miPerfil.name) {
        this.usuarios.splice(i,1);
      }
    }
  }

  goToProfile(username) {
    this.router.navigate(["/profile/" + username]);
  }

  openModalNewReservation(user) {
    this.reservationService.setComplementaryUser(user);
    this.dialog.open(ReservationModalComponent,{
      width: '70%',
      height: '85%'
    });
  }

  newChat(usuario: user) {
    this.chatService.createRoom(this.miPerfil.username, usuario.username).subscribe( result => {
      console.log(result);
      this.goToChat();
    })
  }

  goToChat() {
    this.router.navigate(["/chat"]);
  }

}
