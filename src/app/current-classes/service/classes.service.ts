import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { Class } from '../class';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { classtaken } from '../../semesters/semester/classtaken';


export class studentName {
  name:string;
}

@Injectable()
export class ClassesService {
  

  private basePath: string = '/classes';
  private dropCount = 0;
  

  classes: Observable <Class[]>;
  classesTaken: Observable<Class[]>;
  class: Observable <Class>;
  existClass: classtaken;
  currentStudent: studentName={name:"name"}
  private name = new BehaviorSubject<string>("Default name");
  currentName = this.name.asObservable();

  public semester1: Observable<Class[]>
  public semester2: Observable<Class[]>
  public semester3: Observable<Class[]>
  public semester4: Observable<Class[]>
  public semester5: Observable<Class[]>
  public semester6: Observable<Class[]>
  public semester7: Observable<Class[]>
  public semester8: Observable<Class[]>

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService) {
      this.classes = this.db.list('classes').valueChanges();
  }

  setCurrentStudent(name) {
    // console.log("Setting current name: " + name)
    // this.currentStudent.name = name;
    // console.log(this.currentStudent.name);
    this.name.next(name);
    console.log(this.currentName);
  }

  getCurrentStudent() {
    return this.name;
  }

  getCurrentClassList(): Observable<Class[]> {
    this.classes = this.db.list(this.basePath).valueChanges();
    return this.classes
  }

  getSemester1(): Observable<Class[]> {
    this.semester1 = this.db.list('classesTaken', ref =>
      ref.orderByChild('semester').equalTo("1")
    ).valueChanges();
    return this.semester1;
  }

  getSemester2(): Observable<Class[]> {
    this.semester2 = this.db.list('classesTaken', ref =>
      ref.orderByChild('semester').equalTo("2")
    ).valueChanges();
    return this.semester2;
  }

  getSemester3(): Observable<Class[]> {
    this.semester3 = this.db.list('classesTaken', ref =>
      ref.orderByChild('semester').equalTo("3")
    ).valueChanges();
    return this.semester3;
  }

  getSemester4(): Observable<Class[]> {
    this.semester4 = this.db.list('classesTaken', ref =>
      ref.orderByChild('semester').equalTo("4")
    ).valueChanges();
    return this.semester4;
  }

  getSemester5(): Observable<Class[]> {
    this.semester5 = this.db.list('classesTaken', ref =>
      ref.orderByChild('semester').equalTo("5")
    ).valueChanges();
    return this.semester5;
  }

  getSemester6(): Observable<Class[]> {
    this.semester6 = this.db.list('classesTaken', ref =>
      ref.orderByChild('semester').equalTo("6")
    ).valueChanges();
    return this.semester6;
  }

  getSemester7(): Observable<Class[]> {
    this.semester7 = this.db.list('classesTaken', ref =>
      ref.orderByChild('semester').equalTo("7")
    ).valueChanges();
    return this.semester7;
  }

  getSemester8(): Observable<Class[]> {
    this.semester8 = this.db.list('classesTaken', ref =>
      ref.orderByChild('semester').equalTo("8")
    ).valueChanges();
    return this.semester8;
  }

  getTakenClassList() {
    this.classesTaken = this.db.list('/classes-taken').valueChanges();
    return this.classesTaken
  }

  addClass(newClass: Class): void {
    this.getCurrentClassList();
    const classes = this.db.list('classes');
    classes.push(newClass);
  }

  getClass(className) {
    const tempClass = this.db.list(this.basePath, ref => 
      ref.orderByChild('Course').equalTo(className)
    ).valueChanges();
    const tempClass2 = this.db.object('Class')
    return tempClass
  }

  addTakenClass(newClass): void {
    this.getTakenClassList();
    const classesTaken = this.db.list('classesTaken');
    // if(!this.checkExists(newClass.course)) {
    // console.log("pushed");
      classesTaken.push(newClass);
    // }
      
    
  }

  checkExists(course) {
    const classes: Observable<classtaken[]> = this.db.list('classesTaken', ref =>
      ref.orderByChild('course').equalTo(course)
    ).valueChanges();
    classes.subscribe(ref => {
      const className = ref[0].course;
      console.log(className === course);
      if(course == className) {
        return true;
      } else {
        return false;
      }
    })
  }
}
