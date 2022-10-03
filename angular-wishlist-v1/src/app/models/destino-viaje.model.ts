export class DestinoViaje {

  private selected: boolean = false;

  constructor(public nombre:string,public imagenUrl:string, public servicios= ["desayuno",'media pensión'] ) {
  }
  isSelected(): boolean{
    return this.selected;
  }
  setSelected(selected:boolean) {
    this.selected = selected;
  }
}

