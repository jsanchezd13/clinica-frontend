import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../core/models/medico.model';
import { MedicoService } from '../../../core/services/medico.service';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html'
})
export class MedicosListComponent implements OnInit {
  medicos: Medico[] = [];
  loading = false;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.loading = true;
    this.medicoService.getAll().subscribe({
      next: (data) => {
        this.medicos = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}