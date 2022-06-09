import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFile } from 'src/app/model/file';
import { Hero } from 'src/app/model/hero';
import { SaveData } from 'src/app/model/save-data.interface';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit, SaveData {
  heroGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)],),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    level: new FormControl(null, [Validators.required]),
    superpower: new FormControl(null, [Validators.required]),
  });
  private imageData: IFile | undefined;
  submit: boolean = false; //Ezt állítom true-ra ha elküldöm a formot, így jól működik a deactivate a formnál. 

  superpowers = [
    {value: "gazdagság", power: "Gazdagság"},
    {value: "repülés", power: "Repülés"},
    {value: "gyorsaság", power: "Gyorsaság"},
    {value: "erő", power: "Erő"},
    {value: "lézerszem", power: "Lézerszem"},
    {value: "falmászás", power: "Falmászás"},
    {value: "halhatatlanság", power: "Halhatatlanság"},
  ]
  
  constructor(
    private heroesService: HeroesService,
    private fileService: FileManagerService,
    private router: Router,
  ) { }

  isDataSaved(): boolean {
    if(this.submit){
    return this.heroGroup.dirty;
    } else {
      return !this.heroGroup.dirty;
    }
  }

  ngOnInit(): void {
    /* this.heroGroup.valueChanges.subscribe(data => console.log(this.heroGroup)); */
  }


  addHero(): void {
    let hero = this.heroGroup.value as Hero;  //Változót létrehozok a form group értékével és Hero-vá alakítam, ha van imageData akkor hozzáadom a hero.image-hez. 
    if (this.imageData) hero.image = this.imageData;
    this.submit = true;

    this.heroesService.create(hero).subscribe(
      () => {
        this.router.navigate(['heroes']);
      }
    );
  };

  onSave(value: Event): void {
    let inputFile: File | undefined = (value?.target as HTMLInputElement)?.files?.[0];
    value.preventDefault();
    if (!inputFile) {
      console.error(new Error('Hiba történt a fájl beolvasása közben!'))
    }

    this.fileService.create(inputFile as File).subscribe(
      (data: IFile) => {
        this.imageData = data;
      }
    )
  }

}
