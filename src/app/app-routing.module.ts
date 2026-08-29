import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AuthGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule),
    canActivate: [AuthGuard, permissionGuard],
    data: { permiso: 'PACIENTES_CONSULTAR' }
  },
  {
  path: 'enfermedades',
  loadChildren: () => import('./pages/enfermedades/enfermedades.module').then(m => m.EnfermedadesModule),
  canActivate: [AuthGuard, permissionGuard],
  data: { permiso: 'ENFERMEDADES_CONSULTAR' }
},
  {
    path: 'medicos',
    loadChildren: () => import('./pages/medicos/medicos.module').then(m => m.MedicosModule),
    canActivate: [AuthGuard, permissionGuard],
    data: { permiso: 'MEDICOS_CONSULTAR' }
  },
  {
    path: 'citas',
    loadChildren: () => import('./pages/citas/citas.module').then(m => m.CitasModule),
    canActivate: [AuthGuard, permissionGuard],
    data: { permiso: 'CITAS_CONSULTAR' }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}