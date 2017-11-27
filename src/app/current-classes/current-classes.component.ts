import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Class } from './class';
import { ClassesService } from './service/classes.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { SemesterComponent } from '../semesters/semester/semester.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-current-classes',
  templateUrl: './current-classes.component.html',
  styleUrls: ['./current-classes.component.css'],
})
export class CurrentClassesComponent implements OnInit {

  public classes: Observable<Class[]>;
  public semesters: SemesterComponent[];
  modalRef: BsModalRef;  

  classAdded = '';
  year;
  semester;

  semesterFinal;

  studentName;

  constructor(private classService: ClassesService,
              private router: Router,
              private authService: AuthService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.classes = this.classService.getCurrentClassList();
    console.log(this.classes);
    this.studentName = localStorage.getItem('studentName');
  }

  logOut() {
    this.authService.signOut();
  }

  addClass() {
    this.router.navigate(['/add-class']);
  }

  addSemesterClass(): void {    
    if(this.year == 1) {
      if (this.semester == 1)
        this.semesterFinal = "1";
      else
        this.semesterFinal = "2";
    } else if (this.year == 2) {
      if (this.semester == 1)
        this.semesterFinal = "3";
      else
        this.semesterFinal = "4";
    } else if (this.year == 3) {
      if (this.semester == 1)
        this.semesterFinal = "5";
      else
        this.semesterFinal = "6";
    } else {
      if (this.semester == 1)
        this.semesterFinal = "7";
      else
        this.semesterFinal = "8";
    }

    console.log(this.semesterFinal);

    const tempClass = this.classService.getClass(this.classAdded);
    tempClass.subscribe(ref => {
      const clickedCourse = ref[0];
      const classAdded = {
        course: clickedCourse["Course"],
        credit: clickedCourse["Credit"],
        description: clickedCourse["Description"],
        semester: this.semesterFinal, 
        student: this.studentName
      }

      this.classService.addTakenClass(classAdded);
    })
    this.modalRef.hide();
  }

  goToStudents() {
    localStorage.removeItem('studentName');
    localStorage.removeItem('currentStudent');
    this.router.navigate(['/students']);
  }

  dragEnd(event) {
    console.log('Element was dragged', event);
  }

  openModal(template: TemplateRef<any>, name) {
    this.classAdded = name;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'myModal' })
    );
  }

}
