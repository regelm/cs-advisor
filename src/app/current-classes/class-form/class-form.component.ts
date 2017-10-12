import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ClassesService } from '../service/classes.service';
import { Class } from '../class';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css'],
  providers: [ClassesService]
})
export class ClassFormComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private classService: ClassesService
  ) { }

  Description = '';
  Course = '';
  Professor = '';
  Credit = '';
  Comp = '';
  SOC = ''
  errorMessage = '';
  error: {name: string, message: string } = {name: '', message: ''};

  ngOnInit() {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''}
  }

  addClass(): void {
    this.clearErrorMessage()

    const tempClass: Class = {
      Comp: this.Comp,
      Course: this.Course,
      Credit: this.Credit,
      Description: this.Description,
      Professor: this.Professor,
      SOC: this.SOC
    }
    console.log(tempClass);

    this.classService.addClass(tempClass)
    this.router.navigate(['/current-classes'])

  }

  goBack() {
    this.router.navigate(['/current-classes'])
  }

  logOut() {
    this.authService.signOut();
  }

}
