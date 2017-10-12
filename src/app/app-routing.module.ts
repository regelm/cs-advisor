import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { AdvisorLoginComponent } from './advisor/advisor-login/advisor-login.component';
import { StudentComponent } from './students/student/student.component';
import { CurrentClassesComponent } from './current-classes/current-classes.component';
import { ClassFormComponent } from './current-classes/class-form/class-form.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AdvisorLoginComponent},
  {path: 'create-student', component: StudentFormComponent},
  {path: 'students', component: StudentComponent},
  {path: 'current-classes', component: CurrentClassesComponent},
  {path: 'add-class', component: ClassFormComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 
export class AppRoutingModule {}