import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Class } from './class';
import { ClassesService } from './service/classes.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { SemesterComponent } from '../semesters/semester/semester.component';
import { DragAndDropModule } from 'angular-draggable-droppable'

@Component({
  selector: 'app-current-classes',
  templateUrl: './current-classes.component.html',
  styleUrls: ['./current-classes.component.css'],
  providers: [ClassesService]
})
export class CurrentClassesComponent implements OnInit {

  public classes: Observable<Class[]>;
  public semesters: SemesterComponent[];

  constructor(private classService: ClassesService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.classes = this.classService.getCurrentClassList();
    console.log(this.classes)
  }

  logOut() {
    this.authService.signOut();
  }

  addClass() {
    this.router.navigate(['/add-class']);
  }

  goToStudents() {
    this.router.navigate(['/students'])
  }

  dragEnd(event) {
    console.log('Element was dragged', event);
  }

}
