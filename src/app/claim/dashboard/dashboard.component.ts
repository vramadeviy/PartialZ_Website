
import { Component, OnInit } from '@angular/core';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateclaimComponent } from '../createclaim/createclaim.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['index','socialSecurityNumber', 'dateOfBirth','telephoneNumber', 'claimantName' ,  'gender', 'occupation','mailingAddress','actions' ];
  
  dataSource : any[] = [];
  constructor(private _partialzService : PartialzService,     public _dialog: MatDialog
    ){
   
  }
  public ngOnInit(): void {
    var authEmail = localStorage.getItem('email');
    console.log(authEmail);
    if(authEmail!=null)
    {
      this.bindGridData();
    }
   
  }
  edit(e: any) {

    const dialogRef = this._dialog.open(CreateclaimComponent, {  
      width:'1200px',   // Set width to 600px
      height:'1000px',  // Set height to 530px
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialog() {
    const dialogRef = this._dialog.open(CreateclaimComponent, {  
      width:'1200px',   // Set width to 600px
      height:'870px',  // Set height to 530px
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    this._partialzService.get<any>(environment.apiUrl+'/Claim/ClaimDetails?EmailID=' + authEmail).subscribe(
      (data) => {
        {         
          this.dataSource = data;       
        } 
      }
    );
    }
  }

}
