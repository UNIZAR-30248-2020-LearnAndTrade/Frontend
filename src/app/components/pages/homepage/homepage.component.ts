import { Component, OnInit } from '@angular/core';
import { ComplementaryUsersService } from '../../../services/complementary-users.service';
import { GetUserService } from '../../../services/get-user.service';
import { EditProfileService } from '../../../services/edit-profile.service';
import { LoginService } from '../../../services/login.service';
import { user } from 'src/app/models/user';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class homepageComponent implements OnInit {

  public usuarios: user[];
  public miPerfil: user;
  public knowledgeList: string[];
  public elegidos: string[];
  public status: string; // Status del sistema
  public selectedInterest: string;
  public selectedKnowledge: string;
  public autenticado: boolean;



  constructor(private ComplementaryUsersService: ComplementaryUsersService, private UserService: GetUserService,
    private EditProfile: EditProfileService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.miPerfil = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      birthdate: new Date
    };
    this.knowledgeList = ['Tecnología', 'Música', 'Bases de datos', 'Angular', 'Piano', 'Edición de video', 'Cocina'];
    this.autenticado = this.loginService.isAuthenticated(); // Comprobar si está autentificado
    if(this.autenticado){
      this.getMyProfile();
    }


  }

  getComplementary(usuario){

    this.ComplementaryUsersService.getComplementaryUsers(usuario).subscribe(
      response => {
        console.log(response);
        this.usuarios = response
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
        if(interest == this.miPerfil.interests[i]){
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
    this.EditProfile.editProfile(this.miPerfil).subscribe(
      response => {
        // Si el proceso es satisfactorio, redirige a la ventana de gestion-encuestas-admin.
        window.location.href = "homepage";
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

}
