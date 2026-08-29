import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EnfermedadesRoutingModule } from './enfermedades-routing.module';
import { EnfermedadesListComponent } from './enfermedades-list/enfermedades-list.component';
import { EnfermedadesFormComponent } from './enfermedades-form/enfermedades-form.component';

@NgModule({
  declarations: [
    EnfermedadesListComponent,
    EnfermedadesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EnfermedadesRoutingModule
  ]
})
export class EnfermedadesModule { }