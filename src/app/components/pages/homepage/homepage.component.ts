import { Component, OnInit } from '@angular/core';
import { ComplementaryUsersService } from '../../../services/complementary-users.service';
import { GetUserService } from '../../../services/get-user.service';
import { EditProfileService } from '../../../services/edit-profile.service';
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
  public selected: string;


  constructor(private ComplementaryUsersService: ComplementaryUsersService, private UserService: GetUserService, private EditProfile: EditProfileService) { }

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
    let compatibles = new Array;
    let knowList = ['Deporte', 'Tecnologia', 'Musica', 'Cocina', 'Literatura'];
    this.knowledgeList = knowList;
    let usuario1 = {
      name: 'Fernando',
      interests: ['Música'],
      knowledge: ['Deporte']
    };
    compatibles[0] = usuario1;

    usuario1 = {
      name: 'Bea',
      interests: ['Programación'],
      knowledge: ['Deporte']
    };
    compatibles[1] = usuario1;

    usuario1 = {
      name: 'Ruth',
      interests: ['Tecnología'],
      knowledge: ['Literatura']
    };
    compatibles[2] = usuario1;

    usuario1 = {
      name: 'Luis',
      interests: ['Deporte'],
      knowledge: ['Cocina']
    };
    compatibles[3] = usuario1;

    usuario1 = {
      name: 'Fernando',
      interests: ['Música'],
      knowledge: ['Deporte']
    };
    compatibles[4] = usuario1;

    usuario1 = {
      name: 'Bea',
      interests: ['Programación'],
      knowledge: ['Deporte']
    };
    compatibles[5] = usuario1;

    usuario1 = {
      name: 'Ruth',
      interests: ['Tecnología'],
      knowledge: ['Literatura']
    };
    compatibles[6] = usuario1;

    this.usuarios = compatibles;

    this.getMyProfile();
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

    this.UserService.getUser('fernando').subscribe(
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
      for(let i=0; i<this.elegidos.length; i++){
        if(interest == this.elegidos[i]){
          esRepetido = true;
        }
      }
      if(!esRepetido){
        console.log("Es nuevo, añadir");
        this.elegidos.push(interest);
        this.miPerfil.interests = this.elegidos;
      }
      console.log("DESPUES")
      console.log(this.elegidos);
    }
    else{
      console.log("ANTES:");
      console.log(interest);
    }
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
