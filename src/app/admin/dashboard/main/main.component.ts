import { Component,OnInit } from '@angular/core';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['filerName', 'email', 'employerName', 'eannumber', 'feinnumber' , 'phoneNumber' , 'payrollEndDay', 'AffidavitApprovalStatus' ];
  
  dataSource : any[] = [];
  AffidavitApprovalStatus : string = 'Pending';
  constructor(private _partialzService : PartialzService,  private router: Router){
   
  }
  public ngOnInit(): void {
    var authEmail = localStorage.getItem('email');
    if(authEmail!=null)
    {
      this.bindGridData();
    }
    else
    {
      this.router.navigate(['/login']);
      localStorage.removeItem('email');
    }
  }

  public bindGridData ():void
  {
    var authEmail = localStorage.getItem('email');
    if(authEmail!=null)
    {
    this._partialzService.get<any>('https://localhost:7178/api/Employee/EmployeeDetails?EmailID=' + authEmail).subscribe(
      (data) => {
        {         
          this.dataSource = data;       
        } 
      }
    );
    }
  }
  
}
