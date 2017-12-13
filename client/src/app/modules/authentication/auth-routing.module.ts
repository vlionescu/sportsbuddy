import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent }           from './auth.component';
import { LoginComponent }          from './routes/login/login.component';
import { RegisterComponent }       from './routes/register/register.component';
import { ForgotPasswordComponent } from './routes/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './routes/change-password/change-password.component';
import { ValidateComponent }       from './routes/validate/validate.component';


const routes: Routes = [];

const authRoutes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'validate', component: ValidateComponent },
  ]},
  { path: '',   redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      authRoutes,
      { enableTracing: false }
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


