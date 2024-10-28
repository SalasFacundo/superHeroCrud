import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[uppercase]',
  standalone: true
})
export class UppercaseDirective {

  elementRef = inject(ElementRef)

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.elementRef.nativeElement as HTMLInputElement;
    if (/[a-z]/.test(input.value)) {
      input.value = input.value.toUpperCase();
      input.dispatchEvent(new Event('input'));
    }
  }
}
