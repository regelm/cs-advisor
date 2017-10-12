import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  providers: [StudentService]
})
export class StudentFormComponent implements OnInit {

  name = '';
  year: number;
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(private studentSvc: StudentService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }

  createStudent(): void {
    this.clearErrorMessage()

    const tempStudent: Student = {
      name: this.name,
      advisor:  this.authService.currentUser.displayName,
      advisorUID: this.authService.currentUser.uid,
      year: this.year
    }
    console.log(tempStudent);
    
    if(this.validateForm(this.name, this.year)) {
      this.studentSvc.createStudent(tempStudent)
      this.router.navigate(['/students']);
    }
  }

  goBack() {
    this.router.navigate(['/students'])
  }

  logOut() {
    this.authService.signOut();
  }

  validateForm(name: string, year: number) {
    console.log(name);
    console.log(name.length);
    if (name.length === 0) {
      this.errorMessage = 'Please enter the students name!';
      console.log(this.errorMessage);
      return false
    }
    return true
  }
}
