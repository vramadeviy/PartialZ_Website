import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material-module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [CommonModule, ReportRoutingModule,FormsModule,ReactiveFormsModule,MaterialModule],
})
export class ReportModule {}