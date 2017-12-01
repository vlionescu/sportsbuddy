import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent }           from './auth.component';
import { LoginComponent }          from './routes/login/login.component';
import { RegisterComponent }       from './routes/register/register.component';
import { ValidateComponent }       from './routes/validate/validate.component';
import { ForgotPasswordComponent } from './routes/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './routes/change-password/change-password.component';

import { AuthService } from './services/auth.service';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ValidateComponent,
    ChangePasswordComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
