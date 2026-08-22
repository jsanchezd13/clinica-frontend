// layout/main-layout/main-layout.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header></app-header>
    <div class="main-wrapper">
      <app-sidebar></app-sidebar>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .main-wrapper {
      display: flex;
      min-height: calc(100vh - 60px);
    }
    .content {
      flex: 1;
      padding: 20px;
      background: #f8f9fa;
    }
  `]
})
export class MainLayoutComponent {}