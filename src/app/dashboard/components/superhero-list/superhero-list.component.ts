import { Component, effect, inject, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Superhero } from '../../models/superhero';
import { SuperheroService } from '../../services/superhero.service';
import { SuperheroFilterComponent } from '../superhero-filter/superhero-filter.component';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { AddEditModalComponent } from '../modals/add-edit-modal/add-edit-modal.component';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule
];

@Component({
  selector: 'superhero-list',
  standalone: true,
  imports: [MATERIAL_MODULES, SuperheroFilterComponent],
  templateUrl: './superhero-list.component.html',
  styleUrl: './superhero-list.component.scss',
})
export class SuperheroListComponent implements OnInit {

  private superheroService = inject(SuperheroService);
  readonly dialog = inject(MatDialog);
  private readonly sort = viewChild.required<MatSort>(MatSort);
  private readonly paginator = viewChild.required<MatPaginator>(MatPaginator);

  dialogRef?: MatDialogRef<AddEditModalComponent>;

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource!: MatTableDataSource<Superhero>;
  filter = signal('');

  constructor(){
    effect( () => {
        this.dataSource.filter = this.filter();
    })
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.superheroService.getSuperheroes().subscribe({
      next: (response: Superhero[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator();
        this.dataSource.sort = this.sort();
      },
      error: (error: any) => {
        console.error('Error loading superheroes:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditModal(superhero: Superhero){
    const dialogRef = this.dialog.open(AddEditModalComponent, {
      data:{
        superhero: superhero,
        editMode: true
      }
     });

     dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        superhero.name = result;
        this.superheroService.editSuperhero(superhero);
      }
    });
  }

  onDeleteModal(superhero: Superhero){
   const dialogRef = this.dialog.open(ConfirmationModalComponent, {
    data:{
      superhero: superhero
    }
   });

   dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.superheroService.deleteSuperhero(superhero.id);
    }
  });
  }

  onAddModal(){
    const dialogRef = this.dialog.open(AddEditModalComponent, {
      data:{
        editMode: false
      }
     });

     dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.superheroService.addSuperhero(result);
      }
    });
  }
}
