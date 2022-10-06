import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DestinoViaje} from "../models/destino-viaje.model";
import {DestinoApiClient} from "../models/destinos-api-client.model";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  // Definimos el objeto que va a funcionar de observable RxJS
  current: Subject<any> = new BehaviorSubject(null);

  destinos: DestinoViaje[];
  updates: string[];

  constructor() {
    this.destinos = [];
    this.updates = [];
    // Definimos la acción que va a realizar el observable.
    this.current.subscribe((d:DestinoViaje) =>{
      if (d != null){
        this.updates.push("Se ha elegido a "+ d.nombre);
      }
    });
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
    // con RxJS y la función next estamos emitiendo al observable que se ha producido un cambio.
    this.current.next(d);
  }

}
