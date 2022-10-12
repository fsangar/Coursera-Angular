import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importamos los módulos de los formularios
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule} from "@ngrx/effects";

// Importamos los módulos de Routing
import { RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import {
/*  DestinosViajesEffects,*/
  DestinosViajesState,
  initializeDestinosViajesState,
  reducerDestinosViajes
} from "./models/destinos-viajes-state";

// Definimos una constantes que es de tipo Router
// path = ruta
// redirectTo = Redirige a la ruta
// pathMatch = Permite navegar independientemente de los parámetros introducidos
// component: Muestra el componente indicado
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ListaDestinosComponent},
  { path: 'destinos', component: DestinoDetalleComponent}
];

// redux init
// Defino el estado general de la aplicación
export interface AppState {
  destinos: DestinosViajesState;
};
/*
const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};
*/

const reducersInitialState = {
  destinos: initializeDestinosViajesState()
};
// redux fin init


@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Las navegación la hace a través de la constante routes
    RouterModule.forRoot(routes),
    // Permite manejar formularios
    FormsModule,
    // Permite manejar formularios reactivos
    ReactiveFormsModule,
/*    NgRxStoreModule.forRoot(reducers, {initalState: reducersInitialState}),
    EffectsModule.forRoot([DestinosViajesEffects])*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
