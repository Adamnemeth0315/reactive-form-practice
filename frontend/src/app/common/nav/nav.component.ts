import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  userSub: Subscription = new Subscription;
  user: User | null = null;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject$.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.auth.logout();
  }

}
