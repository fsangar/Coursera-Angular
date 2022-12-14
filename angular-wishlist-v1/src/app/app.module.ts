import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

// Importamos los módulos de los formularios
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// Importamos los módulos de Routing
import { RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './componets/protected/protected/protected.component';
import {UsuarioLogueadoGuard} from "./guards/usuario-logueado/usuario-logueado.guard";
import {AuthService} from "./services/auth.service";
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import {DestinoApiClient} from "./models/destinos-api-client.model";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EspiameDirective } from './espiame.directive';
import { TrackearClickDirective } from './trackear-click.directive';

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: "http://localhost:3000"
}
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'main', component: VuelosMainComponentComponent},
  { path: 'mas-info', component: VuelosMasInfoComponentComponent},
  { path: ':id', component: VuelosDetalleComponentComponent},
];

// Definimos una constantes que es de tipo Router
// path = ruta
// redirectTo = Redirige a la ruta
// pathMatch = Permite navegar independientemente de los parámetros introducidos
// component: Muestra el componente indicado
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ListaDestinosComponent},
  { path: 'destinos', component: DestinoDetalleComponent},
  { path: 'destino/:id', component: DestinoDetalleComponent},
  { path: 'login', component: LoginComponent},
  { path: 'protected',
    component: ProtectedComponent,
    canActivate: [UsuarioLogueadoGuard]
  },
  { path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [UsuarioLogueadoGuard],
    children: childrenRoutesVuelos
  }
];


@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
    EspiameDirective,
    TrackearClickDirective,
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
    ReservasModule,
/*    NgRxStoreModule.forRoot(reducers, {initalState: reducersInitialState}),
    EffectsModule.forRoot([DestinosViajesEffects])*/
    NgxMapboxGLModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    DestinoApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
