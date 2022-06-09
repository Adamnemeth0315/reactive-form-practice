import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../common/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(data: string): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px', 
      data,
    });

    return dialogRef.afterClosed();
  }
}
