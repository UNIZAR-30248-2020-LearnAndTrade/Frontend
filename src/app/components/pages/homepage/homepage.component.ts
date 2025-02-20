import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import { ComplementaryUsersService } from '../../../services/complementary-users.service';
import { MatDialog } from '@angular/material/dialog';
import { GetUserService } from '../../../services/get-user.service';
import { EditProfileService } from '../../../services/edit-profile.service';
import { LoginService } from '../../../services/login.service';
import { GetThemeService } from '../../../services/get-theme.service';
import { ReservationService } from "../../../services/reservation.service";
import { user } from 'src/app/models/user';
import { theme } from 'src/app/models/theme';
import { ReservationModalComponent } from "../../shared/reservation-modal/reservation-modal.component";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


import { GetReservationModalComponent } from "../../shared/get-reservation-modal/get-reservation-modal.component";
import { ChangePassComponent } from '../../shared/change-pass/change-pass.component';


import { SearchUsersService } from "../../../services/search-users.service";
import {ChatService} from "../../../services/chat.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class homepageComponent implements OnInit {

  emailForm: FormGroup;

  public usuarios: user[];
  public miPerfil: user;
  public knowledgeList: theme[];
  public elegidos: theme[];
  public status: string; // Status del sistema
  public selectedInterest: theme;
  public selectedKnowledge: theme;
  public autenticado: boolean;

  constructor(private formBuilder: FormBuilder,private ComplementaryUsersService: ComplementaryUsersService, private UserService: GetUserService,
    private EditProfile: EditProfileService, private loginService: LoginService, private ThemeService: GetThemeService,
    public dialog: MatDialog, private reservationService: ReservationService, private router: Router,
              private chatService: ChatService) { }

  ngOnInit(): void {

    this.miPerfil = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      birthDate: new Date,
      password:'',
      imageUrl:''

    };

    this.emailForm = this.formBuilder.group({
      email:[this.miPerfil.email]
    });

    this.autenticado = this.loginService.isAuthenticated(); // Comprobar si está autentificado
    if(this.autenticado){
      this.getThemes();
      this.getMyProfile();
    }
    else{
      window.location.href = "/login";
    }

  }

  getComplementary(usuario){

    this.ComplementaryUsersService.getComplementaryUsers(usuario).subscribe(
      response => {
        console.log(response);
        this.usuarios = response;
        this.filtrarMismoUsuario();
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getThemes(){
    this.ThemeService.getTheme().subscribe(
      response => {
        this.knowledgeList = response;
        console.log(this.knowledgeList);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getMyProfile(){
    this.miPerfil = JSON.parse(localStorage.getItem('userJSON'));
    console.log(this.miPerfil);
    this.UserService.getUser(this.miPerfil.username).subscribe(
      response => {
        this.miPerfil = response;
        this.elegidos = this.miPerfil.interests;
        console.log(response);
        this.emailForm = this.formBuilder.group({
          email:[this.miPerfil.email]
        });
        this.getComplementary(this.miPerfil.username);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );

  }

  addInterest(interest){
    let esRepetido = false;
    if(interest){
      for(let i=0; i<this.miPerfil.interests.length; i++){
        if(interest.name == this.miPerfil.interests[i].name){
          esRepetido = true;
        }
      }
      if(!esRepetido){
        console.log("Es nuevo, añadir");
        this.miPerfil.interests.push(interest);
      }
      console.log("DESPUES")
      console.log(this.elegidos);
    }
    else{
      console.log("ANTES:");
      console.log(interest);
    }
  }

  addKnowledge(knowledge){
    let esRepetido = false;
    if(knowledge){
      for(let i=0; i<this.miPerfil.knowledges.length; i++){
        if(knowledge == this.miPerfil.knowledges[i]){
          esRepetido = true;
        }
      }
      if(!esRepetido){
        console.log("Es nuevo, añadir");
        this.miPerfil.knowledges.push(knowledge);
      }
      console.log("DESPUES")
      console.log(this.miPerfil.knowledges);
    }
    else{
      console.log("ANTES:");
      console.log(knowledge);
    }
  }

  deleteInterest(interest){
    let indice = this.miPerfil.interests.indexOf(interest);
    this.miPerfil.interests.splice(indice,1);
  }

  deleteKnowledge(knowledge){
    let indice = this.miPerfil.knowledges.indexOf(knowledge);
    this.miPerfil.knowledges.splice(indice,1);
  }

  editProfile(){
    this.miPerfil.email = this.emailForm.controls['email'].value
    this.EditProfile.editProfile(this.miPerfil).subscribe(
      response => {

        localStorage.setItem('userJSON', JSON.stringify(this.miPerfil));

        console.log(response);

        this.dialog.open(DialogConfirmDialog);
      },
      error => {
        console.log(error);
        this.dialog.open(DialogErrorEdit);
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  changePass(){
    this.dialog.open(ChangePassComponent);
  }

  openModalNewReservation(user) {
    this.reservationService.setComplementaryUser(user);
    this.dialog.open(ReservationModalComponent,{
      width: '70%',
      height: '85%'
    });
  }

  goToProfile(username) {
    this.router.navigate(["/profile/" + username]);
  }

  filtrarMismoUsuario() {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].name == this.miPerfil.name) {
        this.usuarios.splice(i,1);
      }
    }
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

@Component({
  selector: 'app-dialogConfirmEdit',
  templateUrl: 'dialogConfirmEdit.html',
})
export class DialogConfirmDialog {
  redirectHome(){
    window.location.href = "homepage";
  }

}

@Component({
  selector: 'app-dialogErrorEdit',
  templateUrl: 'dialogErrorEdit.html',
})
export class DialogErrorEdit {

  redirectHome(){
    window.location.href = "homepage";
  }
}
