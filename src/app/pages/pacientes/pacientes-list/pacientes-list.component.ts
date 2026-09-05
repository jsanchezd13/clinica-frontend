import { Component, OnInit } from '@angular/core';
import { Paciente, PageMetadata, PacienteFiltro } from '../../../core/models/paciente.model';
import { PacienteService } from '../../../core/services/paciente.service';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.css']
})
export class PacientesListComponent implements OnInit {
  pacientes: Paciente[] = [];
  metadata: PageMetadata | null = null;
  loading = false;

  filtro: PacienteFiltro = {
    nombre: '',
    apellido: '',
    dpi: '',
    page: 0,
    size: 50
  };

  tamanosDisponibles = [50, 100, 200];

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.loading = true;
    this.pacienteService.buscar(this.filtro).subscribe({
      next: (respuesta) => {
        this.pacientes = respuesta.data;
        this.metadata = respuesta.metadata;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // Cuando cambia cualquier filtro, siempre se regresa a la página 0
  aplicarFiltros(): void {
    this.filtro.page = 0;
    this.cargarPacientes();
  }

  limpiarFiltros(): void {
    this.filtro = { nombre: '', apellido: '', dpi: '', page: 0, size: this.filtro.size };
    this.cargarPacientes();
  }

  cambiarTamano(size: number): void {
    this.filtro.size = size;
    this.filtro.page = 0;
    this.cargarPacientes();
  }

  paginaAnterior(): void {
    if (this.metadata?.hasPreviousPage) {
      this.filtro.page = (this.filtro.page ?? 0) - 1;
      this.cargarPacientes();
    }
  }

  paginaSiguiente(): void {
    if (this.metadata?.hasNextPage) {
      this.filtro.page = (this.filtro.page ?? 0) + 1;
      this.cargarPacientes();
    }
  }
}