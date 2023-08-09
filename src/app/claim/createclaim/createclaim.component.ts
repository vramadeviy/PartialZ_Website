import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  withholdingId: number;
  code: string;
}
export interface OtherWageDto {
  otherwageId: number;
  code: string;
}
export interface NameSuffixDto {
  namesuffixId: number;
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
@Component({
  selector: 'app-createclaim',
  templateUrl: './createclaim.component.html',
  styleUrls: ['./createclaim.component.scss']
})
export class CreateclaimComponent {

  registerForm!: FormGroup;
  submitted = false;
  ClaimFormGroup!: FormGroup;
  currentFile?: File;
  progress = 0;
  message = '';
  public file: File | null = null;
  fileName = 'Select File';
 
  states:StatesDto[]=[];
  races:RaceDto[]=[];
  veterans:VeteranDto[]=[];
  withholdings: WithHoldingDto[]=[];
  otherwages: OtherWageDto[]=[];
  namesuffixs: NameSuffixDto[]=[];
  handicaps: HandicapDto[]=[];
  genders: GenderDto[]=[];
  ethnicity: EthnicityDto[]=[];
  citizens: CitizenDto[]=[];
  educations: EducationDto[]=[];
button = "Submit Claim";
isLoading = false;

  constructor(private _formBuilder: FormBuilder,private readonly _partialzService: PartialzService,
   private _snackBar: MatSnackBar) { }

  ngOnInit() {
     this.bindStates();
    this.bindDropDowns();
   this.ClaimFormGroup = this._formBuilder.group({
       ssnCtrl: ['', [Validators.required, Validators.minLength(15)]],           
       employeraccountnumberCtrl: ['',Validators.required],
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
       telephoneNumberCtrl:['',[Validators.required, Validators.minLength(10)]],
       dateofbirthCtrl:['',Validators.required],
       veteranStatusCtrl:['',Validators.required],
       educationCtrl:['',Validators.required],
       occupationCtrl:['',Validators.required],
       authorizedalienNumberCtrl:['',Validators.required],
       weekendingdateCtrl: ['',Validators.required],
       lastdateworkedCtrl:['',Validators.required],
       earningsCtrl:['',Validators.required],
       vacationPayCtrl: ['',Validators.required],
       holidayPayCtrl: ['',Validators.required],
       otherPayCtrl : ['',Validators.required],
       otherstatewagesCtrl:['',Validators.required]
     });
    
    }
    haserror = (item:string , errorName: string) => {
     return this.ClaimFormGroup.controls[item].hasError(errorName);
   }
   
numberOnly(event:any): boolean {
const charCode = (event.which) ? event.which : event.keyCode;
if (charCode > 31 && (charCode < 48 || charCode > 57)) {
return false;
}
return true;
}
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    bindStates()
    {
      this._partialzService.get<any>('https://localhost:7178/api/EmployeeDirectory').subscribe(
        (data) => { 
           this.states =data;
        });
    }
    bindDropDowns()
    {
     this._partialzService.get<any>('https://localhost:7178/api/EmployeeDirectory/DropDownList').subscribe(
        (data) => { 
         console.log(data);
           this.races =data.raceDto;
           this.veterans =data.veteranDto;
           this.withholdings =data.withholdingDto;
           this.otherwages =data.otherWageDto;
           this.namesuffixs =data.nameSuffixDto;

           this.handicaps =data.handicapDto;
           this.genders =data.genderDto;
           this.ethnicity =data.ethnicityDto;
           this.citizens =data.citizenDto;
           this.educations =data.educationDto;
        });
    }
    onSubmit() {
        this.submitted = true;
        
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        else
        {
          this.isLoading=true;
          this.button ="Processing";
          const ssn = this.ClaimFormGroup.get('ssnCtrl'),
          dateofbirth = this.ClaimFormGroup.get('dateofbirthCtrl'),
          telephoneNumber = this.ClaimFormGroup.get('telephoneNumberCtrl'),
          claimantFirstName = this.ClaimFormGroup.get('claimantFirstNameCtrl'),
          claimantMI = this.ClaimFormGroup.get('claimantMICtrl'),
          claimantlastname = this.ClaimFormGroup.get('claimantlastnameCtrl'),
          claimantsuffix = this.ClaimFormGroup.get('claimantsuffixCtrl'),
          mailingstreetaddress = this.ClaimFormGroup.get('mailingstreetaddressCtrl'),
          mailingcity = this.ClaimFormGroup.get('mailingcityCtrl'),
          mailingstate = this.ClaimFormGroup.get('mailingstateCtrl'),
          zipCode = this.ClaimFormGroup.get('zipCodeCtrl'),
          citizen = this.ClaimFormGroup.get('citizenCtrl'),
          ethnicity = this.ClaimFormGroup.get('ethnicityCtrl'),
          race = this.ClaimFormGroup.get('raceCtrl'),
          gender = this.ClaimFormGroup.get('genderCtrl'),
          handicap = this.ClaimFormGroup.get('handicapCtrl'),
          federalwithHoldings = this.ClaimFormGroup.get('federalwithHoldingsCtrl'),
          veteranStatus = this.ClaimFormGroup.get('veteranStatusCtrl'),
          education = this.ClaimFormGroup.get('educationCtrl'),
          occupation = this.ClaimFormGroup.get('occupationCtrl'),
          authorizedalienNumber = this.ClaimFormGroup.get('authorizedalienNumberCtrl'),
          
          weekendingdate = this.ClaimFormGroup.get('weekendingdateCtrl'),
          lastdateworked = this.ClaimFormGroup.get('lastdateworkedCtrl'),
          earnings = this.ClaimFormGroup.get('earningsCtrl'),
          vacationPay = this.ClaimFormGroup.get('vacationPayCtrl'),
          holidayPay = this.ClaimFormGroup.get('holidayPayCtrl'),
          otherPay = this.ClaimFormGroup.get('otherPayCtrl'),
          otherstatewages = this.ClaimFormGroup.get('otherstatewagesCtrl')
           
           
          // if (this.affidavitFormGroup.valid) {
            if(ssn!==null && dateofbirth!==null && telephoneNumber!==null &&
              claimantFirstName!==null && claimantMI!==null && claimantlastname!==null&&
              claimantsuffix!==null && mailingstreetaddress!==null && mailingcity!==null &&
              mailingstate!==null && zipCode!==null && citizen!==null && ethnicity!==null &&
              race!==null && gender!==null && handicap!==null&&
              federalwithHoldings!==null && veteranStatus!==null && education!==null &&
              occupation!==null && authorizedalienNumber!==null  && weekendingdate !==null &&
              lastdateworked!==null && earnings!==null && vacationPay!==null &&
              holidayPay!==null && otherPay!==null && otherstatewages!==null
              ){
                const body = {
                 Email : localStorage.getItem('email'),
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
                  AuthorizedAlienNumber:authorizedalienNumber.value,
                  WeekEndingDate : weekendingdate.value,
                  LastDateWorked: lastdateworked.value,
                  Earnings : earnings.value,
                  VacationPay : vacationPay.value,
                  HolidayPay : holidayPay.value,
                  OtherPay : otherPay.value,
                  OtherStateWages : otherstatewages.value

                };
               this.ClaimSubmission(body);
               this.button = "Submit Claim";
               this.isLoading = false;
              }

        }
        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.ClaimFormGroup.value, null, 4));
    }
    private showSnackbar(message: string, action: string): void {
     this._snackBar.open(message, action, {
       duration: 6000, // Duration in milliseconds
     });
   }
    ClaimSubmission(body : any): void {
     this._partialzService.post<any>('https://localhost:7178/api/Claim/SaveClaim', body).subscribe(
       (response) => {
         if (response == 1) {      
           this.showSnackbar("Claim successfully submitted", "OK");
           localStorage.setItem('email',body.EmployerEmail);
 
           console.log(body);
           const params = {           
             SocialSecurityNumber: body.value,
             DateOfBirth: body.value,
             TelephoneNumber :body.value,
             ClaimantFirstName:body.value,
             ClaimantMiddleName:body.value,
             ClaimantLastName:body.value,
             ClaimantSuffix : body.value,
             MailingStreetAddress:body.value,
             MailingCity:body.value,
             MailingState: body.value,
             ZipCode:body.value,
             Gender:body.value,
             Handicap:body.value,
             VeteranStatus:body.value,
             Race:body.value,
             Ethnicity: body.value,
             FederalwithHolding:body.value,
             Citizen:body.value,
             Education:body.value,
             Occupation:body.value,
             AuthorizedAlienNumber:body.value,
             WeekEndingDate : body.value,
                  LastDateWorked: body.value,
                  Earnings : body.value,
                  VacationPay : body.value,
                  HolidayPay : body.value,
                  OtherPay : body.value,
                  OtherStateWages : body.value
            } ;
            this.isLoading=false;
            this.button ="Submit Claim";
 
         } else {
           this.showSnackbar("Something went wrong please try again", "Close");
         }
       },
       (error) => {
         this.showSnackbar('Error occurred while while processing your request.', "Close");
       }
     );
   }
    onReset() {
        this.submitted = false;
        this.ClaimFormGroup.reset();
    }
}
