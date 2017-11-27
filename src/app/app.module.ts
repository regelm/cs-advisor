import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StudentComponent } from './students/student/student.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { AdvisorLoginComponent } from './advisor/advisor-login/advisor-login.component';

import { AuthService } from './core/auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireDatabase } from 'angularfire2/database';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentClassesComponent } from './current-classes/current-classes.component';
import { ClassFormComponent } from './current-classes/class-form/class-form.component';
import { SemesterComponent } from './semesters/semester/semester.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { DragulaModule } from 'ng2-dragula';
import { StudentService } from './students/service/student.service';
import { ClassesService } from './current-classes/service/classes.service';
export const firebase = {
  apiKey: "AIzaSyAdtf_Z_EAwvitvK1ZHozvOmVsJ0OjA54c",
  authDomain: "cs-advisor.firebaseapp.com",
  databaseURL: "https://cs-advisor.firebaseio.com",
  projectId: "cs-advisor",
  storageBucket: "cs-advisor.appspot.com",
  messagingSenderId: "451948951824"
}

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentFormComponent,
    AdvisorLoginComponent,
    CurrentClassesComponent,
    ClassFormComponent,
    SemesterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    DragulaModule,    
    DragAndDropModule.forRoot()
  ],
  providers: [
    AuthService,
    AngularFireDatabase,
    StudentService,
    ClassesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
