import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  permiso?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar">
      <ul class="nav flex-column">
        <li class="nav-item" *ngFor="let item of menuItems">
          <ng-container *ngIf="isVisible(item)">

            <!-- Item simple (sin submenú), ej. Inicio -->
            <a *ngIf="!item.children" class="nav-link" [routerLink]="item.route" routerLinkActive="active">
              <i class="bi {{ item.icon }}"></i> {{ item.label }}
            </a>

            <!-- Item con submenú, ej. Pacientes -->
            <div *ngIf="item.children">
              <span class="nav-link fw-bold parent-label">
                <i class="bi {{ item.icon }}"></i> {{ item.label }}
              </span>
              <ul class="nav flex-column submenu">
                <li *ngFor="let child of item.children">
                  <a *ngIf="hasAccess(child)" class="nav-link" [routerLink]="child.route" routerLinkActive="active">
                    <i class="bi {{ child.icon }}"></i> {{ child.label }}
                  </a>
                </li>
              </ul>
            </div>

          </ng-container>
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
      cursor: pointer;
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
    .parent-label {
      opacity: 0.85;
    }
    .submenu .nav-link {
      padding-left: 40px;
      font-size: 0.9rem;
    }
  `]
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'bi-house', route: '/dashboard' }, // sin permiso = siempre visible

    {
      label: 'Pacientes', icon: 'bi-people',
      children: [
        { label: 'Consultar pacientes', route: '/pacientes', permiso: 'PACIENTES_CONSULTAR', icon: 'bi-search' },
        { label: 'Registrar paciente', route: '/pacientes/nuevo', permiso: 'PACIENTES_REGISTRAR', icon: 'bi-plus-circle' },
      ]
    },
    {
      label: 'Médicos', icon: 'bi-person-badge',
      children: [
        { label: 'Consultar médicos', route: '/medicos', permiso: 'MEDICOS_CONSULTAR', icon: 'bi-search' },
        { label: 'Registrar médico', route: '/medicos/nuevo', permiso: 'MEDICOS_REGISTRAR', icon: 'bi-plus-circle' },
      ]
    },
    {
      label: 'Citas', icon: 'bi-calendar-event',
      children: [
        { label: 'Consultar citas', route: '/citas', permiso: 'CITAS_CONSULTAR', icon: 'bi-search' },
        { label: 'Registrar cita', route: '/citas/nueva', permiso: 'CITAS_REGISTRAR', icon: 'bi-plus-circle' },
      ]
    },
    {
      label: 'Administración', icon: 'bi-gear',
      children: [
        { label: 'Usuarios', route: '/administracion/usuarios', permiso: 'ADMIN_USUARIOS', icon: 'bi-person-gear' },
        { label: 'Roles', route: '/administracion/roles', permiso: 'ADMIN_ROLES', icon: 'bi-shield-lock' },
      ]
    },
  ];

  constructor(private authService: AuthService) {}

  // ¿Este item específico (con o sin hijos) es accesible?
  hasAccess(item: MenuItem): boolean {
    if (!item.permiso) return true; // items sin permiso definido (ej. Inicio) siempre se muestran
    return this.authService.hasPermission(item.permiso);
  }

  // ¿Este item del menú principal debe mostrarse?
  // Si tiene hijos, se muestra el padre solo si AL MENOS UN hijo es visible.
  isVisible(item: MenuItem): boolean {
    if (item.children) {
      return item.children.some(child => this.hasAccess(child));
    }
    return this.hasAccess(item);
  }
}