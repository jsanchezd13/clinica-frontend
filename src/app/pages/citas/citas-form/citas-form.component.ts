import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CitaService } from '../../../core/services/cita.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { MedicoService } from '../../../core/services/medico.service';
import { Cita } from '../../../core/models/cita.model';
import { Paciente } from '../../../core/models/paciente.model';
import { Medico } from '../../../core/models/medico.model';

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.css']
})
export class CitasFormComponent implements OnInit {
  form: FormGroup;
  guardando = false;
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      pacienteId: ['', [Validators.required]],
      medicoId: ['', [Validators.required]],
      fechaHora: ['', [Validators.required]],
      duracionMinutos: [30],
      motivo: ['', [Validators.maxLength(255)]],
      notas: [''],
    });
  }
  ngOnInit(): void {
  this.pacienteService.buscar({ page: 0, size: 200 }).subscribe({
    next: (respuesta) => this.pacientes = respuesta.data
  });
  this.medicoService.getAll().subscribe({
    next: (data) => this.medicos = data
  });
}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const cita: Cita = {
      ...this.form.value,
      pacienteId: Number(this.form.value.pacienteId),
      medicoId: Number(this.form.value.medicoId),
    };

    this.citaService.create(cita).subscribe({
      next: () => {
        this.toastr.success('Cita registrada correctamente');
        this.router.navigate(['/citas']);
      },
      error: (err) => {
        this.guardando = false;
        const mensaje = err?.error?.message || 'No se pudo registrar la cita';
        this.toastr.error(mensaje);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/citas']);
  }

  get f() {
    return this.form.controls;
  }
}