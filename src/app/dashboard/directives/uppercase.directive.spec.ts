import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" uppercase>`
})
class TestComponent {}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UppercaseDirective],
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should convert input text to uppercase', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'hello';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('HELLO');
  });
});
