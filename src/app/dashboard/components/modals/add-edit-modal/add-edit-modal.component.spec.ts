import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditModalComponent } from './add-edit-modal.component';
import { SuperheroService } from '../../../services/superhero.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Superhero } from '../../../models/superhero';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddEditModalComponent', () => {
  let component: AddEditModalComponent;
  let fixture: ComponentFixture<AddEditModalComponent>;
  let superheroServiceMock: jasmine.SpyObj<SuperheroService>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<AddEditModalComponent>>;

  beforeEach(async () => {
    superheroServiceMock = jasmine.createSpyObj('SuperheroService', ['getSuperheroByName']);
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [AddEditModalComponent, NoopAnimationsModule],
      providers: [
        { provide: SuperheroService, useValue: superheroServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: { superhero: { name: 'Superman' } } },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize name with the superhero name from data', () => {
    expect(component.name()).toBe('Superman');
  });

  it('should set error message when superhero already exists', () => {
    const existingSuperhero: Superhero = { id: 1, name: 'Batman' };
    superheroServiceMock.getSuperheroByName.and.returnValue(existingSuperhero);

    component.validData();

    expect(component.errorMessage()).toBe('Superhero exists');
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close the dialog with the superhero name when valid', () => {
    superheroServiceMock.getSuperheroByName.and.returnValue(undefined);
    component.validData();

    expect(component.errorMessage()).toBe('');
    expect(dialogRefMock.close).toHaveBeenCalledWith('Superman');
  });
});
