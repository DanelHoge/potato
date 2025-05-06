import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [CommonModule, RouterModule, ButtonModule, HeaderComponent],
  templateUrl: './welcome.component.html',
})

export class WelcomeComponent {}
