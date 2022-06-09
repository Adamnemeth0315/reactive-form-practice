import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Hero } from 'src/app/model/hero';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input()hero: Hero = new Hero();
  @Output() uploadImage: EventEmitter<any> = new EventEmitter();
  @Output() deleteHero: EventEmitter<any> = new EventEmitter();
  @Output() updateHero: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onUploadImage(e: Event): void {
    this.uploadImage.emit(e);
  }

  onUpdateHero(hero: Hero):void {
    this.updateHero.emit(hero);
  }

  onDeleteHero(hero: Hero): void {
    this.deleteHero.emit(hero);
  }

}
