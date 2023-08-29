import { Component, OnInit,Inject,Input } from '@angular/core';
import {Observable, zip} from 'rxjs';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { environment } from 'src/environments/environment';

export interface StatesDto {
  stateId: number;
  stateCode: string;
}
export interface RaceDto {
  raceId: number;
  code: string;
}
export interface VeteranDto {
  veteranId: number;
  code: string;
}
export interface WithHoldingDto {
  withholdingsId: number;
  code: string;
}
export interface NameSuffixDto {
  nameSuffixId: number;
  code: string;
}
export interface HandicapDto {
  handicapId: number;
  code: string;
}
export interface GenderDto {
  genderId: number;
  code: string;
}
export interface EthnicityDto {
  ethnicityId: number;
  code: string;
}
export interface CitizenDto {
  citizenId: number;
  code: string;
}
export interface EducationDto {
  //educationId: number;
  code: string;
}
export interface ErrorDto
{
  SSN: number;
  ErrorMessage:string;

}
@Component({
  selector: 'app-modifyemployeedirectory',
  templateUrl: './modifyemployeedirectory.component.html',
  styleUrls: ['./modifyemployeedirectory.component.scss']
})
export class ModifyemployeedirectoryComponent {
  value = 0;
  loading = true;
  registerForm!: FormGroup;
    submitted = false;
    employeeDirectoryFormGroup!: FormGroup;
    currentFile?: File;
    progress = 0;
    message = '';
    public file: File | null = null;
    fileName = 'Select File';
    states:StatesDto[]=[];
    races:RaceDto[]=[];
    veterans:VeteranDto[]=[];
    withholdings: WithHoldingDto[]=[];
    namesuffixs: NameSuffixDto[]=[];
    handicaps: HandicapDto[]=[];
    genders: GenderDto[]=[];
    ethnicity: EthnicityDto[]=[];
    citizens: CitizenDto[]=[];
    educations: EducationDto[]=[];
    selectedCitizen: string="";
  button = "Submit";
  isLoading = false;
  isonLoading=false;
  ssn:string=""; 
  res:any[]=[];
  transformedData:any[]=[];
  @Input() max: any;
  formImport!: FormGroup;
  isEdit =false;
  minDate = new Date();
  maxDate = new Date();
  rawPhoneNumber: string = ''; // For storing the raw input
  formattedPhoneNumber: string = ''; // For storing the formatted value
  rawSSNumber: string = ''; // For storing the raw input
  formattedSSNumber: string = ''; // For storing the formatted value
  selectedDate:Date;
  constructor(private _formBuilder: FormBuilder,
    private readonly _partialzService: PartialzService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private dialogRef: MatDialogRef<ModifyemployeedirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public errorData: any,
    private dialogref: MatDialogRef<FileuploadComponent>
    ) {  
      const today = new Date();
  this.maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate(), 0, 0, 0); // Set time to midnight
  this.minDate = new Date(today.getFullYear() - 150, today.getMonth(), today.getDate(), 0, 0, 0); // Set time to midnight
  this.selectedDate = this.minDate;
      }


  ngOnInit() {      
    this.bindStates();
    this.bindDropDowns();   
    this.isEdit=false;

  this.employeeDirectoryFormGroup = this._formBuilder.group({
   ssnCtrl: ['', [Validators.required]],
   dateofbirthCtrl:['',Validators.required],
   telephoneNumberCtrl:['',[Validators.required]],
   claimantFirstNameCtrl: ['',Validators.required],
   claimantMICtrl : ['',Validators.required],
   claimantlastnameCtrl: ['',Validators.required],
   claimantsuffixCtrl : ['',Validators.required],
   mailingstreetaddressCtrl: ['',Validators.required],
   mailingcityCtrl: ['',Validators.required],
   mailingstateCtrl: ['',Validators.required],
   zipCodeCtrl: ['',Validators.required], 
   citizenCtrl: ['',Validators.required],
   ethnicityCtrl: ['',Validators.required],
   raceCtrl: ['',Validators.required],
   genderCtrl: ['',Validators.required], 
   handicapCtrl: ['',Validators.required],
   federalwithHoldingsCtrl:['',Validators.required],
   veteranStatusCtrl:['',Validators.required],
   educationCtrl:['',Validators.required],
   occupationCtrl:['',Validators.required],
   authorizedalienNumberCtrl:[''],

    });
    console.log("post Data",this.data);
    if(this.data!=null)
    {
      console.log("citizen", this.data.citizen);
     if(this.data.citizen == "NO")
     {
       this.selectedCitizen= "NO";
     }
     else
     {
       this.selectedCitizen="";
     }
     this.isEdit=true;
    
     this.transformedData=this.data.transformedData;
     console.log("authorization",this.selectedCitizen);
     this.employeeDirectoryFormGroup.setValue({
       ssnCtrl: this.data.ssn ? this.data.ssn : "",
       dateofbirthCtrl: new Date(this.data.dateOfBirth),
       telephoneNumberCtrl : this.data.telephoneNumber,
       claimantFirstNameCtrl: this.data.claimantFirstName,
       claimantMICtrl : this.data.claimantMiddleName,
       claimantlastnameCtrl : this.data.claimantLastName,
       claimantsuffixCtrl : this.data.claimantSuffix,
       mailingstreetaddressCtrl : this.data.mailingStreetAddress,
       mailingcityCtrl : this.data.mailingCity,
       mailingstateCtrl : this.data.mailingState=="0"? null :this.data.mailingState,
       zipCodeCtrl : this.data.zipCode ,
       citizenCtrl : this.data.citizen,
       ethnicityCtrl : this.data.ethnicity=="0"? null :this.data.ethnicity,
       raceCtrl : this.data.race=="0"? null :this.data.race,
       genderCtrl : this.data.gender =="0"? null : this.data.gender,
       handicapCtrl : this.data.handicap=="0"? null :this.data.handicap,
       federalwithHoldingsCtrl : this.data.federalwithHolding=="0"? null :this.data.federalwithHolding,
       veteranStatusCtrl : this.data.veteranStatus=="0"? null :this.data.veteranStatus,
       educationCtrl : this.data.education=="0"? null :this.data.education,
       occupationCtrl : this.data.occupation,
       authorizedalienNumberCtrl : this.data.authorizedAlienNumber=="0"? null :this.data.authorizedAlienNumber

     });
     this.rawSSNumber=this.data.ssn;
     this.rawPhoneNumber=this.data.telephoneNumber;
    }
   }
   onSubmit() {
    console.log(this.employeeDirectoryFormGroup.valid);
    if(this.employeeDirectoryFormGroup.valid)
    {
      console.log(this.employeeDirectoryFormGroup.get('mailingcityCtrl')?.value);
    const body = {
      SocialSecurityNumber: this.employeeDirectoryFormGroup.get('ssnCtrl')?.value,
      DateOfBirth: this.employeeDirectoryFormGroup.get('dateofbirthCtrl')?.value,
      TelephoneNumber : this.employeeDirectoryFormGroup.get('telephoneNumberCtrl')?.value,
      ClaimantFirstName: this.employeeDirectoryFormGroup.get('claimantFirstNameCtrl')?.value,
      ClaimantMiddleName: this.employeeDirectoryFormGroup.get('claimantMICtrl')?.value,
      ClaimantLastName: this.employeeDirectoryFormGroup.get('claimantlastnameCtrl')?.value,
      ClaimantSuffix : this.employeeDirectoryFormGroup.get('claimantsuffixCtrl')?.value,
      MailingStreetAddress: this.employeeDirectoryFormGroup.get('mailingstreetaddressCtrl')?.value,
      MailingCity: this.employeeDirectoryFormGroup.get('mailingcityCtrl')?.value,
      MailingState:  this.employeeDirectoryFormGroup.get('mailingstateCtrl')?.value,
      ZipCode: this.employeeDirectoryFormGroup.get('zipCodeCtrl')?.value,
      Gender:  this.employeeDirectoryFormGroup.get('genderCtrl')?.value,
      Handicap: this.employeeDirectoryFormGroup.get('handicapCtrl')?.value,
      VeteranStatus: this.employeeDirectoryFormGroup.get('veteranStatusCtrl')?.value,
      Race: this.employeeDirectoryFormGroup.get('raceCtrl')?.value,
      Ethnicity: this.employeeDirectoryFormGroup.get('ethnicityCtrl')?.value,
      FederalwithHolding: this.employeeDirectoryFormGroup.get('federalwithHoldingsCtrl')?.value,
      Citizen: this.employeeDirectoryFormGroup.get('citizenCtrl')?.value,
      Education: this.employeeDirectoryFormGroup.get('educationCtrl')?.value,
      Occupation: this.employeeDirectoryFormGroup.get('occupationCtrl')?.value,
      AuthorizedAlienNumber: this.employeeDirectoryFormGroup.get('authorizedalienNumberCtrl')?.value
    };
    console.log("modified window data", body);
    this.dialogref.close({ data: body });
   }
   }

   haserror = (item:string , errorName: string) => {
    return this.employeeDirectoryFormGroup.controls[item].hasError(errorName);
  }
 
  onChange(event:any)
  {
    let target = event.source.selected._element.nativeElement;
    if(target.innerText.trim() =="NO")
    {
      this.selectedCitizen= "NO";
    }
    else
    {
      this.selectedCitizen="";
    }
  }
 
numberOnly(event:any): boolean {
const charCode = (event.which) ? event.which : event.keyCode;
if (charCode > 31 && (charCode < 48 || charCode > 57)) {
return false;
}
return true;
}
  // convenience getter for easy access to form fields
  get f() { return this.employeeDirectoryFormGroup.controls; }
   bindStates()
   {
     this._partialzService.get<any>( environment.apiUrl+'/EmployeeDirectory').subscribe(
       (data) => {
        
          this.states =data;
       });
   }
   bindDropDowns()
   {
    this._partialzService.get<any>(environment.apiUrl+'/EmployeeDirectory/DropDownList').subscribe(
       (data) => { 
          this.races =data.raceDto;
          this.veterans =data.veteranDto;
          this.withholdings =data.withholdingDto;
          this.namesuffixs =data.nameSuffixDto;
 
          this.handicaps =data.handicapDto;
          this.genders =data.genderDto;
          this.ethnicity =data.ethnicityDto;
          this.citizens =data.citizenDto;
          this.educations =data.educationDto;
       });
   }
   formatPhoneNumber() {
    const digits = this.rawPhoneNumber.replace(/\D/g, ''); // Remove non-digits
    const formatted = digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-($2)-($3)');
    this.formattedPhoneNumber = formatted;
    this.rawPhoneNumber = formatted;
  }
  formatSSNumber() {
    const digits = this.rawSSNumber.replace(/\D/g, ''); // Remove non-digits
    const formatted = digits.replace(/(\d{3})(\d{2})(\d{4})/, '($1)-($2)-($3)');
    this.formattedSSNumber = formatted;
    this.rawSSNumber = formatted;
  }
  onReset() {
      this.submitted = false;
      this.employeeDirectoryFormGroup.reset();
      this.selectedCitizen="";
  }
}
