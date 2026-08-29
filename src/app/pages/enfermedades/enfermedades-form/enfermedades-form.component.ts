import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnfermedadService } from '../../../core/services/enfermedad.service';
import { Enfermedad } from '../../../core/models/enfermedad.model';

@Component({
  selector: 'app-enfermedades-form',
  templateUrl: './enfermedades-form.component.html',
  styleUrls: ['./enfermedades-form.component.css']
})
export class EnfermedadesFormComponent {
  form: FormGroup;
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(500)]],
      sintomas: ['', [Validators.maxLength(500)]],
      tratamiento: ['', [Validators.maxLength(500)]],
      categoria: ['', [Validators.maxLength(50)]],
      codigoCie: ['', [Validators.maxLength(20)]],
      nivelGravedad: [null, [Validators.min(1), Validators.max(5)]],
      esCronica: [false],
      esContagiosa: [false],
      tiempoRecuperacionDias: [null, [Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const enfermedad: Enfermedad = this.form.value;

    this.enfermedadService.create(enfermedad).subscribe({
      next: () => {
        this.toastr.success('Enfermedad registrada correctamente');
        this.router.navigate(['/enfermedades']);
      },
      error: (err) => {
        this.guardando = false;
        const mensaje = err?.error?.message || 'No se pudo registrar la enfermedad';
        this.toastr.error(mensaje);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/enfermedades']);
  }

  get f() {
    return this.form.controls;
  }
}