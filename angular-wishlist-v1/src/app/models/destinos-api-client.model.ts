import {DestinoViaje} from "./destino-viaje.model";

export class DestinoApiClient {

  private destinos = new Array<DestinoViaje>();

  constructor() {
  }

  add (d: DestinoViaje){
    this.destinos.push(d);
  }
  getAll (): Array<DestinoViaje>{
    return this.destinos;
  }

}

