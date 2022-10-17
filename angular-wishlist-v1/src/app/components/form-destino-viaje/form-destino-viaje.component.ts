import {Component, EventEmitter, forwardRef, Inject, OnInit, Output} from '@angular/core';
import {DestinoViaje} from "../../models/destino-viaje.model";
import {AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import {APP_CONFIG, AppConfig} from "../../app.module";

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})
export class FormDestinoViajeComponent implements OnInit {
  // Definimos un evento de salida con el nombre onItemAdded
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  // Definimos el formularo que es de tipo FromGruop
  fg: UntypedFormGroup;

  minLongitud = 3;
  searchResults= null;

  // FormBuilder permite definir la construcción del formulario, nombre y url serán los elementos vinculados al formulario, permitirá hacer validaciones sobre los mismos
  constructor(fb: UntypedFormBuilder,  @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
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
    // Capturamos el evento del input con fromEvent
    let elemNombre = <HTMLInputElement>document.querySelector("#nombre");
/*    fromEvent(elemNombre, 'input')
      // Pipe nos permite hacer secuencias de códigos condicionales a que las anteriores hayan funcionado
      .pipe(
        map((e)=> (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        // Se queda parado 200ms, no permite introducir más de un carácter en < 200ms
        debounceTime(200),
        // Buscamos datos distintos
        distinctUntilChanged(),
        // Mandaría el texto al webService
        switchMap(() => ajax("assets/datos.json"))
      ).subscribe((ajaxResponse => {
        console.log(ajaxResponse.response);
    }));*/
    fromEvent(elemNombre, 'input')
      // Pipe nos permite hacer secuencias de códigos condicionales a que las anteriores hayan funcionado
      .pipe(
        map((e)=> (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        // Se queda parado 200ms, no permite introducir más de un carácter en < 200ms
        debounceTime(200),
        // Buscamos datos distintos
        distinctUntilChanged(),
        // Mandaría el texto al webService
        switchMap((text:string) => ajax(this.config.apiEndpoint + "/ciudades?q="+ text))
      ).subscribe(ajaxResponse => {
        // @ts-ignore
        this.searchResults = ajaxResponse.response
    });
  }
  // Función que crea un destion con su nombre y url y emite un evento al componente superior.En nuestro caso el componente superior es el que crea este, es decir lista-destino-viajes
  guardar(nombre: string, url:string):boolean {
    let d = new DestinoViaje(nombre,url);
    this.onItemAdded.emit(d);
    return false;
  }

  // Las validaciones devuelven como resultado clave y valor
  // Ej. {required: true}
  nombreValidator(control: UntypedFormControl): {[s:string]:boolean}{
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
      if (l > 0 &&  l < minLong){
        return {minLongNombre: true};
      }
      return {};
    }
  }
}
