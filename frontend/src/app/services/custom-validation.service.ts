import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  response = false;

  constructor(
    private http: HttpClient,
    private config: ConfigService
    ) { }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if(!passwordControl || !confirmPasswordControl){
        return null;
      }

      if(
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ){
        return null;
      }

      if( passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({passwordMismatch: true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  validateUsernameNotTaken(control: AbstractControl) {
    this.checkUsernameNotTaken(control.value).subscribe(
      res => this.response = res
    )
    return this.response ? null : {usernameTaken: true};

  }

  checkUsernameNotTaken(username: string): Observable<boolean> {
    this.http.get<User[]>(`${this.config.apiUrl}users`).subscribe(
      users => this.list$.next(users)
    )
    return this.list$.pipe(
      map((usernameList: User[]) => 
        usernameList.filter(user => user.username === username)
      ),
      map(users => !users.length)
    );
  }

}
