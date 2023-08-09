import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartialzService } from 'src/app/core/service/partialz.service';

import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  public isOTPsent=0;
  isLoading = false;
button="Login";
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private readonly _partialzService: PartialzService,
  ) {
    super();
  }

  ngOnInit() {
    
    this.authForm = this.formBuilder.group({
      lEmailformcontrol: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    lpasswordformcontrol: ['', Validators.required],
    OTPformcontrol: ['']
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('username')?.setValue('admin@school.org');
    this.authForm.get('password')?.setValue('admin@123');
  }
  lEmailformerrors(error: string)
  {
    return this.authForm.controls['lEmailformcontrol'].hasError(error);
  }
  lpasswordFormErrors(error: string)
  {
    return this.authForm.controls['lpasswordformcontrol'].hasError(error);
  }
  otpformerrors(error: string)
  {
    return this.authForm.controls['OTPformcontrol'].hasError(error);
  }
  //message dispaly
  private showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 6000, // Duration in milliseconds
    });
  }
  Login(body: any): void {
    this.isLoading = true;
    this.button = 'Processing';

    this._partialzService.post<any>('https://localhost:7178/api/Login', body).subscribe(
      (response) => {
        if (response.includes('We have sent you the otp to register email.')) {
          this.showSnackbar(response, "OK");
          this.isOTPsent=1;
          localStorage.setItem('email',body.Email);
         

        } else {
          this.showSnackbar(response, "OK");
        }
        this.isLoading=false;
        this.button = 'Login';
      },
      (error) => {
        this.showSnackbar('Error occurred while while processing your request.', "Close");
      }
    );
  }
  onSubmit() {
    this.isLoading=true;
    if(this.isOTPsent == 0)
    {
    const fEmail = this.authForm.get('lEmailformcontrol'),
    fpassword = this.authForm.get('lpasswordformcontrol');

    console.log(fEmail?.value);
    console.log(fpassword?.value);

    if ((fEmail != null ) && (fpassword != null )) {
      console.log(fEmail);
        const body = {
          Email: fEmail.value,
          Password: fpassword.value
        };
       
        this.Login(body);
       
      } else {
        this.showSnackbar("Invalid username", "Close");
      }
    }
    else if(this.isOTPsent ==1)
    {
      const otpfc = this.authForm.get('OTPformcontrol');
      const fEmail = this.authForm.get('lEmailformcontrol');
     const email = localStorage.getItem('email');
      if (otpfc != null ) {
        const bodyotp = {
          otp: otpfc.value,
          email: email
        };
        const OTPPattern = /^[0-9]{6}$/;
          this.ValidateOTP(bodyotp);
         this.loading=false;
         this.button = 'Login';

        } else {
          this.showSnackbar("Invalid OTP", "Close");
        }
    }
    
    }
    ValidateOTP(body: any): void {
      this._partialzService.post<any>('https://localhost:7178/api/Login/Validate', body).subscribe(
        (response) => {
          if (response.includes('OTP verified successfully')) {
            this.showSnackbar(response, "OK");
            console.log(body);
            localStorage.setItem('email',body.email);
            this.router.navigate(['/admin/dashboard/main']);
           
          } else {
            this.showSnackbar(response, "OK");
          }
        },
        (error) => {
          this.showSnackbar('Error occurred while while processing your request.', "Close");
        }
      );
    }
}
