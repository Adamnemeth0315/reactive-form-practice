import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SaveData } from 'src/app/model/save-data.interface';
import { User } from 'src/app/model/user';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, SaveData {
  user: User = new User();
  updated: boolean = false;
  hide = true;
  submit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private customValidator: CustomValidationService
  ) {}

  userForm = this.fb.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.customValidator.validateUsernameNotTaken.bind(
            this.customValidator
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      address: this.fb.group({
        street: [
          '',
          [Validators.pattern('^[A-ZÁÉÖÜÓŐÚŰ][a-záéöüóőúű].{1,30}$')],
        ],
        city: ['', [Validators.pattern('^[A-ZÁÉÖÜÓŐÚŰ][a-záéöüóőúű].{1,30}$')]],
        country: [
          '',
          [Validators.pattern('^[A-ZÁÉÖÜÓŐÚŰ][a-záéöüóőúű].{2,30}$')],
        ],
        zip: ['', [Validators.pattern('^[0-9]{4}$')]],
      }),
      rememberMe: [false]
    },
    {
      validator: this.customValidator.passwordMatchValidator(
        'password',
        'confirmPassword'
      ),
    }
  );

  ngOnInit(): void {
    //Itt ki tudom logolni a form-ot ellenőrizhetem, hogy validok-e a mezők, milyen hibák vannak stb stb
    /* this.newUserGroup.valueChanges.subscribe(data => console.log(this.newUserGroup)) */
  }

  isDataSaved(): boolean {
    if(this.submit){
      return this.userForm.dirty;
      } else {
        return !this.userForm.dirty;
      }
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  showPassword() {
    this.hide = !this.hide;
  }

  setUserToDatabase(): void {
    this.updated = true;
    this.submit = true;
    this.userService.create(this.userForm.value).subscribe(() => {
      this.updated = false;
      this.router.navigate(['/login']);
    });
  }
}
