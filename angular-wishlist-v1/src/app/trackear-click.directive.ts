import {Directive, ElementRef} from '@angular/core';
import {fromEvent} from "rxjs";

@Directive({
  selector: '[appTrackearClick]'
})
export class TrackearClickDirective {

  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
    fromEvent(this.element, 'click').subscribe(evento => this.track(evento));
  }
  track(evento: Event): void {
    let elemTrags = this.element.attributes.getNamedItem('data-tracker-tags');
    console.log("||||||||||||||||||| track evento: "+this.element);
  }

}
