// enfermedades-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnfermedadesListComponent } from './enfermedades-list/enfermedades-list.component';
import { EnfermedadesFormComponent } from './enfermedades-form/enfermedades-form.component';

const routes: Routes = [
  { path: '', component: EnfermedadesListComponent },
  { path: 'nueva', component: EnfermedadesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnfermedadesRoutingModule { }