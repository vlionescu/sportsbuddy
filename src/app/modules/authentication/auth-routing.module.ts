import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthComponent }                 from './auth.component';
import { LoginComponent }               from './routes/login/login.component';
import { RegisterDataComponent }        from './routes/register-data/register-data.component';
import { RegisterPreferencesComponent } from './routes/register-preferences/register-preferences.component';
import { ValidateComponent }            from './routes/validate/validate.component';

const routes: Routes = [];

const authRoutes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register-data', component: RegisterDataComponent },
    { path: 'register-preferences', component: RegisterPreferencesComponent },
    { path: 'validate', component: ValidateComponent },
  ]},
  { path: '',   redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      authRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }


