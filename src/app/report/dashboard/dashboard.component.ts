import { Component, OnInit } from '@angular/core';
import { json } from 'd3';
import { PartialzService } from 'src/app/core/service/partialz.service';
export interface FilerNames {
  filerId: number;
  filerName: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //filernames :any;
  filernames: any[] = [];
 // filernames : FilerNames[] = [];
  selectedFilers: any;
  ReadMore:boolean = true

  //hiding info box
  visible:boolean = false

  constructor(  private readonly _partialzService: PartialzService,){}
  ngOnInit() {
this.bindGridData();
  }
  public bindGridData ():void
  {
    var authEmail = localStorage.getItem('email');
    if(authEmail!=null)
    {
    this._partialzService.get<any>('https://localhost:7178/api/Employee/GetFilerNames').subscribe(
      (data) => {
        { 
           this.filernames=data;   
        } 
      }
    );
    }
  }
  onclick()
  {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }


}
