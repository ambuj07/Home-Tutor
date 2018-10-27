import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMoreTutorsComponent } from './find-more-tutors.component';

describe('FindMoreTutorsComponent', () => {
  let component: FindMoreTutorsComponent;
  let fixture: ComponentFixture<FindMoreTutorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindMoreTutorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMoreTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
