import { inject, Injectable } from '@angular/core';
import { Superhero } from '../models/superhero';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private httpClient = inject(HttpClient);
  private superheroes: Superhero[] = [];
  private superheroesSubject = new BehaviorSubject<Superhero[]>([]);

  constructor() {
    this.loadInitSuperheroes();
  }

  getSuperheroes(): Observable<Superhero[]> {
    return this.superheroesSubject.asObservable();
  }

  editSuperhero(updatedHero: Superhero): void {
    const index = this.superheroes.findIndex(hero => hero.id === updatedHero.id);
    if (index !== -1) {
      this.superheroes[index] = updatedHero;
      this.superheroesSubject.next([...this.superheroes]);
    }
  }

  deleteSuperhero(heroId: number): void {
    this.superheroes = this.superheroes.filter(hero => hero.id !== heroId);
    this.superheroesSubject.next([...this.superheroes]);
  }

  private loadInitSuperheroes(){
    this.httpClient.get<Superhero[]>('assets/data/superheroes.json').subscribe({
      next: (data: Superhero[]) => this.superheroesSubject.next(data),
      error: (error: any) => console.error('Error loading superheroes:', error)
    });
  }
}
