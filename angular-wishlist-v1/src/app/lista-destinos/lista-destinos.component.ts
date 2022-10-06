import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DestinoViaje} from "../models/destino-viaje.model";
import {DestinoApiClient} from "../models/destinos-api-client.model";

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
  // Borramos la función guardar y creamos la función agregar.
  // Almacena el destino y emite el evento hacia arriba.
  agregar (d: DestinoViaje){
    this.destinos.push(d);
  }

  //Cada vez que se seleccoina un destino ponemos el resto a no seleccionados y seleccionamos el que se ha pulsado
  elegido (d:DestinoViaje){
    this.destinos.forEach(function (x) {x.setSelected(false)});
    d.setSelected(true);
  }
}
