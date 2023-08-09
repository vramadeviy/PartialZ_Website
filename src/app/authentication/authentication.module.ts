import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { Page500Component } from './page500/page500.component';
import { Page404Component } from './page404/page404.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LockedComponent } from './locked/locked.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployerauthenticationComponent } from './employerauthentication/employerauthentication.component';
import { AffidavitComponent } from './affidavit/affidavit.component';
import { TermsandtonditionsComponent } from './termsandtonditions/termsandtonditions.component';
import {MaterialModule} from './material-module';
import { AffidavitreportComponent } from './affidavitreport/affidavitreport.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    Page500Component,
    Page404Component,
    SigninComponent,
    SignupComponent,
    LockedComponent,
    ForgotPasswordComponent,
    EmployerauthenticationComponent,
    AffidavitComponent,
    TermsandtonditionsComponent,
    AffidavitreportComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,    
    MaterialModule
  ],
})
export class AuthenticationModule {}
