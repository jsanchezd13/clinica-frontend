import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  permiso?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuario = this.authService.getCurrentUser();
  roles = this.authService.getRoles();

  menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'bi-house', route: '/dashboard' },
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

  constructor(private authService: AuthService, private router: Router) {}

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}