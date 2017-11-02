import { Component, OnInit, Input } from '@angular/core';
import {DragAndDropModule} from 'angular-draggable-droppable';
import { Observable } from 'rxjs/Observable';
import { Class } from '../../current-classes/class';
import { ClassesService } from '../../current-classes/service/classes.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { DragulaService } from 'ng2-dragula';
import { classtaken } from './classtaken';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  public classesTaken: Observable<Class[]>;
  dropCount = 0;
  drops = 0;
  studentName;

  @Input() 
    year: string;

  public semester1: Observable<Class[]>
  public semester2: Observable<Class[]>
  public semester3: Observable<Class[]>
  public semester4: Observable<Class[]>
  public semester5: Observable<Class[]>
  public semester6: Observable<Class[]>
  public semester7: Observable<Class[]>
  public semester8: Observable<Class[]>
  

  constructor(private classService: ClassesService,
              private router: Router,
              private authService: AuthService,
              private dragulaService: DragulaService) {
                dragulaService.drop.subscribe((value) => {
                  this.onDropModel(value.slice(1));
                });
                this.studentName = this.classService.getCurrentStudent();
              }

  ngOnInit() {
    this.semester1 = this.classService.getSemester1();
    this.semester2 = this.classService.getSemester2();
    this.semester3 = this.classService.getSemester3();
    this.semester4 = this.classService.getSemester4();
    this.semester5 = this.classService.getSemester5();
    this.semester6 = this.classService.getSemester6();
    this.semester7 = this.classService.getSemester7();
    this.semester8 = this.classService.getSemester8();
    this.classService.currentName.subscribe(name => this.studentName = name)
  }

  private onDropModel(args) {
    let [el, target, source] = args;
    const className = el.id;
    const tempClass = this.classService.getClass(className);
    tempClass.subscribe(ref => {
      const droppedCourse = ref[0]
      const classAdded = {
        course: droppedCourse["Course"],
        credit: droppedCourse["Credit"],
        description: droppedCourse["Description"],
        semester: target.id,
        student: "Nathan Niese"
      }

      console.log(this.studentName);

      console.log(classAdded)
      this.classService.addTakenClass(classAdded);
    }
    )
    document.getElementById(el.id).style.visibility='hidden';
    
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }

}
