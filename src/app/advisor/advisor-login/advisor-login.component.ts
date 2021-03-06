import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisor-login',
  templateUrl: './advisor-login.component.html',
  styleUrls: ['./advisor-login.component.css']
})
export class AdvisorLoginComponent implements OnInit {
  isNewUser = true;
  email = '';
  password = '';
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};
 
  constructor(public authService: AuthService, private router: Router) {}
 
  ngOnInit() {
  }
 
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }
 
  changeForm() {
    this.isNewUser = !this.isNewUser
  }
 
  onSignUp(): void {
    this.clearErrorMessage()
 
    if (this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/students'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }
 
  onLoginEmail(): void {
    this.clearErrorMessage()
 
    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/students']))
        .catch(_error => {
          this.error = _error
          console.log(this.error)
          this.router.navigate(['/'])
        })
    }
  }

  onLoginGoogle(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.googleLogin()
        .then(() => this.router.navigate(['/students']))
        .catch(_error => {
          this.error = _error
          console.log(this.error)
          this.router.navigate(['/'])
        })
    }
  }
 
  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Please enter Email!'
      return false
    }
 
    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!'
      return false
    }
 
    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!'
      return false
    }
 
    this.errorMessage = ''
 
    return true
  }
}
