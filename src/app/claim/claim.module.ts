import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimRoutingModule } from './claim-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MaterialModule} from './material-module';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateclaimComponent } from './createclaim/createclaim.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { ModifyclaimComponent } from './modifyclaim/modifyclaim.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateclaimComponent,
    FileuploadComponent,
    ModifyclaimComponent
  ],
  imports: [CommonModule, ClaimRoutingModule,MaterialModule,FormsModule,ReactiveFormsModule],
})
export class ClaimModule {}
