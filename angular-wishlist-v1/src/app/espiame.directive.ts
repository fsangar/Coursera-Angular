import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({ selector: '[appEspiame]'})
export class EspiameDirective implements OnInit, OnDestroy{

  public nextId = 0;

  log(msg:string) {
    console.log("Evento #"+this.nextId+" "+msg);
    this.nextId++;
  }

  constructor() {
  }
  ngOnInit() {
    this.log("#################********* onInit");
  }
  ngOnDestroy() {
    this.log("#################********* ngOnDestroy");
  }

}
