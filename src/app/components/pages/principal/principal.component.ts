import { Component, OnInit } from '@angular/core';
import { ComplementaryUsersService } from '../../../services/complementary-users.service';
import { GetUserService } from '../../../services/get-user.service';
import { user } from 'src/app/models/user';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public usuarios: user[];
  public miPerfil: user;
  public knowledgeList: String[];
  public status: string; // Status del sistema


  constructor(private ComplementaryUsersService: ComplementaryUsersService, private UserService: GetUserService) { }

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
        this.getComplementary(this.miPerfil);
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

}
