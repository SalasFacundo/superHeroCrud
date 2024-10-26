import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[uppercase]',
  standalone: true
})
export class UppercaseDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.elementRef.nativeElement as HTMLInputElement;
    input.value = input.value.toUpperCase();
    input.dispatchEvent(new Event('input'));
  }

}
