import { Component, effect, inject, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Superhero } from '../../models/superhero';
import { SuperheroService } from '../../services/superhero.service';
import { SuperheroFilterComponent } from '../superhero-filter/superhero-filter.component';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
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
  private readonly sort = viewChild.required<MatSort>(MatSort);
  private readonly paginator = viewChild.required<MatPaginator>(MatPaginator);

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource!: MatTableDataSource<Superhero>;
  filter = signal('');

  constructor(){
    effect( () => {
      if(this.filter()){
        this.dataSource.filter = this.filter();
      }
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
}
