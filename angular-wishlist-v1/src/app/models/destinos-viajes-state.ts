import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {map} from 'rxjs/operators';
import {DestinoViaje} from "./destino-viaje.model";

// ESTADO
export interface DestinosViajesState {
    // Almacena el total de destinos
    items: DestinoViaje[];
    // Permite almacenar el estado de la carga de datos por ajax
    loading: boolean;
    // Almacena el destino favorito
    favorito: DestinoViaje;
}

// Inicializa los estados.
export const initializeDestinosViajesState = function (){
    return {
      items: [],
      loading: false,
      favorito: null
    };
}

// ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos viajes] Favorito'
}
export class NuevoDetinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor (public destino: DestinoViaje){}
}
export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor (public destino: DestinoViaje){}
}

// Agrupa todos los tipos de acciones del sistema, unión de tipos
export type DestinosViajesActions = NuevoDetinoAction | ElegidoFavoritoAction;

//REDUCES
// Reductores, cada vez que se realiza una acción se dispara un reductor.
export function reducerDestinosViajes (
    state: DestinosViajesState,
    action: DestinosViajesActions
): DestinosViajesState {
  switch(action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoDetinoAction).destino]
      };
    }
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
      state.items.forEach(x => x.setSelected(false));
      const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
      fav.setSelected(true);
      return {
        ...state,
        favorito: fav
      };
    }
  }
  return state;
}

// EFFECTS
// Registra una nueva acción sobre otra acción
/*@Injectable()
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action<any>> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
    map((action: NuevoDetinoAction)=> new ElegidoFavoritoAction(action.destino))
  );
<<<<<<< HEAD

  constructor(private actions$: Action){}
}*/
=======
  constructor(private actions$: Action<any>){}
}
>>>>>>> parent of d5b431c (Actualizado a la versión 14 de Angular y corregido algunos errores)

