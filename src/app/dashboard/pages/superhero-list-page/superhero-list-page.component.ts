import { Component } from '@angular/core';
import { SuperheroListComponent } from "../../components/superhero-list/superhero-list.component";

@Component({
  selector: 'superhero-list-page',
  standalone: true,
  imports: [SuperheroListComponent],
  templateUrl: './superhero-list-page.component.html',
  styleUrl: './superhero-list-page.component.scss'
})
export class SuperheroListPageComponent {

}
