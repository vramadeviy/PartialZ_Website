import { Component, OnInit,Inject,Input } from '@angular/core';
import {Observable, zip} from 'rxjs';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  educationId: number;
  code: string;
}
export interface ErrorDto
{
  SSN: number;
  ErrorMessage:string;

}
@Component({
  selector: 'app-createemployeedirectory',
  templateUrl: './createemployeedirectory.component.html',
  styleUrls: ['./createemployeedirectory.component.scss']
})
export class CreateemployeedirectoryComponent {
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
      private dialogRef: MatDialogRef<CreateemployeedirectoryComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      @Inject(MAT_DIALOG_DATA) public errorData: any,
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
      authorizedalienNumberCtrl:['']
       });
     
       if(this.data!=null)
       {
        if(this.data.citizen ==2)
        {
          this.selectedCitizen= "No";
        }
        else
        {
          this.selectedCitizen="";
        }
        this.isEdit=true;
        console.log("post Data",this.data);
        this.employeeDirectoryFormGroup.setValue({
          ssnCtrl: this.data.ssn ? this.data.ssn : "",
          dateofbirthCtrl: this.data.dateOfBirth,
          telephoneNumberCtrl : this.data.telephoneNumber,
          claimantFirstNameCtrl: this.data.claimantFirstName,
          claimantMICtrl : this.data.claimantMiddleName,
          claimantlastnameCtrl : this.data.claimantLastName,
          claimantsuffixCtrl : this.data.claimantSuffix,
          mailingstreetaddressCtrl : this.data.mailingStreetAddress,
          mailingcityCtrl : this.data.mailingCity,
          mailingstateCtrl : this.data.mailingState,
          zipCodeCtrl : this.data.zipCode,
          citizenCtrl : this.data.citizen,
          ethnicityCtrl : this.data.ethnicity,
          raceCtrl : this.data.race,
          genderCtrl : this.data.gender,
          handicapCtrl : this.data.handicap,
          federalwithHoldingsCtrl : this.data.federalwithHolding,
          veteranStatusCtrl : this.data.veteranStatus,
          educationCtrl : this.data.education,
          occupationCtrl : this.data.occupation,
          authorizedalienNumberCtrl : this.data.authorizedAlienNumber

        });
        this.rawSSNumber = this.data.ssn;
        this.formatSSNumber();
        this.rawPhoneNumber=this.data.telephoneNumber;
       }
      }
      haserror = (item:string , errorName: string) => {
        return this.employeeDirectoryFormGroup.controls[item].hasError(errorName);
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
    this._partialzService.get<any>(environment.apiUrl+'/EmployeeDirectory').subscribe(
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
      onSubmit() {
          this.submitted = true;
          this.button = "Processing";
          this.isLoading = true;
          // stop here if form is invalid
          if (this.employeeDirectoryFormGroup.invalid) {
            this.button = "Submit";          
              this.isLoading = false;
              return;
          }
          else
          {
            const ssn = this.employeeDirectoryFormGroup.get('ssnCtrl'),
            dateofbirth = this.employeeDirectoryFormGroup.get('dateofbirthCtrl'),
            telephoneNumber = this.employeeDirectoryFormGroup.get('telephoneNumberCtrl'),
            claimantFirstName = this.employeeDirectoryFormGroup.get('claimantFirstNameCtrl'),
            claimantMI = this.employeeDirectoryFormGroup.get('claimantMICtrl'),
            claimantlastname = this.employeeDirectoryFormGroup.get('claimantlastnameCtrl'),
            claimantsuffix = this.employeeDirectoryFormGroup.get('claimantsuffixCtrl'),
            mailingstreetaddress = this.employeeDirectoryFormGroup.get('mailingstreetaddressCtrl'),
            mailingcity = this.employeeDirectoryFormGroup.get('mailingcityCtrl'),
            mailingstate = this.employeeDirectoryFormGroup.get('mailingstateCtrl'),
            zipCode = this.employeeDirectoryFormGroup.get('zipCodeCtrl'),
            citizen = this.employeeDirectoryFormGroup.get('citizenCtrl'),
            ethnicity = this.employeeDirectoryFormGroup.get('ethnicityCtrl'),
            race = this.employeeDirectoryFormGroup.get('raceCtrl'),
            gender = this.employeeDirectoryFormGroup.get('genderCtrl'),
            handicap = this.employeeDirectoryFormGroup.get('handicapCtrl'),
            federalwithHoldings = this.employeeDirectoryFormGroup.get('federalwithHoldingsCtrl'),
            veteranStatus = this.employeeDirectoryFormGroup.get('veteranStatusCtrl'),
            education = this.employeeDirectoryFormGroup.get('educationCtrl'),
            occupation = this.employeeDirectoryFormGroup.get('occupationCtrl'),
            authorizedalienNumber = this.employeeDirectoryFormGroup.get('authorizedalienNumberCtrl')

            // if (this.affidavitFormGroup.valid) {
              if(ssn!==null && dateofbirth!==null && telephoneNumber!==null &&
                claimantFirstName!==null && claimantMI!==null && claimantlastname!==null&&
                claimantsuffix!==null && mailingstreetaddress!==null && mailingcity!==null &&
                mailingstate!==null && zipCode!==null && citizen!==null && ethnicity!==null &&
                race!==null && gender!==null && handicap!==null&&
                federalwithHoldings!==null && veteranStatus!==null && education!==null &&
                occupation!==null && authorizedalienNumber!==null 
                ){
                  const body = {
                    SocialSecurityNumber: ssn.value,
                    DateOfBirth: dateofbirth.value,
                    TelephoneNumber :telephoneNumber.value,
                    ClaimantFirstName:claimantFirstName.value,
                    ClaimantMiddleName:claimantMI.value,
                    ClaimantLastName:claimantlastname.value,
                    ClaimantSuffix : claimantsuffix.value,
                    MailingStreetAddress:mailingstreetaddress.value,
                    MailingCity:mailingcity.value,
                    MailingState: mailingstate.value,
                    ZipCode:zipCode.value,
                    Gender:gender.value,
                    Handicap:handicap.value,
                    VeteranStatus:veteranStatus.value,
                    Race:race.value,
                    Ethnicity: ethnicity.value,
                    FederalwithHolding:federalwithHoldings.value,
                    Citizen:citizen.value,
                    Education:education.value,
                    Occupation:occupation.value,
                    AuthorizedAlienNumber:authorizedalienNumber.value=="0"? "" : authorizedalienNumber.value,
                    Email : localStorage.getItem('email'),  
                  };

                 this.EmployeeDirectoryRegistration(body);
                 console.log("passing email", localStorage.getItem('email'));
                 this.dialogRef.close({Email : localStorage.getItem('email')});
                }
          }      
         
         
      }
        //message dispaly
    private showSnackbar(message: string, action: string): void {
      this._snackBar.open(message, action, {
        duration: 6000, // Duration in milliseconds
      });
    }
      EmployeeDirectoryRegistration(body : any): void {
        this._partialzService.post<any>(environment.apiUrl+'/EmployeeDirectory/SaveEmployeeDirectory', body).subscribe(
          (response) => {
            console.log(response);
            if (response==1) {      
              this.showSnackbar("Registered successfully submitted", "OK");
              localStorage.setItem('email',body.EmployerEmail);  
              
                 this.submitted = false;
                 this.employeeDirectoryFormGroup.reset();
    
            } else {
              this.showSnackbar("Something went wrong please try again", "Close");
              
            }
            this.button = "Submit";          
              this.isLoading = false;
          },
          (error) => {
            this.showSnackbar('Error occurred while while processing your request.', "Close");
          }
        );
      }
      formatPhoneNumber() {
        const digits = this.rawPhoneNumber.replace(/\D/g, ''); // Remove non-digits
        const formatted = digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-($2)-($3)');
        this.formattedPhoneNumber = formatted;
        this.rawPhoneNumber = formatted;
      }
      formatSSNumber() {
        const digits = this.rawSSNumber.replace(/\D/g, ''); // Remove non-digits
        const formatted = digits.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
        this.formattedSSNumber = formatted;
        this.rawSSNumber = formatted;
      }
      onReset() {
          this.submitted = false;
          this.employeeDirectoryFormGroup.reset();
      }


  
    
}
