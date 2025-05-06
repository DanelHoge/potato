import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStore } from '../../stores/app.store';

import { environment } from '../../../environments/environment';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form: FormGroup;
  showError = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private store = inject(AppStore);

  onSubmit(): void {
    const { username, password } = this.form.value;
    const { username: validUser, password: validPass } = environment.credentials;

    if (username === validUser && password === validPass) {
      this.store.login(username);
      this.router.navigate(['/welcome']);
      //this.router.navigate(['/sales']);
    } else {
      this.showError = true;
    }
  }
}
