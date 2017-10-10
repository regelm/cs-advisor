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
    AdvisorLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
