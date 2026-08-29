// medicos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosListComponent } from './medicos-list/medicos-list.component';
import { MedicoFormComponent } from './medicos-form/medico-form.component';

const routes: Routes = [
  { path: '', component: MedicosListComponent },
  { path: 'nuevo', component: MedicoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }