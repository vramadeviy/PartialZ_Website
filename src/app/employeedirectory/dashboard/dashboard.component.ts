
import { Component, OnInit,ViewChild,ElementRef, resolveForwardRef } from '@angular/core';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource,} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { CreateemployeedirectoryComponent } from '../createemployeedirectory/createemployeedirectory.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

import { Router, ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
export interface Element {
  socialSecurityNumber: string;
  dateOfBirth:string,
  claimantFirstName:string,
  claimantMiddleName:string,
  claimantLastName:string,
  claimantSuffix:string,
  gender:string,
  occupation:string,
  mailingStreetAddress:string,
  mailingCity:string,
  mailingStateCode:string,
  zipCode: number;  
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  displayedColumns= [
    { def: 'index', label: 'index', hide: false},
    { def: 'socialSecurityNumber', label: 'socialSecurityNumber', hide: false},
    { def: 'dateOfBirth', label: 'dateOfBirth', hide: false},
    { def: 'claimantFirstName', label: 'claimantFirstName', hide: false},
    { def: 'claimantMiddleName', label: 'claimantMiddleName', hide: false},
    { def: 'claimantLastName', label: 'claimantLastName', hide: false},
    { def: 'claimantSuffix', label: 'claimantSuffix', hide: true},
    { def: 'gender', label: 'gender', hide: false},
    { def: 'genderCode', label: 'genderCode', hide: true},
    { def: 'occupation', label: 'occupation', hide: false},
    { def: 'mailingStreetAddress', label: 'mailingStreetAddress', hide: false},
    { def: 'mailingCity', label: 'mailingCity', hide: false},

    { def: 'mailingState', label: 'mailingState', hide: true},
    { def: 'mailingStateCode', label: 'mailingStateCode', hide: false},
    { def: 'zipCode', label: 'zipCode', hide: false},
    { def: 'citizen', label: 'citizen', hide: true},
    { def: 'ethnicity', label: 'ethnicity', hide: true},
    { def: 'race', label: 'race', hide: true},
    { def: 'handicap', label: 'handicap', hide: true},
    { def: 'federalwithHolding', label: 'federalwithHolding', hide: true},
    { def: 'veteranStatus', label: 'veteranStatus', hide: true},
    { def: 'education', label: 'education', hide: true},
    { def: 'authorizedAlienNumber', label: 'authorizedAlienNumber', hide: true},
    { def: 'actions', label: 'actions', hide: false},
    
  
  ];  
  dataSource = new MatTableDataSource();
  //dataSource : any[] = [];
  tableData: Element[]=[];
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _partialzService : PartialzService,     public _dialog: MatDialog,  private router: Router,  private _snackBar: MatSnackBar,
    ){
   
  }
  public ngOnInit(): void {
    var authEmail = localStorage.getItem('email');
    if(authEmail!="undefined")
    {
      this.bindGridData();
    }
    else{
      this.router.navigate(['/authentication/signin']);
    }
   
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getDisplayedColumns():string[] {
    return this.displayedColumns.filter(cd=>!cd.hide).map(cd=>cd.def);
  }
  private showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 6000, // Duration in milliseconds
    });
  }
  edit(e: any) {
    const dialogRef = this._dialog.open(CreateemployeedirectoryComponent, {  
      width:'1200px',   // Set width to 600px
      height:'870px',  // Set height to 530px
      data: {
       ssn: e.socialSecurityNumber,
       dateOfBirth: e.dateOfBirth,
       telephoneNumber: e.telephoneNumber,
       claimantFirstName : e.claimantFirstName,
       claimantMiddleName : e.claimantMiddleName,
       claimantLastName : e.claimantLastName,
       claimantSuffix : e.claimantSuffix?  e.claimantSuffix : " 0 " ,
       mailingStreetAddress : e.mailingStreetAddress,
       mailingCity : e.mailingCity,
       mailingState : e.mailingState,
       zipCode : e.zipCode,
       citizen : e.citizen,
       ethnicity : e.ethnicity,
       race : e.race,
       gender : e.genderCode,
       handicap : e.handicap,
       federalwithHolding : e.federalwithHolding,
       veteranStatus : e.veteranStatus,
       education : e.education,
       occupation : e.occupation,
       authorizedAlienNumber : e.authorizedAlienNumber?  e.authorizedAlienNumber : 0 

    },
      });
    dialogRef.afterClosed().subscribe(result => {
      this.bindGridData();
    });
  }
  delete(ssn:string)
  {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent);
if(ssn!=null)
{
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        console.log(ssn) ;
        console.log(result) ;
        this._partialzService.post<any>('https://localhost:7178/api/EmployeeDirectory/DeleteEmployeeDirectory', ssn).subscribe(
      (response) => {
        if(response.includes('Deleted Successfully..'))
        this.showSnackbar(response, "OK");
      });
      }
    }); 
  }
  }
  applyFilter(filterValue:any) {
    filterValue = filterValue.target.value.trim();
    this.dataSource.filter=filterValue;
  }
  openDialog() {
    const dialogRef = this._dialog.open(CreateemployeedirectoryComponent, {  
      width:'1200px',   // Set width to 600px
      height:'870px',  // Set height to 530px
      });
    dialogRef.afterClosed().subscribe(result => {
      this.bindGridData();
    });
  }
  onExport()
  {    
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.tableData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'EmployeeDirectory');
    });
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
    }
  public bindGridData ():void
  {
    var authEmail = localStorage.getItem('email');
    if(authEmail!=null)
    {
    this._partialzService.get<any>('https://localhost:7178/api/EmployeeDirectory/EmployeeDirectoryDetails?EmailID=' + authEmail).subscribe(
      (data) => {
        {     
          this.tableData=data;
          this.dataSource = new MatTableDataSource(data);
        } 
      }
    );
    }
  }
}
