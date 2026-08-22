import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'RECEPCIONISTA', 'DOCTOR'] }
  },
  {
    path: 'medicos',
    loadChildren: () => import('./pages/medicos/medicos.module').then(m => m.MedicosModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'citas',
    loadChildren: () => import('./pages/citas/citas.module').then(m => m.CitasModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'RECEPCIONISTA', 'DOCTOR'] }
  },
  {
    path: 'enfermedades',
    loadChildren: () => import('./pages/enfermedades/enfermedades.module').then(m => m.EnfermedadesModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'DOCTOR'] }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}