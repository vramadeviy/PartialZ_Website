import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from 'src/app/config/config.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-employerauthentication',
  templateUrl: './employerauthentication.component.html',
  styleUrls: ['./employerauthentication.component.scss']
})
export class EmployerauthenticationComponent implements OnInit {
 // employerAuthForm!: UntypedFormGroup;
  token: string = "";
emailId : string = "";
isLoading = false;
button="Authorize";
employerAuthForm = this.formBuilder.group({     
  eanNumber: ['', Validators.required],
  feinNumber: ['', Validators.required],
}); 
 
  constructor(
   // private formBuilder: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,    
    private readonly _partialzService: PartialzService,
    private _snackBar: MatSnackBar,
  ) {}
  ngOnInit() {

    this.route.paramMap.subscribe(param => {
      const em = param.get('email') ? param.get('email') : null ;
      if(em!=null)
      {
        let obj  = JSON.parse(atob(decodeURIComponent(em)));
      this.emailId  = obj.emailAddress;      
      localStorage.removeItem('email');
      localStorage.setItem('email',this.emailId);
      }
      console.log(this.emailId);
    });
  }
  get f() {
    return this.employerAuthForm.controls;
  }
 
  ngAfterViewInit(): void {
    
    this.route.queryParams.subscribe(
      (queryParams) => {
        this.token = queryParams['token'];
        if (this.token != null) {
          this.Veifyemail(this.token);          
        }
      }
    );
  }
   //message dispaly
 private showSnackbar(message: string, action: string): void {
  this._snackBar.open(message, action, {
    duration: 6000, // Duration in milliseconds
  });
}

numberOnly(event:any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
eanFormErrors(error: string) {
  return this.employerAuthForm.controls['eanNumber'].hasError(error);
}
feinFormErrors(error: string) {
  return this.employerAuthForm.controls['feinNumber'].hasError(error);
}
    onemployerAuthSubmit() {
      this.isLoading=true;
      this.button ="Processing";
      const eanNumber = this.employerAuthForm.get('eanNumber'),
        feinNumber = this.employerAuthForm.get('feinNumber');
      if (this.employerAuthForm.valid) {
  
        if (eanNumber !== null && feinNumber !== null) {
          const eanNumberValue = eanNumber.value;
          const feinNumberValue = feinNumber.value;
          if (eanNumberValue && feinNumberValue)
            this.authorizEANandFEIN(eanNumberValue, feinNumberValue);
            this.isLoading=true;
            this.button ="Authorize";
        }
      } else {
        this.showSnackbar("Enter Required Fields", "Close");
      }
    }
    authorizEANandFEIN(eannumber: string, feinnumber: string): void {
    
      if (eannumber.match("^[0-9]{10}$") && feinnumber.match("^[0-9]{9}$"))
      {
      const body = {
        Eannumber: eannumber,
        Feinnumber: feinnumber,
        Email : localStorage.getItem('email')
      };
      
      //this.isProcessing=true;
      this._partialzService.post<any>(environment.apiUrl+'/Employer', body).subscribe(
        (data) => {
          {       
            this.showSnackbar("Authorization successfully", "OK");
            console.log(data);
            const params = {           
              eanNumber:data.eannumber , 
              feinnumber : data.feinnumber,
              employerName : data.employerName,
              address:data.address,
              city : data.city,
              state : data.state,
              zip: data.zip,
              email: data.email
             } ;
            const qp = encodeURIComponent(btoa(JSON.stringify(params)));
            this.router.navigate(['/authentication/affidavit'], {  queryParams: { qp } });
            }
        },
        (error) => {
          this.showSnackbar('Error occurred while while processing your request.', "Close");
        }
      );
      }
      else
      {
        this.showSnackbar(' Enter Valid EAN and FEIN Numbers' , "close");
      }
    }
    Veifyemail(token: string): void {
      console.log(token);
      this._partialzService.get<any>(environment.apiUrl+'/Employee/VerifyEmployee?token=' + token).subscribe(
        (response) => {
          if (response == 1) {
         
            this.showSnackbar("Email verified successfully", "Close");
            this.router.navigate(['/authentication/employerauthentication']);
          } else {
            this.showSnackbar("Something went wrong please try again", "Close");
          }
        },
        (error) => {
          this.showSnackbar('Error occurred while while processing your request.', "Close");
        }
      );
    }
}
