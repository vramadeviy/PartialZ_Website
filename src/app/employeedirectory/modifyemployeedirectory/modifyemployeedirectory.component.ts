import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataItem } from 'src/app/Dtos/DataItem';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { CitizenDto, EducationDto, EthnicityDto, GenderDto, HandicapDto, NameSuffixDto, RaceDto, StatesDto, VeteranDto, WithHoldingDto } from "../../claim/createclaim/createclaim.component";
@Component({
  selector: 'app-modifyemployeedirectory',
  templateUrl: './modifyemployeedirectory.component.html',
  styleUrls: ['./modifyemployeedirectory.component.scss']
})
export class ModifyemployeedirectoryComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private readonly _partialzService: PartialzService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private dialogRef: MatDialogRef<ModifyemployeedirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataItem,
  ) { }
  employeeDirectoryFormGroup!: FormGroup;
  formImport!: FormGroup;
  selectedCitizen: string = "";
  ngOnInit() {
    console.log(this.data);
    console.log(this.data.claimantFirstName);
    this.employeeDirectoryFormGroup = this._formBuilder.group({
      ssnCtrl: ['', [Validators.required, Validators.minLength(9)]],
      dateofbirthCtrl: ['', Validators.required],
      telephoneNumberCtrl: ['', [Validators.required, Validators.minLength(10)]],
      claimantFirstNameCtrl: ['', Validators.required],
      claimantMICtrl: ['', Validators.required],
      claimantlastnameCtrl: ['', Validators.required],
      claimantsuffixCtrl: [''],
      mailingstreetaddressCtrl: ['', Validators.required],
      mailingcityCtrl: ['', Validators.required],
      mailingstateCtrl: ['', Validators.required],
      zipCodeCtrl: ['', Validators.required],
      citizenCtrl: ['', Validators.required],
      ethnicityCtrl: ['', Validators.required],
      raceCtrl: ['', Validators.required],
      genderCtrl: ['', Validators.required],
      handicapCtrl: ['', Validators.required],
      federalwithHoldingsCtrl: ['', Validators.required],
      veteranStatusCtrl: ['', Validators.required],
      educationCtrl: ['', Validators.required],
      occupationCtrl: [''],
      authorizedalienNumberCtrl: ['']
    });
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
    if (this.data != null) {
      console.log(this.data);
      this.employeeDirectoryFormGroup.setValue({
        ssnCtrl: this.data.socialSecurityNumber,
        dateofbirthCtrl: this.data.dateOfBirth,
        telephoneNumberCtrl: this.data.telephoneNumber,
        claimantFirstNameCtrl: this.data.claimantFirstName,
        claimantMICtrl: this.data.claimantMiddleName,
        claimantlastnameCtrl: this.data.claimantLastName,
        claimantsuffixCtrl: this.data.claimantSuffix,
        mailingstreetaddressCtrl: this.data.mailingStreetAddress,
        mailingcityCtrl: this.data.mailingCity,
        mailingstateCtrl: this.data.mailingState,
        zipCodeCtrl: this.data.zipCode,
        citizenCtrl: this.data.citizen,
        ethnicityCtrl: this.data.ethnicity,
        raceCtrl: this.data.race,
        genderCtrl: this.data.gender,
        handicapCtrl: this.data.handicap,
        federalwithHoldingsCtrl: this.data.federalwithHolding,
        veteranStatusCtrl: this.data.veteranStatus,
        educationCtrl: this.data.education,
        occupationCtrl: this.data.occupation,
        authorizedalienNumberCtrl: this.data.authorizedAlienNumber

      });
    }
  }
  haserror = (item: string, errorName: string) => {
    return this.employeeDirectoryFormGroup.controls[item].hasError(errorName);
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onChange(event: any) {
    let target = event.source.selected._element.nativeElement;
    if (target.innerText.trim() == "No") {
      this.selectedCitizen = "No";
    }
    else {
      this.selectedCitizen = "";
    }
  }
  onSubmit() {
    // stop here if form is invalid
    if (this.employeeDirectoryFormGroup.invalid) {
      return;
    }
    else {
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
      if (ssn !== null && dateofbirth !== null && telephoneNumber !== null &&
        claimantFirstName !== null && claimantMI !== null && claimantlastname !== null &&
        claimantsuffix !== null && mailingstreetaddress !== null && mailingcity !== null &&
        mailingstate !== null && zipCode !== null && citizen !== null && ethnicity !== null &&
        race !== null && gender !== null && handicap !== null &&
        federalwithHoldings !== null && veteranStatus !== null && education !== null &&
        occupation !== null && authorizedalienNumber !== null
      ) {
        const body = {
          SocialSecurityNumber: ssn.value,
          DateOfBirth: dateofbirth.value,
          TelephoneNumber: telephoneNumber.value,
          ClaimantFirstName: claimantFirstName.value,
          ClaimantMiddleName: claimantMI.value,
          ClaimantLastName: claimantlastname.value,
          ClaimantSuffix: claimantsuffix.value,
          MailingStreetAddress: mailingstreetaddress.value,
          MailingCity: mailingcity.value,
          MailingState: mailingstate.value,
          ZipCode: zipCode.value,
          Gender: gender.value,
          Handicap: handicap.value,
          VeteranStatus: veteranStatus.value,
          Race: race.value,
          Ethnicity: ethnicity.value,
          FederalwithHolding: federalwithHoldings.value,
          Citizen: citizen.value,
          Education: education.value,
          Occupation: occupation.value,
          AuthorizedAlienNumber: authorizedalienNumber.value == "0" ? "" : authorizedalienNumber.value,
          Email: localStorage.getItem('email'),
        };
        //
        this.dialogRef.close(body); 
      }
    }
  }
}
