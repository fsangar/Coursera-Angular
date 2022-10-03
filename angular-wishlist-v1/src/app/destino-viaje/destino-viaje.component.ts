import {Component, OnInit, Input, HostBinding, Output, EventEmitter} from '@angular/core';
import {DestinoViaje} from "../models/destino-viaje.model";

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: DestinoViaje = new DestinoViaje("","");
  @Input() posicion: number = 0;
  @HostBinding('attr.class') cssClass = 'col-md-4';

  // Declaramos un evento que nos permita saber si se ha pulsado el evento
  // Generará un evento de salida al pulsarlo.
  @Output() clicked: EventEmitter<DestinoViaje>;


  constructor() {
    this.clicked = new EventEmitter();
  }
  ngOnInit(): void {
  }

  ir (){
    // Envia un evento al evento padre, en nuestro caso vamos a
    // enviar el evento a lista-destinos
    this.clicked.emit(this.destino);
    return false;
  }
}

