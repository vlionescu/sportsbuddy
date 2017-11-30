import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthComponent }                 from './auth.component';
import { LoginComponent }               from './routes/login/login.component';
import { RegisterComponent }        from './routes/register/register.component';
import { RegisterPreferencesComponent } from './routes/register-preferences/register-preferences.component';
import { ValidateComponent }            from './routes/validate/validate.component';

const routes: Routes = [];

const authRoutes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
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


