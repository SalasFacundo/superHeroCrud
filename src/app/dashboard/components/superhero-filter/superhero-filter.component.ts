import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
];

@Component({
  selector: 'superhero-filter',
  standalone: true,
  imports: [MATERIAL_MODULES, FormsModule],
  templateUrl: './superhero-filter.component.html',
  styleUrl: './superhero-filter.component.scss'
})
export class SuperheroFilterComponent {
  filter = model('');
}
