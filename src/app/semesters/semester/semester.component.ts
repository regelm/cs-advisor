import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  @Input() 
    year: string;

  constructor() { }

  ngOnInit() {
  }

}
