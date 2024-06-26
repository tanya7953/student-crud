import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login, signup } from '../studentmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'] 
})
export class LoginSignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router :Router) { }

  signupform!: FormGroup;
  loginform!: FormGroup;

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  isshow = false;

  signup() {
    this.isshow = true;
  }

  login() {
    this.isshow = false;
  }

  submitsignup() {
    console.log("Signup form data:", this.signupform.value); 
    this.http.post<signup>("http://localhost:3000/signup", this.signupform.value).subscribe(res => {
      alert("User Signed up successfully!");
      this.signupform.reset();
    }, error => {
      console.error("Signup error:", error); 
    });
  }

  loginuser() {
    console.log("Login form data:", this.loginform.value); 
    this.http.get<login[]>("http://localhost:3000/signup").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password;
      });
      if (user) {
        alert("Successfully logged in");
        this.loginform.reset();
        this.router.navigate(['/studentlist']);
        
        localStorage.setItem('logindata', JSON.stringify(user));
      } else {
        alert("Invalid user credentials");
        this.loginform.reset();
      }
    }, error => {
      console.error("Login error:", error); 
    });
  }
}
