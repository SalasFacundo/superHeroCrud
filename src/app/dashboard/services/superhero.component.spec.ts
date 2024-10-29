import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SuperheroService } from './superhero.service';
import { Superhero } from '../models/superhero';

describe('SuperheroService', () => {
  let service: SuperheroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroService],
    });
    service = TestBed.inject(SuperheroService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne('assets/data/superheroes.json');
    req.flush([
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Batman' },
      { id: 3, name: 'Wonder Woman' },
    ]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return superhero by ID', () => {
    const superhero = service.getSuperheroById(1);
    expect(superhero).toEqual({ id: 1, name: 'Superman' });
  });

  it('should add a superhero', (done) => {
    const newHeroName = 'Flash';
    service.addSuperhero(newHeroName);

    setTimeout(() => {
      const addedHero = service.getSuperheroByName(newHeroName);
      expect(addedHero).toEqual({ id: 4, name: 'Flash' });
      done();
    }, service.getTimeDeelayTest());
  });

  it('should delete a superhero', (done) => {
    const heroIdToDelete = 1;
    service.deleteSuperhero(heroIdToDelete);

    setTimeout(() => {
      const deletedHero = service.getSuperheroById(heroIdToDelete);
      expect(deletedHero).toBeUndefined();
      expect(service.superheroes().length).toBe(2);
      done();
    }, service.getTimeDeelayTest());
  });

  it('should edit a superhero', (done) => {
    const updatedHero: Superhero = { id: 2, name: 'Dark Knight' };
    service.editSuperhero(updatedHero);

    setTimeout(() => {
      const editedHero = service.getSuperheroById(2);
      expect(editedHero).toEqual(updatedHero);
      done();
    }, service.getTimeDeelayTest());
  });

  it('should return superhero by name', () => {
    const heroName = 'Wonder Woman';
    const hero = service.getSuperheroByName(heroName);
    expect(hero).toEqual({ id: 3, name: 'Wonder Woman' });
  });
});
