import { Injectable } from '@angular/core';
import { Student } from '../student';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase'
@Injectable()
export class StudentService {

  private basePath: string = '/students';

  students: Observable<Student[]>;
  student: Observable<Student>;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
                this.students = this.db.list('students').valueChanges();  
                this.student = this.db.object('student').valueChanges();
              }


  // Get a list of students
  getStudentsList(query={}): Observable<Student[]> {
    this.students = this.db.list(this.basePath, ref => 
        ref.orderByChild('advisorUID').equalTo(this.authService.currentUser.uid)
    ).valueChanges();
    return this.students
  }

  // Return a single student
  getStudent(key: string): Observable<Student> {
    const studentPath = `${this.basePath}/${key}`;
    this.student = this.db.object(studentPath).valueChanges();
    return this.student
  }

  createStudent(student: Student): void {
    this.getStudentsList();
    const students = this.db.list('students');
    students.push(student);
  }

  handleError(error) {
    console.log(error)
  }

}
