import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header></app-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .content {
      padding: 20px;
      background: #f8f9fa;
      min-height: calc(100vh - 60px);
    }
  `]
})
export class MainLayoutComponent {}
