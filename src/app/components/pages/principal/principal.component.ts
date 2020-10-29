import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public usuarios: user[];

  constructor() { }

  ngOnInit(): void {
    let compatibles = [];

    let usuario1 = {
      nombre: 'Fernando',
      interes: 'Música',
      conocimiento: 'Deporte'
    };
    compatibles[0] = usuario1;

    usuario1 = {
      nombre: 'Bea',
      interes: 'Programación',
      conocimiento: 'Deporte'
    };
    compatibles[1] = usuario1;

    usuario1 = {
      nombre: 'Ruth',
      interes: 'Tecnología',
      conocimiento: 'Literatura'
    };
    compatibles[2] = usuario1;

    usuario1 = {
      nombre: 'Luis',
      interes: 'Deporte',
      conocimiento: 'Cocina'
    };
    compatibles[3] = usuario1;

    this.usuarios = compatibles
  }

}
