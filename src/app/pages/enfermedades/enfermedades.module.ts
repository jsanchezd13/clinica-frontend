import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermedadesRoutingModule } from './enfermedades-routing.module';
import { EnfermedadesListComponent } from './enfermedades-list/enfermedades-list.component';


@NgModule({
  declarations: [
    EnfermedadesListComponent
  ],
  imports: [
    CommonModule,
    EnfermedadesRoutingModule
  ]
})
export class EnfermedadesModule { }
