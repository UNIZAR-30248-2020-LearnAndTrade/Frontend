import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
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

    this.usuarios = compatibles

    let miPerfil = {
      username: 'ferbercedo',
      email: 'fernando@gmail.com',
      interests: ['Música', 'Literatura', 'gestión'],
      knowledge: ['Deporte', 'Programación'],
      name: 'Fernando',
      surname: 'Bercedo',
      birthdate: new Date
    };

    this.miPerfil = miPerfil
  }

}
