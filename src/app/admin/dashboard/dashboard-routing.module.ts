import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardComponent as ClaimDashboard } from 'src/app//claim/dashboard/dashboard.component';
import { DashboardComponent as EmployeeDirectoryDashboard } from 'src/app//employeedirectory/dashboard/dashboard.component';
import { DashboardComponent as ReportDashboard } from 'src/app//report/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'dashboard2',
    component: Dashboard2Component,
  },
  {
    path: 'claim-dashboard',
    component: ClaimDashboard,
  },
  {
    path: 'employeedirectory-dashboard',
    component: EmployeeDirectoryDashboard,
  },
  {
    path: 'report-dashboard',
    component: ReportDashboard,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
