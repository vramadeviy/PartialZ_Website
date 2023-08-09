import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartialzService } from 'src/app/core/service/partialz.service';
import html2pdf from 'html2pdf.js';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-affidavitreport',
  templateUrl: './affidavitreport.component.html',
  styleUrls: ['./affidavitreport.component.scss']
})
export class AffidavitreportComponent implements OnInit  {
  eanNumber:string="";
  feinnumber : string="";
  employerName : string="";
  address:string="";
  city : string="";
  state : string="";
  zip: string="";
  email: string="";
  firstName : string="";
  lastName : string="";
  title : string="";
  phone : string="";
  date : number = 0;
  options = {
    margin: 1,
    filename: 'newfile.pdf',
    image: {
      type: 'jpeg',
      quality: '0.90',
    },
    html2canvas: {
      scale: 2
    },
    jsPDF: {
      unit: 'in',
      format: 'letter',
      orientation: 'portrait'
    }
  }
  constructor(private readonly _partialzService: PartialzService,
    private router: Router,
    private readonly _activateRoute: ActivatedRoute) { }
  
    ngOnInit(){
console.log('affidavit report');
      this._activateRoute.queryParams.subscribe(
        (queryParams)=>{ 
          const decodeqp = JSON.parse(atob(decodeURIComponent(queryParams['qp'])));
          this.eanNumber=decodeqp.eanNumber;
          this.feinnumber =decodeqp.feinnumber;
          this.employerName =decodeqp.employerName;
          this.address =decodeqp.address;
          this.city =decodeqp.city;
          this.state =decodeqp.state;
          this.zip =decodeqp.zip;
          this.email =decodeqp.email;
          this.firstName =decodeqp.firstName;
          this.lastName =decodeqp.lastName;
          this.title = decodeqp.title;
          this.phone = this.digitsOnly(decodeqp.phone);
          this.date =  Date.now();
         this.generatePdf();
         this.router.navigate(['/authentication/signin']); 
         localStorage.removeItem('email');
        }
      );
    }
    generatePdf() {
      const element = document.getElementById('content');
  
      if (element) {
        const options = {
          filename: 'AffidavitForm.pdf',
          html2canvas: {},
          jsPDF: { format: 'a4', orientation: 'portrait' },
        };
  
        html2pdf().from(element).set(options).save();
      }
    } 
    private digitsOnly(number:any) {
      return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 - $3');
    }

}
