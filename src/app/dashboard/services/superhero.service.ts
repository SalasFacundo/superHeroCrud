import { Injectable, Signal, signal, effect, computed } from '@angular/core';
import { Superhero } from '../models/superhero';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private superheroesSignal = signal<Superhero[]>([]);
  private readonly timeDeelayTest : number = 1000;

  constructor(private httpClient: HttpClient, private loadingService: LoadingService) {
    this.loadInitSuperheroes();
  }

  get superheroes(): Signal<Superhero[]> {
    return this.superheroesSignal;
  }

  addSuperhero(heroName: string): void {
    this.loadingService.show();
    setTimeout(() => {
      const lastHeroId = this.superheroesSignal().length > 0 ? Math.max(...this.superheroesSignal().map(hero => hero.id)) : 0;
      const updatedHeroes = [...this.superheroesSignal(), { id: lastHeroId + 1, name: heroName }];
      this.superheroesSignal.set(updatedHeroes);

      this.loadingService.hide();
    }, this.timeDeelayTest);
  }

  editSuperhero(updatedHero: Superhero): void {
    this.loadingService.show();
    const index = this.superheroesSignal().findIndex(hero => hero.id === updatedHero.id);
    if (index !== -1) {
      const updatedHeroes = [...this.superheroesSignal()];
      updatedHeroes[index] = updatedHero;
      this.superheroesSignal.set(updatedHeroes);
    }
    setTimeout(() => {
      this.loadingService.hide();
    }, this.timeDeelayTest);
  }

  deleteSuperhero(heroId: number): void {
    this.loadingService.show();
    setTimeout(() => {
      const updatedHeroes = this.superheroesSignal().filter(hero => hero.id !== heroId);
      this.superheroesSignal.set(updatedHeroes);

      this.loadingService.hide();
    }, this.timeDeelayTest);
  }

  private loadInitSuperheroes() {
    this.loadingService.show();
    this.httpClient.get<Superhero[]>('assets/data/superheroes.json').subscribe({
      next: (data: Superhero[]) => {
        this.superheroesSignal.set(data);
        this.loadingService.hide();
      },
      error: (error: any) => {
        console.error('Error loading superheroes:', error);
      }
    });
  }
}
