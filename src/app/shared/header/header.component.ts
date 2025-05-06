import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppStore } from '../../stores/app.store';
import { ButtonModule } from 'primeng/button';

const DEFAULT_USER = "Guest";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  store = inject(AppStore);
  router = inject(Router);

  get user(): string {
    return this.store.currentUser() ?? DEFAULT_USER;
  }

  logout() {
    this.store.logout();
    this.router.navigate(['/login']);
  }
}
