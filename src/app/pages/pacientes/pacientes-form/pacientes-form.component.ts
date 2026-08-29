import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from '../../../core/services/paciente.service';
import { Paciente } from '../../../core/models/paciente.model';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.css']
})
export class PacientesFormComponent {
  form: FormGroup;
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dpi: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const paciente: Paciente = this.form.value;

    this.pacienteService.create(paciente).subscribe({
      next: () => {
        this.toastr.success('Paciente registrado correctamente');
        this.router.navigate(['/pacientes']);
      },
      error: (err) => {
        this.guardando = false;
        const mensaje = err?.error?.message || 'No se pudo registrar el paciente';
        this.toastr.error(mensaje);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/pacientes']);
  }

  get f() {
    return this.form.controls;
  }
}
