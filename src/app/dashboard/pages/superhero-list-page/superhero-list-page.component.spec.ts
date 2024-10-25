import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroListPageComponent } from './superhero-list-page.component';

describe('SuperheroListPageComponent', () => {
  let component: SuperheroListPageComponent;
  let fixture: ComponentFixture<SuperheroListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperheroListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperheroListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
