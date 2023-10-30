// navigation.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  template: `
    <nav>
      <a routerLink="/dashboard" *ngIf="isLoggedIn()">Dashboard</a>
      <a routerLink="/login" *ngIf="!isLoggedIn()">Login</a>
      <button (click)="logout()" *ngIf="isLoggedIn()">Logout</button>
    </nav>
  `,
})
export class NavigationComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
