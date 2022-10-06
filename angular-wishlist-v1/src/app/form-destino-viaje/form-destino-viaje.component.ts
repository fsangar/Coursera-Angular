import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DestinoViaje} from "../models/destino-viaje.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

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

  minLongitud = 3;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter<DestinoViaje>();
    this.fg = fb.group({
      // Validators.compose permite multiples validaciones
      nombre: ["", Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
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

  // Las validaciones devuelven como resultado clave y valor
  // Ej. {required: true}
  nombreValidator(control: FormControl): {[s:string]:boolean}{
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5){
      return {invalidNombre: true};
    }
    return {};
  }

  // Otra opción de hacer validadores es utilizando valores parametrizables utilizando lambda
  nombreValidatorParametrizable(minLong: number):ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && minLong < 5){
        return {minLongNombre: true};
      }
      return {};
    }
  }
}
