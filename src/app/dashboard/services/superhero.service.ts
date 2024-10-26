import { inject, Injectable } from '@angular/core';
import { Superhero } from '../models/superhero';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private httpClient = inject(HttpClient);
  private loadingService = inject(LoadingService);
  private superheroes: Superhero[] = [];
  private superheroesSubject = new BehaviorSubject<Superhero[]>([]);
  private readonly timeDeelayTest : number = 1000;

  constructor() {
    this.loadInitSuperheroes();
  }

  getSuperheroes(): Observable<Superhero[]> {
    return this.superheroesSubject.asObservable();
  }

  addSuperhero(heroName: string): void {
    this.loadingService.show();
    setTimeout(() => {
      const lastHeroId = this.superheroes.length > 0 ? Math.max(...this.superheroes.map(hero => hero.id)) : 0;
      this.superheroes.push({ id: lastHeroId + 1, name: heroName });
      this.superheroesSubject.next([...this.superheroes]);

      this.loadingService.hide();
    }, this.timeDeelayTest);
  }

  editSuperhero(updatedHero: Superhero): void {
    this.loadingService.show();
    const index = this.superheroes.findIndex(hero => hero.id === updatedHero.id);
    if (index !== -1) {
      this.superheroes[index] = updatedHero;
      this.superheroesSubject.next([...this.superheroes]);
    }
    setTimeout(() => {
      this.loadingService.hide();
    }, this.timeDeelayTest);
  }

  deleteSuperhero(heroId: number): void {
    this.loadingService.show();
    setTimeout(() => {
      this.superheroes = this.superheroes.filter(hero => hero.id !== heroId);
      this.superheroesSubject.next([...this.superheroes]);

      this.loadingService.hide();
    }, this.timeDeelayTest);
  }

  private loadInitSuperheroes() {
      this.httpClient.get<Superhero[]>('assets/data/superheroes.json').subscribe({
        next: (data: Superhero[]) => {
          this.superheroes = data;
          this.superheroesSubject.next([...this.superheroes]);
          this.loadingService.hide();
        },
        error: (error: any) => {
          console.error('Error loading superheroes:', error);
        }
      });
  }
}
