import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';

@NgModule({
  declarations: [PacientesListComponent],
  imports: [CommonModule],
  exports: [PacientesListComponent]  
})
export class PacientesModule { }