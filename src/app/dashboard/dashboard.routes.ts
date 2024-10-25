import { Routes } from '@angular/router';
import { SuperheroListPageComponent } from './pages/superhero-list-page/superhero-list-page.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: SuperheroListPageComponent
  }
];
