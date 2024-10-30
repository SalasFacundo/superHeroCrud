import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperheroListComponent } from './superhero-list.component';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../models/superhero';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperheroListComponent', () => {
  let component: SuperheroListComponent;
  let fixture: ComponentFixture<SuperheroListComponent>;
  let superheroServiceMock: jasmine.SpyObj<SuperheroService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    superheroServiceMock = jasmine.createSpyObj('SuperheroService', ['superheroes', 'addSuperhero', 'editSuperhero', 'deleteSuperhero']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [SuperheroListComponent, NoopAnimationsModule],
      providers: [
        { provide: SuperheroService, useValue: superheroServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperheroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open AddEditModalComponent when onAddModal is called', () => {
    dialogMock.open.and.returnValue({ afterClosed: () => of('Batman') } as any);
    component.onAddModal();

    expect(dialogMock.open).toHaveBeenCalled();
    expect(superheroServiceMock.addSuperhero).toHaveBeenCalledWith('Batman');
  });

  it('should apply filter to dataSource', () => {
    component.dataSource = new MatTableDataSource([{ id: 1, name: 'Flash' }]);
    component.applyFilter({ target: { value: 'Flash' } } as any);

    expect(component.dataSource.filter).toBe('flash');
  });

  it('should open ConfirmationModalComponent when onDeleteModal is called', () => {
    const mockSuperhero: Superhero = { id: 2, name: 'Wonder Woman' };
    dialogMock.open.and.returnValue({ afterClosed: () => of(true) } as any);

    component.onDeleteModal(mockSuperhero);

    expect(dialogMock.open).toHaveBeenCalled();
    expect(superheroServiceMock.deleteSuperhero).toHaveBeenCalledWith(2);
  });

  it('should update superhero name when onEditModal is confirmed', () => {
    const mockSuperhero: Superhero = { id: 3, name: 'Green Lantern' };
    dialogMock.open.and.returnValue({ afterClosed: () => of('Green Lantern Updated') } as any);

    component.onEditModal(mockSuperhero);

    expect(dialogMock.open).toHaveBeenCalled();
    expect(superheroServiceMock.editSuperhero).toHaveBeenCalledWith({
      id: 3,
      name: 'Green Lantern Updated'
    });
  });
});
