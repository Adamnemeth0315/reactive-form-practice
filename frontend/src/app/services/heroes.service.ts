import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFile } from '../model/file';
import { Hero } from '../model/hero';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  list$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }

  getAll(): void {
    this.http.get<Hero[]>(`${this.config.apiUrl}heroes`)
      .subscribe(
        list => {
          this.list$.next(list);
        }, 
        err => console.error(err)
      )
  }

  get(id: string): Observable<Hero> {
    return id === '0' ? new Observable<Hero>() : this.http.get<Hero>(`${this.config.apiUrl}heroes/${id}`) 
  }

  create(hero: Hero): Observable<Hero> {
    let heroData = hero as any;
    if ((hero?.image as IFile)?._id) heroData.image = (hero?.image as IFile)?._id;
    console.log(heroData);
    
    return this.http.post<Hero>(`${this.config.apiUrl}new-hero`, hero);
  }

  update(hero: Hero): Observable<Hero> {
    return this.http.patch<Hero>(`${this.config.apiUrl}heroes/${hero._id}`, hero)
  }

  remove(_id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.config.apiUrl}heroes/${_id}`);
  }

}
