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
  getById (id: number):DestinoViaje {
    let dest = this.destinos.filter((x) => x.id == id)[0];
    if (dest == null){
      return new DestinoViaje("Destino provisional", "destino provisional");
    }
    return dest;
  }

}

