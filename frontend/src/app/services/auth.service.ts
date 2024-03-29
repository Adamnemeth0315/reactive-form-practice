import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  lastToken: string = '';
  loginUrl: string = `${this.config.apiUrl}login`;
  currentUserValue: User | undefined;
  rememberMe: boolean = false;

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {
    if (localStorage.currentUser) {
      const user: User = JSON.parse(localStorage.currentUser);
      this.currentUserValue = user; 
      this.lastToken = user.accessToken || '';
      this.currentUserSubject$.next(user);
    }
  }

  login(loginData: User): Observable<User | null> {
    return this.http.post<{ user: User, accessToken: string }>(
      this.loginUrl,
      loginData
    ).pipe(
      map(response => {
        if (response.user && response.accessToken) {
          if(localStorage.rememberMe === 'true'){ 
            this.resetcredentials(); 
            localStorage.setItem('rememberMe', 'true');
            response.user.rememberMe = true;      
            localStorage.currentUserEmail = JSON.stringify(response.user.email);
          }
          this.lastToken = response.accessToken;
          response.user.accessToken = response.accessToken;
          this.currentUserSubject$.next(response.user);
          localStorage.currentUser = JSON.stringify(response.user.accessToken);
          localStorage.rememberMe = JSON.stringify(response.user.rememberMe);
          this.currentUserValue = response.user;
          console.log(response.user);
          return response.user;
        }
        return null;
      })
    )
  }

  resetcredentials() {
    //clear all localstorages
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('currentUser');
    this.currentUserSubject$.next(null);
  }

  logout(): void {
    this.lastToken = '';
    this.currentUserSubject$.next(null);
    localStorage.removeItem('currentUser');
    this.currentUserValue = undefined;
    this.router.navigate(['/', 'login']);
  }
}
