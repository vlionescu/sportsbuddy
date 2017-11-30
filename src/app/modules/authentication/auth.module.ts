import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent }                from './auth.component';
import { LoginComponent }               from './routes/login/login.component';
import { RegisterComponent }        from './routes/register/register.component';
import { RegisterPreferencesComponent } from './routes/register-preferences/register-preferences.component';
import { ValidateComponent }            from './routes/validate/validate.component';

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
    RegisterPreferencesComponent,
    ValidateComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
