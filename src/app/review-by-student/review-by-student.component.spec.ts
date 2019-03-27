import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewByStudentComponent } from './review-by-student.component';

describe('ReviewByStudentComponent', () => {
  let component: ReviewByStudentComponent;
  let fixture: ComponentFixture<ReviewByStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewByStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
