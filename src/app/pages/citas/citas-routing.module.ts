import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasListComponent } from './citas-list/citas-list.component';
import { CitasFormComponent } from './citas-form/citas-form.component';

const routes: Routes = [
  { path: '', component: CitasListComponent },
  { path: 'nueva', component: CitasFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }