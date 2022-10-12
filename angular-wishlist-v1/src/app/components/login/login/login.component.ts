import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mensajeError: string;

  constructor( public authService: AuthService) {
    this.mensajeError = "";
  }

  ngOnInit(): void {
  }

  login(username:string, password: string): boolean {
    this.mensajeError = '';
    if (!this.authService.login(username, password)) {
      this.mensajeError = 'Login incorrecto.';
      setTimeout (function(mensaje: string){
        // @ts-ignore
        mensaje = '';
      }.bind(this), 2500, this.mensajeError);
    }
    return false;
  }
  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
