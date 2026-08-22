import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosListComponent } from './medicos-list/medicos-list.component';


@NgModule({
  declarations: [
    MedicosListComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule
  ]
})
export class MedicosModule { }
