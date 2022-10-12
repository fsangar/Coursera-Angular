import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

// Definimos una constantes que es de tipo Router
// path = ruta
// redirectTo = Redirige a la ruta
// pathMatch = Permite navegar independientemente de los parámetros introducidos
// component: Muestra el componente indicado
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ListaDestinosComponent},
  { path: 'destinos', component: DestinoDetalleComponent},
  { path: 'login', component: LoginComponent},
  { path: 'protected',
    component: ProtectedComponent,
    canActivate: [UsuarioLogueadoGuard]
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
  providers: [
    AuthService,
    UsuarioLogueadoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
