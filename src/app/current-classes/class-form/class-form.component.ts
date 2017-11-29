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

  classList;

  Description = '';
  Course = '';
  Professor = '';
  Credit = '';
  Comp = '';
  SOC = ''
  errorMessage = '';
  error: {name: string, message: string } = {name: '', message: ''};
  alerts: any = [];

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
    
    this.classList = this.classService.getCurrentClassList();
    var count = 0;    
    this.classList.subscribe(ref => {
      var exists = false;
      ref.forEach(element => {
                if(element.Course.replace(/\s/g, '') == tempClass.Course.replace(/\s/g, '')) {
          exists = true;
        }
      })
      if(!exists && count == 0) {
        this.classService.addClass(tempClass);
        count += 1;
        this.router.navigate(['/current-classes'])
      } else {
        console.log("Pushing Alert");
        this.alerts.push({
          type: 'danger',
          msg: `That class already exists!`,
          timeout: 100000
        });
      }
    })
  }

  goBack() {
    this.router.navigate(['/current-classes'])
  }

  logOut() {
    this.authService.signOut();
  }

}
