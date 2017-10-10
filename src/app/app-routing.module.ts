import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { AdvisorLoginComponent } from './advisor/advisor-login/advisor-login.component';
import { StudentComponent } from './students/student/student.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AdvisorLoginComponent},
  {path: 'create-student', component: StudentFormComponent},
  {path: 'students', component: StudentComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 
export class AppRoutingModule {}