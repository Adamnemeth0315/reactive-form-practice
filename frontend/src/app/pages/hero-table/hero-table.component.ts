import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Hero } from 'src/app/model/hero';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { HeroesService } from 'src/app/services/heroes.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})
export class HeroTableComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Hero> = new MatTableDataSource<Hero>();
  displayedColumns: string[] = [
    'name',
    'level',
    'superpower',
    'description',
    'actions',
  ];
  pageSizes: number[] = [5, 10, 25, 50];
  dataSubscription!: Subscription;
  currentFilterKey: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any> | undefined;

  constructor(
    private heroesService: HeroesService,
    private fileService: FileManagerService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.heroesService.getAll();
    this.heroesService.list$.subscribe(
      heroes => this.dataSource.data = heroes as unknown as Hero[]
    );

    //Ez a filterhez kell. Még nem tökéletes, ha nincs kiválasztva key akkor a level esetén több találatot is ad. 
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const key = this.currentFilterKey || '';
      const source = key ? String(data[key]) : JSON.stringify(data);
      return source.toLowerCase().includes(filter.toLowerCase())
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(hero: Hero): void {
    this.router.navigate(['hero-edit', hero._id])
  }

  //Törlés toastr-el dialog ablakkal együtt.
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
      this.heroesService.remove(hero._id as string)
        .subscribe(
          () => {
            this.toastr.success('Sikeresen törölted a hőst!', 'Törlés!', { timeOut: 3000, });
            this.heroesService.getAll();
            this.router.navigate(['/heroes-tab']);
          },
          (error) => this.toastr.error('Hiba történt a hős törlésekor!', 'Hiba!', { timeOut: 3000, })
          )
    })
  }
}


