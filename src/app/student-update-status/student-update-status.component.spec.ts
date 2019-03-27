import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdateStatusComponent } from './student-update-status.component';

describe('StudentUpdateStatusComponent', () => {
  let component: StudentUpdateStatusComponent;
  let fixture: ComponentFixture<StudentUpdateStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentUpdateStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
