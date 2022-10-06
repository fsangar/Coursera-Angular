import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DestinoViaje} from "../models/destino-viaje.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})
export class FormDestinoViajeComponent implements OnInit {
  // Definimos un evento de salida con el nombre onItemAdded
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  // Definimos el formularo que es de tipo FromGruop
  fg: FormGroup;
  // FormBuilder permite definir la construcción del formulario, nombre y url serán los elementos vinculados al formulario, permitirá hacer validaciones sobre los mismos
  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter<DestinoViaje>();
    this.fg = fb.group({
      // nombre es requerido
      nombre: ["", Validators.required],
      url: [""]
    });
    // Definimos un observable. Permite comprobar el cambio de un elemento, en este caso del formulario definido como fg
    this.fg.valueChanges.subscribe((form: any) =>{
      console.log("Cambio sobre el formulario" + form);
    });
  }
  ngOnInit(): void {
  }
  // Función que crea un destion con su nombre y url y emite un evento al componente superior.En nuestro caso el componente superior es el que crea este, es decir lista-destino-viajes
  guardar(nombre: string, url:string):boolean {
    let d = new DestinoViaje(nombre,url);
    this.onItemAdded.emit(d);
    return false;
  }
}
