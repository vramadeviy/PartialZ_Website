import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,AbstractControl
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartialzService } from 'src/app/core/service/partialz.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm!: UntypedFormGroup;
  button="Reset My Password";
  isLoading = false;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private readonly _partialzService: PartialzService,
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ], 
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
   //message dispaly
   private showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 6000, // Duration in milliseconds
    });
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = this.authForm.get('password');
    const confirmPassword = this.authForm.get('cpassword');
    console.log(password?.value !== confirmPassword?.value);
  
    // Check if both fields are present and their values match
    if (password && confirmPassword && password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
  get f() {
    return this.authForm.controls;
  }
  haserror = (item:string , errorName: string) => {
    return this.authForm.controls[item].hasError(errorName);
  } 
  onSubmit() {
    this.submitted = true;

    const fEmail = this.authForm.get('email'),
    fpassword = this.authForm.get('password'),
    fcpassword = this.authForm.get('cpassword');
  
    const fpwd = fpassword?  fpassword.value : null;
    const fcpwd = fcpassword?  fcpassword.value : null;
  
    const body = {
      Email: fEmail?.value,
      Password: fpassword?.value
    };
    const pwdlength = fpwd?.length? fpwd?.length  : 0;
    const cpwdlength = fcpwd?.length? fcpwd?.length  : 0;
    if (fEmail != null  && fpassword != null ) {
      console.log(fpwd);
      console.log(fcpwd);
      if(fpwd==fcpwd)
      {
      if(pwdlength >=6 && cpwdlength >=6)
      {
        this.PasswordSend(body);
      }
  else
  {
    this.showSnackbar("Password should be in 6 characters ", "Close");
  }
      }
      else
      {
        this.showSnackbar("Password should match with Confirm Password ", "Close");
      }
    } else {
      this.showSnackbar("Invalid Credintials ", "Close");
    }
  }
  PasswordSend(body: any): void {
    this._partialzService.post<any>('https://localhost:7178/api/Login/ForgetPassword', body).subscribe(
      (response) => {
        this.isLoading=true;
        this.button ="Processing";   
        if (response.includes('We have sent you the Password to register email.')) {
          this.showSnackbar(response, "OK");        
        } 
        else if(response.includes('The new Password you entered is the same as your old password. Enter a different password.'))
        {
          this.showSnackbar(response, "OK");
        }
        else {
          this.showSnackbar(response, "OK");
          this.router.navigate(['/authentication/signin']);
          
        }
        this.isLoading=false;
        this.button ="Reset My Password";
      },
      (error) => {
        this.showSnackbar('Error occurred while while processing your request.', "Close");
      }
    );
  }
}
