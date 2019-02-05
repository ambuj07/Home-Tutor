import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClassAndSubjectComponent } from './update-class-and-subject.component';

describe('UpdateClassAndSubjectComponent', () => {
  let component: UpdateClassAndSubjectComponent;
  let fixture: ComponentFixture<UpdateClassAndSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClassAndSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClassAndSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
