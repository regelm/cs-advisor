import { Component, OnInit, Input } from '@angular/core';
import {DragAndDropModule} from 'angular-draggable-droppable';
import { Observable } from 'rxjs/Rx';
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
  public allClasses: Observable<String[]>
  public qComp: number;
  public sComp: number;
  public wComp: number;
  public ssNum; smNum; ahNum; flNum;
  

  constructor(private classService: ClassesService,
              private router: Router,
              private authService: AuthService,
              private dragulaService: DragulaService) {
                this.studentName = localStorage.getItem('studentName')
                this.qComp = 0;
                this.sComp = 0;
                this.wComp = 0;
              }

  ngOnInit() {
    this.refreshSemesters();
    this.studentName = localStorage.getItem('studentName');
    this.checkComps();
    this.getSS();
    this.getSM();
    this.getFL();
    this.getAH();
  }

  // private onDropModel(args) {
  //   let [el, target, source] = args;
  //   const className = el.id;
  //   const tempClass = this.classService.getClass(className);
  //   tempClass.subscribe(ref => {
  //     const droppedCourse = ref[0]
  //     const classAdded = {
  //       course: droppedCourse["Course"],
  //       credit: droppedCourse["Credit"],
  //       description: droppedCourse["Description"],
  //       semester: target.id,
  //       student: this.studentName
  //     }
  //     console.log("Student Name:");
  //     console.log(this.studentName);
  //     this.classService.addTakenClass(classAdded);
  //   }
  //   )
  //   document.getElementById(el.id).style.visibility='hidden';
    
  // }

  private refreshSemesters() {
    this.semester1 = this.classService.getSemester1();
    this.semester2 = this.classService.getSemester2();
    this.semester3 = this.classService.getSemester3();
    this.semester4 = this.classService.getSemester4();
    this.semester5 = this.classService.getSemester5();
    this.semester6 = this.classService.getSemester6();
    this.semester7 = this.classService.getSemester7();
    this.semester8 = this.classService.getSemester8();
  }

  private checkComps() {
    this.semester1.subscribe(ref => {
      ref.forEach(course => {
        if(course["comp"] == 'Q' || course["comp"] == 'q') {
          this.qComp += 1;
        }
        if(course["comp"] == 'W' || course["comp"] == 'w') {
          this.wComp += 1;
        }
        if(course["comp"] == 'S' || course["comp"] == 's') {
          this.sComp += 1;
        }
      })
    })
    this.semester2.subscribe(ref => {
      ref.forEach(course => {
        if(course["comp"] == 'Q' || course["comp"] == 'q') {
          this.qComp += 1;
        }
        if(course["comp"] == 'W' || course["comp"] == 'w') {
          this.wComp += 1;
        }
        if(course["comp"] == 'S' || course["comp"] == 's') {
          this.sComp += 1;
        }
      })
    })
    this.semester3.subscribe(ref => {
      ref.forEach(course => {
        if(course["comp"] == 'Q' || course["comp"] == 'q') {
          this.qComp += 1;
        }
        if(course["comp"] == 'W' || course["comp"] == 'w') {
          this.wComp += 1;
        }
        if(course["comp"] == 'S' || course["comp"] == 's') {
          this.sComp += 1;
        }
      })
    })
    this.semester4.subscribe(ref => {
      ref.forEach(course => {
        if(course["comp"] == 'Q' || course["comp"] == 'q') {
          this.qComp += 1;
        }
        if(course["comp"] == 'W' || course["comp"] == 'w') {
          this.wComp += 1;
        }
        if(course["comp"] == 'S' || course["comp"] == 's') {
          this.sComp += 1;
        }
      })
    })
    this.semester5.subscribe(ref => {
      ref.forEach(course => {
        if(course["comp"] == 'Q' || course["comp"] == 'q') {
          this.qComp += 1;
        }
        if(course["comp"] == 'W' || course["comp"] == 'w') {
          this.wComp += 1;
        }
        if(course["comp"] == 'S' || course["comp"] == 's') {
          this.sComp += 1;
        }
      })
    })
    this.semester6.subscribe(ref => {
      ref.forEach(course => {
        if(course["comp"] == 'Q' || course["comp"] == 'q') {
          this.qComp += 1;
        }
        if(course["comp"] == 'W' || course["comp"] == 'w') {
          this.wComp += 1;
        }
        if(course["comp"] == 'S' || course["comp"] == 's') {
          this.sComp += 1;
        }
      })
    })
    this.semester8.subscribe(ref => {
      ref.forEach(course => {
        if(course["comp"] == 'Q' || course["comp"] == 'q') {
          this.qComp += 1;
        }
        if(course["comp"] == 'W' || course["comp"] == 'w') {
          this.wComp += 1;
        }
        if(course["comp"] == 'S' || course["comp"] == 's') {
          this.sComp += 1;
        }
      })
    })
    this.semester8.subscribe(ref => {
      ref.forEach(course => {
        if(course["comp"] == 'Q' || course["comp"] == 'q') {
          this.qComp += 1;
        }
        if(course["comp"] == 'W' || course["comp"] == 'w') {
          this.wComp += 1;
        }
        if(course["comp"] == 'S' || course["comp"] == 's') {
          this.sComp += 1;
        }
      })
    })
    console.log(this.qComp);
    console.log(this.wComp);
    console.log(this.sComp);
  }

  deleteClass(semester) {
    if(semester.comp == 'Q' || semester.comp == 'q') {
      this.qComp -= 1;
    }
    if(semester.comp == 'W' || semester.comp == 'w') {
      this.wComp -= 1;
    }
    if(semester.comp == 'S' || semester.comp == 's') {
      this.sComp -= 1;
    }
    this.classService.deleteTakenClass(semester);
    // location.reload();
  }

  getSS() {
    this.classService.getSS().subscribe(ref => {
      this.ssNum = ref[0]["SS"];
    })
  }
  increaseSS() {
    this.classService.increaseSS();
  }
  decreaseSS() {
    this.classService.decreaseSS();
  }

  getSM() {
    this.classService.getSM().subscribe(ref => {
      this.smNum = ref[0]["SM"];
    })
  }
  increaseSM() {
    this.classService.increaseSM();
  }
  decreaseSM() {
    this.classService.decreaseSM();
  }

  getAH() {
    this.classService.getAH().subscribe(ref => {
      this.ahNum = ref[0]["AH"];
    })  }
  increaseAH() {
    this.classService.increaseAH();
  }
  decreaseAH() {
    this.classService.decreaseAH();
  }
  
  getFL() {
    this.classService.getFL().subscribe(ref => {
      this.flNum = ref[0]["FL"];
    })  }
  increaseFL() {
    this.classService.increaseFL();
  }
  decreaseFL() {
    this.classService.decreaseFL();
  }

}
