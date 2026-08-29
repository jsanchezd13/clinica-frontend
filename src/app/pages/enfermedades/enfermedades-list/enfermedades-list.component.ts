import { Component, OnInit } from '@angular/core';
import { Enfermedad } from '../../../core/models/enfermedad.model';
import { EnfermedadService } from '../../../core/services/enfermedad.service';

@Component({
  selector: 'app-enfermedades-list',
  templateUrl: './enfermedades-list.component.html',
  styleUrls: ['./enfermedades-list.component.css']
})
export class EnfermedadesListComponent implements OnInit {
  enfermedades: Enfermedad[] = [];
  loading = false;

  constructor(private enfermedadService: EnfermedadService) {}

  ngOnInit(): void {
    this.cargarEnfermedades();
  }

  cargarEnfermedades(): void {
    this.loading = true;
    this.enfermedadService.getAll().subscribe({
      next: (data) => {
        this.enfermedades = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  gravedadClass(nivel?: number): string {
    if (!nivel) return 'bg-secondary';
    if (nivel <= 2) return 'bg-success';
    if (nivel === 3) return 'bg-warning text-dark';
    return 'bg-danger';
  }
}