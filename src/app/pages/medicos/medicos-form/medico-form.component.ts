import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicoService } from '../../../core/services/medico.service';
import { Medico } from '../../../core/models/medico.model';

@Component({
  selector: 'app-medico-form',
  templateUrl: './medico-form.component.html'
})
export class MedicoFormComponent {
  form: FormGroup;
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      matricula: ['', [Validators.required, Validators.maxLength(50)]],
      telefono: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      horarioInicio: [''],
      horarioFin: [''],
      aniosExperiencia: [null],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const medico: Medico = this.form.value;

    this.medicoService.create(medico).subscribe({
      next: () => {
        this.toastr.success('Médico registrado correctamente');
        this.router.navigate(['/medicos']);
      },
      error: () => {
        this.guardando = false;
        this.toastr.error('No se pudo registrar el médico');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/medicos']);
  }

  get f() {
    return this.form.controls;
  }
}