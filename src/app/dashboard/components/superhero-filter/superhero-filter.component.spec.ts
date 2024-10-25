import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroFilterComponent } from './superhero-filter.component';

describe('SuperheroFilterComponent', () => {
  let component: SuperheroFilterComponent;
  let fixture: ComponentFixture<SuperheroFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperheroFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperheroFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
