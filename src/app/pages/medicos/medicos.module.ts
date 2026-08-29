// medicos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosListComponent } from './medicos-list/medicos-list.component';
import { MedicoFormComponent } from './medicos-form/medico-form.component';

@NgModule({
  declarations: [
    MedicosListComponent,
    MedicoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MedicosRoutingModule
  ]
})
export class MedicosModule { }