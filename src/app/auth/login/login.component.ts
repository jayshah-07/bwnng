import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;

  errors: any[]= [];
  notifyMessage:string="";

  constructor(private fb:FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(
    (params) => {
      if(params["registered"]==="success"){
        this.notifyMessage="You have been successfuly registered, you can login in now."
      }
    });
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, 
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  isInvalidEmailInput(fieldName):boolean {
    return this.loginForm.controls[fieldName].invalid && 
            (this.loginForm.controls[fieldName].dirty || 
            this.loginForm.controls[fieldName].touched);
  }

  isRequiredField(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe( 
      (token) => {
      console.log("Login success!", token);
      this.router.navigate(['/rentals'])
    }, (errorResponse) => {
      console.log("Failed to login!");
      this.errors = errorResponse.error.errors;
    })
  }
}
