import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { CallbackComponent } from './modules/auth/login/callback.component';
import { LoginComponent } from './modules/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'callback', component: CallbackComponent }, 
  { path: 'auth/login', component: LoginComponent },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  {
    path: 'pacientes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/pacientes/pacientes.module').then(m => m.PacientesModule)
  },

  {
    path: 'citas',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/citas/citas.module').then(m => m.CitasModule)
  },

  {
    path: 'expedientes-medicos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/expedientes-medicos/expedientes-medicos.module')
        .then(m => m.ExpedientesMedicosModule)
  },

  {
    path: 'doctores',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/doctores/doctores.module').then(m => m.DoctoresModule)
  },

  {
    path: 'reportes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/reportes/reportes.module').then(m => m.ReportesModule)
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
