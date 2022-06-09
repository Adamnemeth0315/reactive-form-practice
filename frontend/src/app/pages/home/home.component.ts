import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  userSub: Subscription = new Subscription;
  user: User | null = null;
  minutes = 5;
  seconds = 0;
  timerIsRun: boolean = false;
  timeEnding = false;
  timeEndingMessage: string = "Lejárt az idő!";
  
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

  countDown = () => {
    this.timerIsRun = true;
    if(this.seconds !== 0){
      this.seconds = this.seconds - 1;
      setTimeout(this.countDown, 1000);
    }else {
      if( this.minutes !== 0){
        this.seconds = 59;
        this.minutes = this.minutes - 1;
        setTimeout(this.countDown, 1000);
      }
    }
    if(this.seconds === 0 && this.minutes === 0){
      this.timeEnding = true;
      this.timerIsRun = false;
      clearTimeout();
    }
  } 
}
