import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { Class } from '../class';
import * as firebase from 'firebase';

@Injectable()
export class ClassesService {

  private basePath: string = '/classes';

  classes: Observable <Class[]>;
  class: Observable <Class>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService) {
      this.classes = this.db.list('classes').valueChanges();
  }

  getCurrentClassList(): Observable<Class[]> {
    this.classes = this.db.list(this.basePath).valueChanges();
    return this.classes
  }

  addClass(newClass: Class): void {
    this.getCurrentClassList();
    const classes = this.db.list('classes');
    classes.push(newClass);
  }

  

}
