
import { Component, OnInit, Inject } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DataItem } from 'src/app/Dtos/DataItem';
import { MatTableDataSource } from '@angular/material/table';

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
  states: StatesDto[] = [];
  races: RaceDto[] = [];
  veterans: VeteranDto[] = [];
  withholdings: WithHoldingDto[] = [];
  namesuffixs: NameSuffixDto[] = [];
  handicaps: HandicapDto[] = [];
  genders: GenderDto[] = [];
  ethnicity: EthnicityDto[] = [];
  citizens: CitizenDto[] = [];
  educations: EducationDto[] = [];
  selectedCitizen: string = "";
  button = "Submit";
  isLoading = false;
  isonLoading = false;
  ssn: string = "";
  res: any[] = [];
  formImport!: FormGroup;
// my code
displayedColumns: string[] = [
  'email',
  'socialSecurityNumber',
  'dateOfBirth',
  'telephoneNumber',
  'gender',
  'genderCode',
  'occupation',
  'mailingAddress',
  'claimantFirstName',
  'claimantMiddleName',
  'claimantLastName',
  'claimantSuffix',
  'authorizedAlienNumber',
  'mailingStreetAddress',
  'mailingCity',
  'mailingState',
  'mailingStateCode',
  'zipCode',
  'handicap',
  'veteranStatus',
  'race',
  'ethnicity',
  'federalwithHolding',
  'citizen',
  'education'
];
dataSource = new MatTableDataSource<DataItem>;;
//end

  constructor(private _formBuilder: FormBuilder,
    private readonly _partialzService: PartialzService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateemployeedirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.bindStates();
    this.bindDropDowns();

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
        ssnCtrl: this.data.ssn,
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
  changeValue(e: any) {
    this.isonLoading = true;
    this.value = this.value + 10;
    var ssn = e.target.value;
    this._partialzService.get<any>('https://localhost:7178/api/EmployeeDirectory/EmployeeDirectoryClaimantDetails?ssn=' + ssn).subscribe(
      (data) => {
        if (data.citizen == "AUTHORIZEDALIEN") {
          this.selectedCitizen = "AUTHORIZEDALIEN";
        }
        else {
          this.selectedCitizen = "";
        }
        if (data != null) {
          this.employeeDirectoryFormGroup.setValue({
            ssnCtrl: ssn,
            dateofbirthCtrl: data.dateOfBirth,
            telephoneNumberCtrl: data.telephoneNumber,
            claimantFirstNameCtrl: data.claimantFirstName,
            claimantMICtrl: data.claimantMiddleName,
            claimantlastnameCtrl: data.claimantLastName,
            claimantsuffixCtrl: data.claimantSuffix,
            mailingstreetaddressCtrl: data.mailingStreetAddress,
            mailingcityCtrl: data.mailingCity,
            mailingstateCtrl: data.mailingState,
            zipCodeCtrl: data.zipCode,
            citizenCtrl: data.citizen,
            ethnicityCtrl: data.ethnicity,
            raceCtrl: data.race,
            genderCtrl: data.gender,
            handicapCtrl: data.handicap,
            federalwithHoldingsCtrl: data.federalwithHolding,
            veteranStatusCtrl: data.veteranStatus,
            educationCtrl: data.education,
            occupationCtrl: data.occupation,
            authorizedalienNumberCtrl: data.authorizedAlienNumber

          });
        }
        this.isonLoading = false;
        this.value = 0;
      });

  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // convenience getter for easy access to form fields
  get f() { return this.employeeDirectoryFormGroup.controls; }
  bindStates() {
    this._partialzService.get<any>('https://localhost:7178/api/EmployeeDirectory').subscribe(
      (data) => {
        this.states = data;
      });
  }
  bindDropDowns() {
    this._partialzService.get<any>('https://localhost:7178/api/EmployeeDirectory/DropDownList').subscribe(
      (data) => {
        this.races = data.raceDto;
        this.veterans = data.veteranDto;
        this.withholdings = data.withholdingDto;
        this.namesuffixs = data.nameSuffixDto;

        this.handicaps = data.handicapDto;
        this.genders = data.genderDto;
        this.ethnicity = data.ethnicityDto;
        this.citizens = data.citizenDto;
        this.educations = data.educationDto;
      });
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
    this.submitted = true;
    this.button = "Processing";
    this.isLoading = true;
    // stop here if form is invalid
    if (this.employeeDirectoryFormGroup.invalid) {
      return;
    }
    else {
      this.isLoading = true;
      this.button = "Processing";
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
        this.EmployeeDirectoryRegistration(body);
        this.dialogRef.close();
        this.submitted = false;
        this.employeeDirectoryFormGroup.reset();
      }
    }

    this.button = "Submit";
    this.isLoading = false;
  }
  //message dispaly
  private showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 6000, // Duration in milliseconds
    });
  }
  EmployeeDirectoryRegistration(body: any): void {
    this._partialzService.post<any>('https://localhost:7178/api/EmployeeDirectory/SaveEmployeeDirectory', body).subscribe(
      (response) => {
        if (response == 1) {
          this.showSnackbar("Registered successfully submitted", "OK");
          localStorage.setItem('email', body.EmployerEmail);

          this.isLoading = false;
          this.button = "Submit";

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
    this.employeeDirectoryFormGroup.reset();
  }


  onFileChange(event: any) {
    console.log(event);
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      console.log(event);
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        console.log("data:", this.data);
        const transformedData: DataItem[] = this.data.slice(1).map((row: any) => {
          return {
            email: row[0],
            socialSecurityNumber: row[1],
            dateOfBirth: new Date(row[2]),
            telephoneNumber: row[3],
            gender: row[4],
            genderCode: row[5],
            occupation: row[6],
            mailingAddress: row[7],
            claimantFirstName: row[8],
            claimantMiddleName: row[9],
            claimantLastName: row[10],
            claimantSuffix: row[11],
            authorizedAlienNumber: row[12],
            mailingStreetAddress: row[13],
            mailingCity: row[14],
            mailingState: row[15],
            mailingStateCode: row[16],
            zipCode: row[17],
            handicap: row[18],
            veteranStatus: row[19],
            race: row[20],
            ethnicity: row[21],
            federalwithHolding: row[22],
            citizen: row[23],
            education: row[24],
            validation:true
          };
        });        
        this.dataSource = new MatTableDataSource<DataItem>(transformedData);
        // this.data.map((res: any) => {
        //   if (res[0] === "no") {
        //     console.log(res[0]);
        //   } else {
        //     console.log(res[0]);
        //   }
        // })
      };
      reader.readAsBinaryString(target.files[0]);
    }

  }
  OpenEditDialog(currentRow:DataItem){
    alert('open me in edit dailog:-'+currentRow.claimantFirstName + currentRow);
    /* create EditDialogComponent or you can use if you have it alredy.  
     recive the data in component onload and bind it to html elements like text box, drowdown etc.
    */
    // const dialogRef = this.dialog.open(EditDialogComponent, {
    //   data: currentRow,
    // });
    // /* after click on mydify/save buttion on above diloag, below code will update the data source. */
    //   dialogRef.afterClosed().subscribe((updatedRow:DataItem) => {
    //     if (updatedRow) {
    //       /* Find the index of the updated row in the data source */
    //      const index = this.dataSource.data.findIndex(row => row === currentRow);
          
    //       /*  Update the data source with the updated row */
    //       if (index !== -1) {
    //         this.dataSource.data[index] = updatedRow;
    //         this.dataSource = new MatTableDataSource<DataItem>(this.dataSource.data);
    //       }
    //     }
    //   });
  }
}
