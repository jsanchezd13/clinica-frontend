import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="isAuthenticated" class="app-container">
      <app-header></app-header>
      <div class="main-content">
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>

    <router-outlet *ngIf="!isAuthenticated"></router-outlet>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .main-content {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .content-area {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #f5f6fa;
    }
  `]
})
export class AppComponent {

  private platformId = inject(PLATFORM_ID);

  get isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return !!localStorage.getItem('auth_token');
  }
}