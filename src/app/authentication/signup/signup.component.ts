import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { PartialzService } from 'src/app/core/service/partialz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  button="Register";
  isLoading = false;
  token: string = "";
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,    
    private readonly _partialzService: PartialzService,
    private _snackBar: MatSnackBar,
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('Password');
    const confirmPassword = control.get('Confirmpassword');

    // Check if both fields are present and their values match
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
  get f() {
    return this.authForm.controls;
  }
 //message dispaly
 private showSnackbar(message: string, action: string): void {
  this._snackBar.open(message, action, {
    duration: 6000, // Duration in milliseconds
  });
}
  onSubmit() { 
  
      const userName = this.authForm.get('email'),
        password = this.authForm.get('password'),
        confipassword = this.authForm.get('cpassword');
      if (userName!==null && password!==null && confipassword!==null) {
        if (userName !== null && password !== null && password.value.length >=6 && confipassword.value.length>=6) {
          this.sendVeifyemail(userName.value, password.value);
         
        }
      } else {
        if (confipassword !== null && password !== null && (password.value != confipassword.value)) {
          this.showSnackbar("Password and confirm password does not match", "Close");
          
        } else {
          this.showSnackbar("Enter Valid Credintials", "Close");
        }
      }
  }
  sendVeifyemail(emailID: string, Password: string): void {
    const body = {
      Email: emailID,
      Password: Password
    };
    
    //this.isProcessing=true;
    this._partialzService.post<any>('https://localhost:7178/api/Employee', body).subscribe(
      (data:any) => {
        this.isLoading=true;
        this.button ="Processing";    
        if (data ==  "Registered") {
          this.showSnackbar("Email Registered Already. Please Login.", "OK");
          this.router.navigate(['/authentication/signin']);     
        }
        else if(data == "Verified")
        {
          this.showSnackbar("Email Verified already.", "OK");
        }
        else if(data == "Verify")
        {
          this.showSnackbar("We have sent you the verification mail please confirm", "OK");  
          console.log(body.Email);
          const email = {
          emailAddress : body.Email
          }
          const qp = encodeURIComponent(btoa(JSON.stringify(email)));
          console.log(qp);
          //this.router.navigate(['/authentication/employerauthentication',{email : qp}]);
          this.router.navigate(['/authentication/profile']);
        }
        else {
          this.showSnackbar("Something went wrong please try again", "Close");
        }
        this.isLoading=false;
        this.button ="Register";
      },
      (error) => {
        console.log("error " + error);
        this.showSnackbar('Error occurred while while processing your request.', "Close");
      }
    );
  }

}
