import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar">
      <ul class="nav flex-column">
        <li class="nav-item" *ngFor="let item of menuItems">
          <a class="nav-link" routerLink="{{ item.route }}" routerLinkActive="active" *ngIf="hasAccess(item.roles)">
            <i class="bi {{ item.icon }}"></i>
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .sidebar {
      min-height: calc(100vh - 56px);
      width: 250px;
      background: #2c3e50;
      padding-top: 20px;
    }
    .nav-link {
      color: white;
      padding: 12px 20px;
      transition: all 0.3s;
    }
    .nav-link:hover {
      background: #34495e;
    }
    .nav-link.active {
      background: #3498db;
    }
    .nav-link i {
      margin-right: 10px;
    }
  `]
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'bi-grid-1x2', route: '/dashboard', roles: [] },
    { label: 'Pacientes', icon: 'bi-people', route: '/pacientes', roles: ['ADMIN', 'RECEPCIONISTA', 'DOCTOR'] },
    { label: 'Médicos', icon: 'bi-person-badge', route: '/medicos', roles: ['ADMIN'] },
    { label: 'Citas', icon: 'bi-calendar-event', route: '/citas', roles: ['ADMIN', 'RECEPCIONISTA', 'DOCTOR'] },
    { label: 'Enfermedades', icon: 'bi-activity', route: '/enfermedades', roles: ['ADMIN', 'DOCTOR'] },
  ];

  constructor(private authService: AuthService) {}

  hasAccess(roles: string[]): boolean {
    if (roles.length === 0) return true;
    return this.authService.hasAnyRole(roles);
  }
}