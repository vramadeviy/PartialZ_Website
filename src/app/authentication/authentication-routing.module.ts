import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockedComponent } from './locked/locked.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { EmployerauthenticationComponent } from './employerauthentication/employerauthentication.component';
import { AffidavitComponent } from './affidavit/affidavit.component';
import { TermsandtonditionsComponent } from './termsandtonditions/termsandtonditions.component';
import { AffidavitreportComponent } from './affidavitreport/affidavitreport.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'employerauthentication',
    component: EmployerauthenticationComponent,
  },
  {
    path: 'affidavit',
    component: AffidavitComponent,
  },
  {
    path: 'termsandtonditions',
    component: TermsandtonditionsComponent,
  },
  {
    path: 'affidavitreport',
    component: AffidavitreportComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
