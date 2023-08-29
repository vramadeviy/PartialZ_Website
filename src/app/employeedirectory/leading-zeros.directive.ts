import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[appLeadingZeros]',
})
export class LeadingZerosDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private datePipe: DatePipe) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    if (value) {
      const formattedDate = this.formatDate(value);
      this.renderer.setProperty(this.el.nativeElement, 'value', formattedDate);
    }
  }

  private formatDate(value: string): string {
    const date = new Date(value);
    var strDate= this.datePipe.transform(date, 'MM/dd/yyyy');
    return strDate==null ? Date.now().toString() : strDate;
  }
}



