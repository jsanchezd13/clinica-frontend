import { Component, OnInit } from '@angular/core';
import { Cita } from '../../../core/models/cita.model';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.css']
})
export class CitasListComponent implements OnInit {
  citas: Cita[] = [];
  loading = false;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.loading = true;
    this.citaService.getAll().subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  estadoClass(estado?: string): string {
    switch (estado) {
      case 'CONFIRMADA': return 'bg-primary';
      case 'COMPLETADA': return 'bg-success';
      case 'CANCELADA': return 'bg-danger';
      default: return 'bg-warning text-dark'; // PENDIENTE
    }
  }
}
