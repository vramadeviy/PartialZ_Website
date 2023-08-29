import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TermsandtonditionsComponent } from 'src/app/authentication/termsandtonditions/termsandtonditions.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-affidavit',
  templateUrl: './affidavit.component.html',
  styleUrls: ['./affidavit.component.scss']
})
export class AffidavitComponent  {
 // affidavitFormGroup!: UntypedFormGroup;
  selectedPayrollEndDay: string = "Select";
  PayrollEndDay: any = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday' , 'Friday', 'Saturday'];
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
  button = "Submit";
  isLoading = false;
  constructor(
    // private formBuilder: UntypedFormBuilder,
     private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private router: Router,    
     private readonly _partialzService: PartialzService,
     private _snackBar: MatSnackBar,
     public _dialog: MatDialog,
   ) {}
   affidavitFormGroup = this.formBuilder.group({     
    aEANNumber: [''],
   aFEINNumber: ['',Validators.required],
   Email: ['', [Validators.required, Validators.email]],
   employerName: ['', Validators.required],
   employerAddress: ['', Validators.required],
   City: ['', Validators.required],
   State: ['', Validators.required],
   Zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
   firstName: ['', Validators.required],
   lastName: ['', Validators.required],
   businessTitle: ['', Validators.required],
   Phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
   payrollEndDay: ['', Validators.required],
   terms: [false, Validators.requiredTrue]
   });  
  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams)=>{ 
       const decodeqp = JSON.parse(atob(decodeURIComponent(queryParams['qp'])));
        this.affidavitFormGroup.get('aEANNumber')?.setValue(decodeqp.eanNumber);
        this.affidavitFormGroup.get('aFEINNumber')?.setValue(decodeqp.feinnumber);
        this.affidavitFormGroup.get('employerName')?.setValue(decodeqp.employerName);
        this.affidavitFormGroup.get('employerAddress')?.setValue(decodeqp.address);
        this.affidavitFormGroup.get('City')?.setValue(decodeqp.city);
        this.affidavitFormGroup.get('State')?.setValue(decodeqp.state);
        this.affidavitFormGroup.get('Zipcode')?.setValue(decodeqp.zip);
        this.affidavitFormGroup.get('Email')?.setValue(decodeqp.email);
      }
    );
    
  }
  firstNameFormErrors(error: string) {
    return this.affidavitFormGroup.controls['firstName'].hasError(error);
  }
  lastNameFormErrors(error: string) {
    return this.affidavitFormGroup.controls['lastName'].hasError(error);
  }
  businessTitleFormErrors(error: string) {
    return this.affidavitFormGroup.controls['businessTitle'].hasError(error);
  }
  phoneFormErrors(error: string) {
    return this.affidavitFormGroup.controls['Phone'].hasError(error);
  }
  
  termsFormErrors(error: string) {
    return this.affidavitFormGroup.controls['terms'].hasError(error);
  }
  private digitsOnly(number:any) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 - $3');
  }
  openDialog() {
    const dialogRef = this._dialog.open(TermsandtonditionsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getDisabledValue() {
    //your condition, in this case textarea will be disbaled.
    return true; 
  }
  //terms and condition
  setAll(completed: boolean) {
    console.log(completed);
  }
    //message dispaly
    private showSnackbar(message: string, action: string): void {
      this._snackBar.open(message, action, {
        duration: 6000, // Duration in milliseconds
      });
    }
  SubmitApplication() {
    this.isLoading=true;
    this.button ="Processing";
    const eanNumber = this.affidavitFormGroup.get('aEANNumber'),
      feinNumber = this.affidavitFormGroup.get('aFEINNumber'),
      email = this.affidavitFormGroup.get('Email'),
      employerName = this.affidavitFormGroup.get('employerName'),
      employerAddress = this.affidavitFormGroup.get('employerAddress'),
      city = this.affidavitFormGroup.get('City'),
      state = this.affidavitFormGroup.get('State'),
      ZIP = this.affidavitFormGroup.get('Zipcode'),
      firstName = this.affidavitFormGroup.get('firstName'),
      lastName = this.affidavitFormGroup.get('lastName'),
      businessTitle = this.affidavitFormGroup.get('businessTitle'),
      ContactPhone = this.affidavitFormGroup.get('Phone'),
      payrollEndDay = this.selectedPayrollEndDay,
      terms=this.affidavitFormGroup.get('terms');
    // if (this.affidavitFormGroup.valid) {
      if(eanNumber!==null && feinNumber!==null && email!==null &&
        employerName!==null && employerAddress!==null && city!==null&&
        state!==null && ZIP!==null && firstName!==null &&
        lastName!==null && businessTitle!==null && ContactPhone!==null && payrollEndDay!==null
        ){
          const body = {
            Eannumber: eanNumber.value,
            Feinnumber: feinNumber.value,
            EmployerEmail:email.value,
            EmployerName:employerName.value,
            Address:employerAddress.value,
            City:city.value,
            State:state.value,
            ZIP:ZIP.value,
            ContactFirstName:firstName.value,
            ContactLastName:lastName.value,
            Email: email.value,
            BusinessTitle:businessTitle.value,
            ContactPhone:ContactPhone.value,
            PayrollEndDay:payrollEndDay
          };
         this.AffidavitRegistration(body);
        }
    // } else {
    //   this.showSnackbar("Enter Required Fields", "Close");
    // }
  }
  AffidavitRegistration(body : any): void {
    this._partialzService.post<any>(environment.apiUrl+'/Employer/AffidavitRegistration', body).subscribe(
      (response) => {
        if (response == 1) {      
          this.showSnackbar("Registered successfully submitted", "OK");
          localStorage.setItem('email',body.EmployerEmail);
         // this.router.navigate(['/profile'], { queryParams: { type: '2' } }); 

          console.log(body);
          const params = {           
            eanNumber:body.Eannumber , 
            feinnumber : body.Feinnumber,
            employerName : body.EmployerName,
            address:body.Address,
            city : body.City,
            state : body.State,
            zip: body.ZIP,
            email: body.EmployerEmail,
            phone:body.ContactPhone,
            firstName : body.ContactFirstName,
            lastName : body.ContactLastName,
            title : body.BusinessTitle
           } ;
           const qp = encodeURIComponent(btoa(JSON.stringify(params)));
           this.router.navigate(['/authentication/affidavitreport'], { queryParams: { qp} });
           this.isLoading=false;
           this.button ="Submit";

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
