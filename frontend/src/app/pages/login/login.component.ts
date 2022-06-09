import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  user: User = new User();
  public showUsername: boolean = false;

  @ViewChild('rememberMeCheckbox') rememberMeCheckbox!: ElementRef;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }
  
  ngOnInit(): void {
    if (localStorage.rememberMe === 'true'){
      this.showUsername = true;
      this.user.email = localStorage.currentUserEmail.replace(/\"/g, "");
    } else {
      this.showUsername = false;
    }
  }

  ngAfterViewInit(): void {
    if (localStorage.rememberMe === 'true'){
      this.rememberMeCheckbox.nativeElement.checked = true;
      this.user.email = localStorage.currentUserEmail.replace(/\"/g, "");
    }
  }

  onLogin(): void {
    this.auth.login(this.user).subscribe(
      user => {
        if (user) {
          this.toastr.success('Sikeres bejelentkezés!', 'Bejelentkezés!', { timeOut: 3000, });
          this.router.navigate(['/']);
        }
      },
      (error) => this.toastr.error(error.error, 'Hiba!', { timeOut: 3000, })
    );
  }

  //Beállítom, hogyha a checkbox checked, akkor a localstorage-ban letárolt rememberMe értéke true legyen, ha a checkbox nem checked akkor pedig false.
  setRememberMe() {
    if(this.showUsername) {
      localStorage.setItem('rememberMe', 'false');
      this.showUsername = !this.showUsername;
    } else {
      this.showUsername = true;
      localStorage.setItem('rememberMe', 'true');
    }
  }

}
