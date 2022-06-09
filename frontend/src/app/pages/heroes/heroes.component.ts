import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IFile } from 'src/app/model/file';
import { Hero } from 'src/app/model/hero';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { HeroesService } from 'src/app/services/heroes.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroList$: Observable<Hero[]> | null = this.heroService.list$;
  file: IFile = new IFile();
  updateImageData: IFile = new IFile();

  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any> | undefined;

  constructor(
    private heroService: HeroesService,
    private fileService: FileManagerService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.heroService.getAll();
  }

  onDelete(hero: Hero): void {
    const dialogData = {
      title: 'Biztosan törölni akarod a hőst?',
      content: 'A hős véglegesen törlésre kerül.',
      template: this.dialogTemplate,
    }
    this.messageService.openDialog(dialogData as unknown as string).pipe(
      take(1)
    ).subscribe( result => {
      if(!result) return;
      let file = hero.image;
      if (file) {
        this.fileService.remove(file).subscribe( () => {
          console.log(`A fájl sikeresen törölve!`)
        });
      }
      this.heroService.remove(hero._id as string)
        .subscribe(
          () => {
            this.toastr.success('Sikeresen törölted a hőst!', 'Törlés!', { timeOut: 3000, });
            this.heroService.getAll();
            this.router.navigate(['/heroes']);
          },
          (error) => this.toastr.error('Hiba történt a hős törlésekor!', 'Hiba!', { timeOut: 3000, })
          )
    })
  }

  onSave(value: Event): void {
    let inputFile: File | undefined = (value?.target as HTMLInputElement)?.files?.[0];

    if (!inputFile) {
      console.error(new Error('Hiba történt a fájl beolvasása közben!'))
    } 

    this.fileService.create(inputFile as File).subscribe(
      (data: IFile) => {
        this.updateImageData = data;
      }
    )
  }

  updateHero(hero: Hero): void {
    if (this.updateImageData) hero.image = this.updateImageData;
    console.log("image: ", hero.image)
    this.heroService.update(hero).subscribe(
      () => {
        this.router.navigate(['heroes']);
      }
    );
  };

}
