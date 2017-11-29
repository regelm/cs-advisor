import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs/Rx';
import { Class } from '../class';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { classtaken } from '../../semesters/semester/classtaken';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';



export class studentName {
  name:string;
}

@Injectable()
export class ClassesService {
  

  private basePath: string = '/classes';
  private takenPath: string = '/classesTaken';
  private dropCount = 0;
  private studentName;
  

  classes: Observable <Class[]>;
  classesTaken: Observable<Class[]>;
  classesTakenFireList: AngularFireList<Class[]>;
  class: Observable <Class>;
  existClass: classtaken;
  private name = new BehaviorSubject<string>("Default name");
  classCount = 0;

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
      const name = this.getCurrentStudent();
      this.classes = this.db.list('classes').valueChanges();
      this.classesTakenFireList = this.db.list('classesTaken/' + name);
      this.studentName = localStorage.getItem('studentName');
  }

  ngOnInit() {
    this.studentName = localStorage.getItem('studentName');
    console.log(this.studentName);
  }
  setCurrentStudent(name) {
    localStorage.setItem('studentName', name);
  }

  getCurrentStudent() {
    this.studentName = localStorage.getItem('studentName');
    return localStorage.getItem('studentName');
  }

  getCurrentClassList(): Observable<Class[]> {
    this.classes = this.db.list(this.basePath).valueChanges();
    return this.classes
  }

  getSemester1(): Observable<Class[]> {
    this.getCurrentStudent();
    this.semester1 = this.db.list('classesTaken/'+this.studentName, ref =>
      ref.orderByChild('semester').equalTo("1")
    ).valueChanges();
    return this.semester1;
  }

  getSemester2(): Observable<Class[]> {
    this.getCurrentStudent();
    this.semester2 = this.db.list('classesTaken/'+this.studentName, ref =>
      ref.orderByChild('semester').equalTo("2")
    ).valueChanges();
    return this.semester2;
  }

  getSemester3(): Observable<Class[]> {
    this.getCurrentStudent();
    this.semester3 = this.db.list('classesTaken/'+this.studentName, ref =>
      ref.orderByChild('semester').equalTo("3")
    ).valueChanges();
    return this.semester3;
  }

  getSemester4(): Observable<Class[]> {
    this.getCurrentStudent();
    this.semester4 = this.db.list('classesTaken/'+this.studentName, ref =>
      ref.orderByChild('semester').equalTo("4")
    ).valueChanges();
    return this.semester4;
  }

  getSemester5(): Observable<Class[]> {
    this.getCurrentStudent();
    this.semester5 = this.db.list('classesTaken/'+this.studentName, ref =>
      ref.orderByChild('semester').equalTo("5")
    ).valueChanges();
    return this.semester5;
  }

  getSemester6(): Observable<Class[]> {
    this.getCurrentStudent();
    this.semester6 = this.db.list('classesTaken/'+this.studentName, ref =>
      ref.orderByChild('semester').equalTo("6")
    ).valueChanges();
    return this.semester6;
  }

  getSemester7(): Observable<Class[]> {
    this.getCurrentStudent();
    this.semester7 = this.db.list('classesTaken/'+this.studentName, ref =>
      ref.orderByChild('semester').equalTo("7")
    ).valueChanges();
    return this.semester7;
  }

  getSemester8(): Observable<Class[]> {
    this.getCurrentStudent();
    this.semester8 = this.db.list('classesTaken/'+this.studentName, ref =>
      ref.orderByChild('semester').equalTo("8")
    ).valueChanges();
    return this.semester8;
  }

  getTakenClassList() {
    this.getCurrentStudent();
    this.classesTaken = this.db.list('classesTaken/' + this.studentName).valueChanges();
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
    this.getCurrentStudent();
    console.log("Adding course");
    const classesTaken = this.db.list('classesTaken/'+ this.studentName);
    classesTaken.push(newClass);
  }

  deleteTakenClass(c) {
    var count = 0;
    this.getCurrentStudent();
    this.classesTakenFireList = this.db.list('classesTaken/' + this.studentName);              
    const deleteClass = this.db.list('classesTaken/'+ this.studentName, ref => 
      ref.orderByChild('course').equalTo(c.course)
    ).snapshotChanges();


    deleteClass.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      console.log(info);
      return {$key, info};
    }).subscribe(course => {
      console.log("Deleting Course");      
      const courseKey = course.$key;
      if(count == 0) {
        this.classesTakenFireList.remove(courseKey);
        count += 1;        
      }
    })
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

  getSS() {
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).valueChanges();
    return distList;
  }
  increaseSS() {
    var count = 0;
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).snapshotChanges();
    const distListUpdate = this.db.list('distributions/' + this.studentName);

    distList.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      return {$key, info};
    }).subscribe(dist => {
      const courseKey = dist.$key;
      var updatedSS = dist.info["SS"];
      updatedSS += 1;
      if(count == 0) {
        distListUpdate.update(courseKey, {'SS': updatedSS})
        count += 1;
      }
    })   
  }
  
  decreaseSS() {
    var count = 0;
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).snapshotChanges();
    const distListUpdate = this.db.list('distributions/' + this.studentName);

    distList.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      return {$key, info};
    }).subscribe(dist => {
      const courseKey = dist.$key;
      var updatedSS = dist.info["SS"];
      updatedSS -= 1;
      if(count == 0) {
        distListUpdate.update(courseKey, {'SS': updatedSS});
        count += 1;
      }
      
    })   
  }
 
  getSM() {
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).valueChanges();
    return distList;
  }
  increaseSM() {
    var count = 0;
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).snapshotChanges();
    const distListUpdate = this.db.list('distributions/' + this.studentName);

    distList.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      return {$key, info};
    }).subscribe(dist => {
      const courseKey = dist.$key;
      var updatedSS = dist.info["SM"];
      updatedSS += 1;
      if(count == 0) {
        distListUpdate.update(courseKey, {'SM': updatedSS})
        count += 1;        
      }
    }) 
  }
  decreaseSM() {
    var count = 0;
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).snapshotChanges();
    const distListUpdate = this.db.list('distributions/' + this.studentName);

    distList.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      return {$key, info};
    }).subscribe(dist => {
      const courseKey = dist.$key;
      var updatedSS = dist.info["SM"];
      updatedSS -= 1;
      if(count == 0) {
        distListUpdate.update(courseKey, {'SM': updatedSS})
        count += 1;        
      }
    }) 
  }

  getAH() {
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).valueChanges();
    return distList; 
  }
  increaseAH() {
    var count = 0;
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).snapshotChanges();
    const distListUpdate = this.db.list('distributions/' + this.studentName);

    distList.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      return {$key, info};
    }).subscribe(dist => {
      const courseKey = dist.$key;
      var updatedSS = dist.info["AH"];
      updatedSS += 1;
      if(count ==  0) {
        distListUpdate.update(courseKey, {'AH': updatedSS})
        count += 1;        
      }
    }) 
  }
  decreaseAH() {
    var count = 0;
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).snapshotChanges();
    const distListUpdate = this.db.list('distributions/' + this.studentName);

    distList.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      return {$key, info};
    }).subscribe(dist => {
      const courseKey = dist.$key;
      var updatedSS = dist.info["AH"];
      updatedSS -= 1;
      if(count == 0) {
        distListUpdate.update(courseKey, {'AH': updatedSS})
        count += 1;
      }
    }) 
  }

  getFL() {
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).valueChanges();
    return distList; 
  }
  increaseFL() {
    var count = 0;
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).snapshotChanges();
    const distListUpdate = this.db.list('distributions/' + this.studentName);

    distList.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      return {$key, info};
    }).subscribe(dist => {
      const courseKey = dist.$key;
      var updatedSS = dist.info["FL"];
      updatedSS += 1;
      if (count == 0) {
        distListUpdate.update(courseKey, {'FL': updatedSS})
        count += 1;
      }
    }) 
  }
  decreaseFL() {
    var count = 0;
    this.getCurrentStudent();
    const distList = this.db.list('distributions/' + this.studentName).snapshotChanges();
    const distListUpdate = this.db.list('distributions/' + this.studentName);

    distList.map(ref => {
      const $key = ref[0].payload.key;
      const info = ref[0].payload.val();
      return {$key, info};
    }).subscribe(dist => {
      const courseKey = dist.$key;
      var updatedSS = dist.info["FL"];
      updatedSS -= 1;
      if (count == 0) {
        distListUpdate.update(courseKey, {'FL': updatedSS})
        count += 1;        
      }
    }) 
  }
}
