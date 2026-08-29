import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';   // ← esta línea es la clave

import { CitasRoutingModule } from './citas-routing.module';
import { CitasListComponent } from './citas-list/citas-list.component';
import { CitasFormComponent } from './citas-form/citas-form.component';

@NgModule({
  declarations: [
    CitasListComponent,
    CitasFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,   // ← y esta línea también
    CitasRoutingModule
  ]
})
export class CitasModule { }