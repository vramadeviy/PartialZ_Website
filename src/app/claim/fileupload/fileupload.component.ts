import { Component, OnInit,ViewChild,Inject,Input,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { DataItem } from 'src/app/Dtos/DataItem';
import { MatTableDataSource } from '@angular/material/table';
import { ModifyclaimComponent } from '../modifyclaim/modifyclaim.component';
import {FormControl} from '@angular/forms';
import { formatDate } from '@angular/common';  
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})


export class FileuploadComponent {
  displayedColumns= [
    { def: 'index', label: 'index', hide: false},
    { def: 'socialSecurityNumber', label: 'socialSecurityNumber', hide: false},
    { def: 'dateOfBirth', label: 'dateOfBirth', hide: true},
    { def: 'claimantFirstName', label: 'claimantFirstName', hide: true},
    { def: 'claimantMiddleName', label: 'claimantMiddleName', hide: true},
    { def: 'claimantLastName', label: 'claimantLastName', hide: true},
    { def: 'claimantSuffix', label: 'claimantSuffix', hide: true},
    { def: 'gender', label: 'gender', hide: true},
    { def: 'genderCode', label: 'genderCode', hide: true},
    { def: 'occupation', label: 'occupation', hide: true},
    { def: 'mailingStreetAddress', label: 'mailingStreetAddress', hide: true},
    { def: 'mailingCity', label: 'mailingCity', hide: true},

    { def: 'mailingState', label: 'mailingState', hide: true},
    { def: 'mailingStateCode', label: 'mailingStateCode', hide: true},
    { def: 'zipCode', label: 'zipCode', hide: true},
    { def: 'citizen', label: 'citizen', hide: true},
    { def: 'ethnicity', label: 'ethnicity', hide: true},
    { def: 'race', label: 'race', hide: true},
    { def: 'handicap', label: 'handicap', hide: true},
    { def: 'federalwithHolding', label: 'federalwithHolding', hide: true},
    { def: 'veteranStatus', label: 'veteranStatus', hide: true},
    { def: 'education', label: 'education', hide: true},
    { def: 'authorizedAlienNumber', label: 'authorizedAlienNumber', hide: true},
    { def: 'errorMessage', label: 'ErrorMessage', hide: false},
    { def: 'actions', label: 'actions', hide: false},
    { def: 'vaidation', label: 'validation', hide:true }
  
  ]; 
  dataSource = new MatTableDataSource<DataItem>;
  public transformedData:any[]=[];
  formImport!: FormGroup;
  button = "Submit";
  isLoading = false;
  data!:any[];
  //errorData!:any[];
  errorData:string[] = [];
  constructor(
   private _snackBar: MatSnackBar,
   private readonly _partialzService: PartialzService,
    public _dialog: MatDialog,
    ) {     }

    ngOnInit() {     
   
      this.formImport = new FormGroup({
       importFile: new FormControl('', Validators.required)
     });
    
     }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
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
        this.data = (XLSX.utils.sheet_to_json(ws, { blankrows: false,
          header: 1,
          raw: true,
          rawNumbers: true })); 
          
if(this.data.length>3)
{
        // Iterate over the data.
         this.transformedData = this.data.slice(3).map((row: any) => {
          this.errorData=[];
       
          var SSNregex = new RegExp(/^\b\d{9}\b$/);

          var dateRegex = new RegExp(/^\d{2}\d{2}\d{4}$/);
          var telephoneNumberRegex = new RegExp(/^\d{5}(\d{4}|0000)$/);

        
         
          if(row[0] == null)
          {
             this.errorData.push("Must enter SSN");
          }
          if(row[23] == null)
          {
             this.errorData.push("Must enter Date of birth ");
          } 
          if(row[22] == null)
          {
             this.errorData.push("Must enter Telephone Number ");
          }
          if(row[2] == null)
          {
             this.errorData.push("Must enter Claimant Last Name ");
          }
          if(row[3] == null)
          {
             this.errorData.push("Must enter Claimant First Name");
          }
          if(row[4] == null)
          {
             this.errorData.push("Must enter Claimant Middle Name");
          } 
          if(row[5] == null)
          {
             this.errorData.push("Must enter Climant Suffix ");
          }
          if(row[6] == null)
          {
             this.errorData.push("Must enter Street Address");
          }
          
          if(row[7] == null)
          {
             this.errorData.push("Must enter City");
          }
          if(row[8] == null)
          {
             this.errorData.push("Must enter State ");
          } 
          if(row[9] == null)
          {
             this.errorData.push("Must enter Zipcode");
          }
          if(row[10] == null)
          {
             this.errorData.push("Select Citizen");
          }
          if(row[12] == null)
          {
             this.errorData.push("Select ethnicity");
          }
          if(row[13] == null)
          {
             this.errorData.push("Select Race");
          } 
          if(row[14] == null)
          {
             this.errorData.push("Select Gender");
          }
          if(row[15] == null)
          {
             this.errorData.push("Select Handicap");
          }
          
          if(row[20] == null)
          {
             this.errorData.push("Select Federal with Holding");
          }
          if(row[24] == null)
          {
             this.errorData.push("Select Veteran Status");
          }
          if(row[25] == null)
          {
             this.errorData.push("Select Education");
          } 
          if(row[26] == null)
          {
             this.errorData.push("Select Occupation");
          }
          if(row[10]=="NO" && row[11] == null)
          {
             this.errorData.push("Must Enter Authorized Alien Number");
          }
          
     console.log("error data",this.errorData);
  if(this.errorData.length>=1)
  {
          return {
          
            errorMessage: this.errorData,
            socialSecurityNumber: row[0],
            dateOfBirth: row[23],
            telephoneNumber: row[22],
            claimantFirstName : row[3],
            claimantMiddleName : row[4],
            claimantLastName : row[2],
            claimantSuffix : row[5] ,
            mailingStreetAddress : row[6],
            mailingCity : row[7],
            mailingState : row[8],
            zipCode : row[9],
            citizen : row[10],
            ethnicity : row[12],
            race : row[13],
            gender : row[14],
            handicap : row[15],
            federalwithHolding : row[20],
            veteranStatus : row[24],
            education : row[25],
            occupation : row[26],
            authorizedAlienNumber : row[11]?row[11]:"0",
            validation:true
          };
  }
  else
  {
    return {
          
      errorMessage: this.errorData,
      socialSecurityNumber: row[0],
      dateOfBirth: row[23],
      telephoneNumber: row[22],
      claimantFirstName : row[3],
      claimantMiddleName : row[4],
      claimantLastName : row[2],
      claimantSuffix : row[5] ,
      mailingStreetAddress : row[6],
      mailingCity : row[7],
      mailingState : row[8],
      zipCode : row[9],
      citizen : row[10],
      ethnicity : row[12],
      race : row[13],
      gender : row[14],
      handicap : row[15],
      federalwithHolding : row[20],
      veteranStatus : row[24],
      education : row[25],
      occupation : row[26],
      authorizedAlienNumber : row[11]?row[11]:"0",
      validation:false
    };
  }
        }); 
        const filteredNumbers= [];
        for (let i = 0; i < this.transformedData.length; i++) {
          if(Object.keys(this.transformedData[i]).length != 0)
          {
            filteredNumbers.push(this.transformedData[i]);
          }
         }
        
          this.dataSource = new MatTableDataSource<any>(filteredNumbers);       
        }
        else
        {
          event.target.value = null;

        }
      };
      reader.readAsBinaryString(target.files[0]);
    }
  
  }
  
  edit(e: any) {
    const dialogRef = this._dialog.open(ModifyclaimComponent, {  
      width:'1200px',   // Set width to 600px
      height:'870px',  // Set height to 530px
      data: {
       ssn: e.socialSecurityNumber? e.socialSecurityNumber : "",
       dateOfBirth: e.dateOfBirth ? formatDate(e.dateOfBirth, 'MM/dd/yyyy', 'en-US'): "",
       telephoneNumber: e.telephoneNumber? e.telephoneNumber.replaceAll('-', '') : "",
       claimantFirstName : e.claimantFirstName? e.claimantFirstName : "",
       claimantMiddleName : e.claimantMiddleName? e.claimantMiddleName : "",
       claimantLastName : e.claimantLastName? e.claimantLastName : "",
       claimantSuffix : e.claimantSuffix?  e.claimantSuffix : " 0 " ,
       mailingStreetAddress : e.mailingStreetAddress? e.mailingStreetAddress : "",
       mailingCity : e.mailingCity? e.mailingCity : "",
       mailingState : e.mailingState?  e.mailingState : "0",
       zipCode : e.zipCode? e.zipCode : "",
       citizen : e.citizen? e.citizen : "0",
       ethnicity : e.ethnicity?  e.ethnicity : "0",
       race : e.race? e.race : "0",
       gender : e.gender? e.gender : "0",
       handicap : e.handicap? e.handicap : "0",
       federalwithHolding : e.federalwithHolding? e.federalwithHolding : "0",
       veteranStatus : e.veteranStatus? e.veteranStatus : "0",
       education : e.education? e.education : "0",
       occupation : e.occupation? e.occupation : "",
       authorizedAlienNumber : e.authorizedAlienNumber?  e.authorizedAlienNumber : 0 
    },
      });
      dialogRef.afterClosed().subscribe(result => {
         if(result.data!=null)
         {
        this.dataSource.data = this.dataSource.data.filter((value,key)=>{
         if(value.socialSecurityNumber == result.data.SocialSecurityNumber){
           value.socialSecurityNumber = result.data.SocialSecurityNumber;
           value.dateOfBirth = result.data.DateOfBirth;
           value.claimantFirstName = result.data.ClaimantFirstName;
           value.claimantLastName = result.data.ClaimantLastName;
           value.claimantMiddleName = result.data.ClaimantMiddleName;
           value.claimantSuffix = result.data.ClaimantSuffix; 
           value.education = result.data.Education;
           value.ethnicity = result.data.Ethnicity;
           value.federalwithHolding = result.data.FederalwithHolding;
           value.gender = result.data.Gender;
           value.handicap = result.data.Handicap;
           value.mailingStreetAddress = result.data.MailingStreetAddress; 
           value.mailingCity = result.data.MailingCity;
           value.mailingState = result.data.MailingState;
           value.occupation = result.data.Occupation;
           value.race = result.data.Race;
           value.veteranStatus = result.data.VeteranStatus;
           value.telephoneNumber = result.data.TelephoneNumber;
           value.zipCode = result.data.ZipCode;
           value.validation=false;
         }
         return true;
      
       });
      }
     });
  }
  private showSnackbar(message: string, action: string): void {
   this._snackBar.open(message, action, {
     duration: 6000, // Duration in milliseconds
   });
 }
  onSubmit() {
console.log(this.dataSource.data);
const employeDirectoryList:any[] = [];

this.dataSource.data.forEach(item => {
   employeDirectoryList.push(
{
   Email : localStorage.getItem('email'),
   SocialSecurityNumber: JSON.stringify(item.socialSecurityNumber),
   DateOfBirth: new Date(item.dateOfBirth),
   TelephoneNumber : item.telephoneNumber,
   ClaimantFirstName: item.claimantFirstName,
   ClaimantMiddleName: item.claimantMiddleName,
   ClaimantLastName: item.claimantLastName,
   ClaimantSuffix : item.claimantSuffix,
   MailingStreetAddress: item.mailingStreetAddress,
   MailingCity: item.mailingCity,
   MailingState: item.mailingState,
   ZipCode:  JSON.stringify(item.zipCode),
   Gender: item.gender,
   Handicap: item.handicap,
   VeteranStatus: item.veteranStatus,
   Race: item.race,
   Ethnicity: item.ethnicity,
   FederalwithHolding: item.federalwithHolding,
   Citizen: item.citizen,
   Education: item.education,
   Occupation: item.occupation,
   AuthorizedAlienNumber:  JSON.stringify(item.authorizedAlienNumber)=="0"? "" :  JSON.stringify(item.authorizedAlienNumber),
});
});
console.log("List",employeDirectoryList);
   this._partialzService.post<any>(environment.apiUrl+'/EmployeeDirectory/BulkSaveEmployeeDirectory', employeDirectoryList).subscribe(
      (response) => {
        console.log(response);
        if (response==1) {      
          this.showSnackbar("Employee Directory Data successfully submitted", "OK");        

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
  delete(e:any)
  {
    console.log("index",e);
    this.dataSource.data = this.dataSource.data.filter((u:any) => u.socialSecurityNumber !== e.ssn);
    console.log("After",this.dataSource);
  }

  getDisplayedColumns():string[] {
    return this.displayedColumns.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  onReset()
  {
    this.dataSource=new MatTableDataSource<any>();
    this.formImport.reset();
  }

}
