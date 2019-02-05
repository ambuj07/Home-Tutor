import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEducationQualificationComponent } from './update-education-qualification.component';

describe('UpdateEducationQualificationComponent', () => {
  let component: UpdateEducationQualificationComponent;
  let fixture: ComponentFixture<UpdateEducationQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEducationQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEducationQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
