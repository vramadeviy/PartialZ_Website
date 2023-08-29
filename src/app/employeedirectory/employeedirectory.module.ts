import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDirectoryRoutingModule } from './employeedirectory-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MaterialModule} from './material-module';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateemployeedirectoryComponent } from './createemployeedirectory/createemployeedirectory.component';
import { ModifyemployeedirectoryComponent } from './modifyemployeedirectory/modifyemployeedirectory.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { LeadingZerosDirective } from './leading-zeros.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateemployeedirectoryComponent,
    ModifyemployeedirectoryComponent,
    FileuploadComponent,
    LeadingZerosDirective
  ],
  imports: [CommonModule, EmployeeDirectoryRoutingModule,MaterialModule,FormsModule,ReactiveFormsModule],
})
export class EmployeeDirectoryModule {}