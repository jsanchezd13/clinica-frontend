// pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Paciente } from '../../core/models/paciente.model';
import { PacienteService } from '../../core/services/paciente.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuario: any;
  roles: string[] = [];
  isAdmin = false;
  isRecepcion = false;
  totalPacientes: number | null = null;

  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
    this.roles = this.authService.getRoles();
    this.isAdmin = this.authService.hasRole('ADMIN');
    this.isRecepcion = this.authService.hasRole('RECEPCION');

    if (this.isAdmin) {
      this.cargarTotalPacientes();
    }
  }

  private cargarTotalPacientes(): void {
  this.pacienteService.buscar({ page: 0, size: 1 }).subscribe({
    next: (respuesta) => this.totalPacientes = respuesta.metadata.totalRecords,
    error: () => this.totalPacientes = 0
  });
}
}