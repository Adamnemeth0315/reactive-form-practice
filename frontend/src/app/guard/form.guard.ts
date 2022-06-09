import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { SaveData } from '../model/save-data.interface';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<SaveData> {

  constructor(private dialog: MatDialog){}
  canDeactivate(
    component: SaveData,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Itt a komponensnél egy inteface metódust adok meg, ami csekkolja a form dirty állapotát(Ezt azoknál a komponenseknél veszem fel ahol használni szeretném a canDeactivet-et).
      // Itt negálni kell, hogy jól működjön.
      if(!component.isDataSaved()) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        return dialogRef.afterClosed();
      }
    return of(true);
  }
  
}
