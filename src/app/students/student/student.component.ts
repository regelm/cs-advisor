import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { Student } from '../student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {

  public students: Observable<Student[]>;
  
  constructor(private studentSvc: StudentService, 
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.students = this.studentSvc.getStudentsList({})
    this.printStudents();
  }

  printStudents() {
    console.log(this.students)
  }

  createStudent() {
    this.router.navigate(['/create-student'])
  }

  logOut() {
    this.authService.signOut();
  }

}
