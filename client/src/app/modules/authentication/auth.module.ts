import { NgModule }     from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AuthComponent }           from './auth.component';
import { LoginComponent }          from './routes/login/login.component';
import { RegisterComponent }       from './routes/register/register.component';
import { ValidateComponent }       from './routes/validate/validate.component';
import { ForgotPasswordComponent } from './routes/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './routes/change-password/change-password.component';

import { AlertComponent } from '../../shared/components/alert/alert.component';

import { AuthService } from './services/auth.service';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [
    AlertComponent,
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
