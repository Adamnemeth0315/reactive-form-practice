import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/model/hero';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero-editor',
  templateUrl: './hero-editor.component.html',
  styleUrls: ['./hero-editor.component.scss']
})
export class HeroEditorComponent implements OnInit {

  hero: Hero = new Hero();
  heroId: string = '';

  superpowers: string[] = [
    'Gazdagság',
    'Repülés',
    'Gyorsaság',
    'Erő',
    'Lézerszem',
    'Falmászás',
    'Halhatatlanság',
  ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        this.heroId = params.id
      } 
    );
    this.heroesService.get(this.heroId).subscribe(
      hero => this.hero = hero
    );
  }

  async onSubmit(ngForm: NgForm, hero: Hero): Promise<any> {
    await this.heroesService.update(hero).toPromise();
    return history.back();
  }

}
