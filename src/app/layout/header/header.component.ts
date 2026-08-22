// layout/header/header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <span class="brand">Clínica UMG</span>
      <div class="user-info" *ngIf="usuario">
        <span>{{ usuario.username }} ({{ roles.join(', ') }})</span>
        <button class="btn btn-sm btn-outline-light ms-3" (click)="logout()">
          Cerrar sesión
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background: #2c3e50;
      color: white;
      height: 60px;
    }
    .user-info {
      display: flex;
      align-items: center;
    }
  `]
})
export class HeaderComponent {
  usuario = this.authService.getCurrentUser();
  roles = this.authService.getRoles();

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}