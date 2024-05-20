import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  myLoginForm!: FormGroup;
  myRegisterForm!: FormGroup;
  loginErrors: string = '';
  registerErrors: string = '';

  constructor(
    private router: Router,
    private localS: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.myLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.min(0), Validators.max(120)]),
    });
    this.myRegisterForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.min(5), Validators.max(120)]),
    });
    this.toggled = localStorage.getItem('authToggled') === 'true';
  }

  onSubmit() {
    if (this.myLoginForm.valid) {
      console.log('Form submitted:', this.myLoginForm.value);
      const user = {
        email: this.myLoginForm.value.email,
        password: this.myLoginForm.value.password,
      };
      this.authService.login(user).subscribe({
        next: (data) => {
          console.log(data);
          this.loginErrors = '';
        },
        error: (error) => {
          console.log(error);
          this.loginErrors = error.error.message;
          // if (error.error.status == 403) {
          //   this.loginErrors = 'Invalid credentials';
          // }
        },
      });
    }
  }

  onRegister() {
    if (this.myRegisterForm.valid) {
      console.log('Form submitted:', this.myRegisterForm.value);
      const user = {
        username: this.myRegisterForm.value.username,
        email: this.myRegisterForm.value.email,
        password: this.myRegisterForm.value.password,
      };
      this.authService.register(user).subscribe({
        next: (data: any) => {
          console.log(data);

          if (this.registerErrors) {
            this.registerErrors = '';
          }
          this.toggleSide();
        },
        error: (err) => {
          console.log(err);

          let error: string = err.error.message;
          console.log(err?.error.error);
          const expressHandle = 'Duplicate entry';
          const nestHandle = 'dup key';
          if (error?.includes(expressHandle || nestHandle)) {
            this.registerErrors = 'Email already exists';
          } else {
            this.registerErrors = error;
          }
        },
      });
    } else {
      console.log('Form not valid');
    }
  }

  toggled = false;
  toggleSide() {
    this.toggled = !this.toggled;
    localStorage.setItem('authToggled', this.toggled ? 'true' : 'false');
  }
}
