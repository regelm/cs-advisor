import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentClassesComponent } from './current-classes.component';

describe('CurrentClassesComponent', () => {
  let component: CurrentClassesComponent;
  let fixture: ComponentFixture<CurrentClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
