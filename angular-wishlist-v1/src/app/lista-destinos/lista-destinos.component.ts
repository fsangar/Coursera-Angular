import { Component, OnInit } from '@angular/core';
import {DestinoViaje} from "../models/destino-viaje.model";

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }

  ngOnInit(): void {
  }

  guardar (nombre:string, url:string):boolean{
    this.destinos.push(new DestinoViaje(nombre, url));
    // Devolvemos un valor falso para que no recargue la página.
    // Es un principio de javascript para botones submit
    return false;
  }
}
