import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDirectoryRoutingModule } from './employeedirectory-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MaterialModule} from './material-module';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateemployeedirectoryComponent } from './createemployeedirectory/createemployeedirectory.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateemployeedirectoryComponent
  ],
  imports: [CommonModule, EmployeeDirectoryRoutingModule,MaterialModule,FormsModule,ReactiveFormsModule],
})
export class EmployeeDirectoryModule {}