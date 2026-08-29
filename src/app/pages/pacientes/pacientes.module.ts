import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacientesFormComponent } from './pacientes-form/pacientes-form.component';

@NgModule({
  declarations: [
    PacientesListComponent,
    PacientesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PacientesRoutingModule
  ]
})
export class PacientesModule { }