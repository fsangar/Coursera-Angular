import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {map} from 'rxjs/operators';
import {DestinoViaje} from "./destino-viaje.model";

// ESTADO
export interface DestinosViajesState {
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje;
}
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

// Agrupa toda las acciones
export type DestinosViajesActions = NuevoDetinoAction | ElegidoFavoritoAction;

//REDUCES
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
@Injectable()
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action<any>> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
    map((action: NuevoDetinoAction)=> new ElegidoFavoritoAction(action.destino))
  );
  constructor(private actions$: Action<any>){}
}

