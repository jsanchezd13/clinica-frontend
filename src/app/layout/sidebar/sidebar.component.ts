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
              <span class="nav-link parent-label">
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
      width: 260px;
      background: #2c3e50;
      padding: 1rem 0;
      overflow-y: auto;
    }

    .nav.flex-column {
      list-style: none;
      padding-left: 0;
      margin: 0;
    }

    .nav-link {
      color: #d8dee5;
      padding: 0.65rem 1.25rem;
      font-size: 0.92rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 0.15s ease, color 0.15s ease;
      text-decoration: none;
      cursor: pointer;
    }

    .nav-link:hover {
      background: #34495e;
      color: #ffffff;
    }

    .nav-link.active {
      background: #3498db;
      color: #ffffff;
    }

    .nav-link i {
      font-size: 1rem;
      flex-shrink: 0;
      width: 18px;
      text-align: center;
    }

    .parent-label {
      opacity: 0.75;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 1.1rem 1.25rem 0.4rem;
      cursor: default;
    }

    .parent-label:hover {
      background: transparent;
      color: inherit;
    }

    .parent-label i {
      font-size: 0.9rem;
    }

    .submenu {
      padding-left: 0;
    }

    .submenu .nav-link {
      padding-left: 2.6rem;
      font-size: 0.85rem;
      font-weight: 400;
    }

    .submenu .nav-link i {
      font-size: 0.85rem;
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
  label: 'Enfermedades', icon: 'bi-activity',
  children: [
    { label: 'Consultar enfermedades', route: '/enfermedades', permiso: 'ENFERMEDADES_CONSULTAR', icon: 'bi-search' },
    { label: 'Registrar enfermedad', route: '/enfermedades/nueva', permiso: 'ENFERMEDADES_REGISTRAR', icon: 'bi-plus-circle' },
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

  hasAccess(item: MenuItem): boolean {
    if (!item.permiso) return true;
    return this.authService.hasPermission(item.permiso);
  }

  isVisible(item: MenuItem): boolean {
    if (item.children) {
      return item.children.some(child => this.hasAccess(child));
    }
    return this.hasAccess(item);
  }
}