import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTutorReferenceComponent } from './update-tutor-reference.component';

describe('UpdateTutorReferenceComponent', () => {
  let component: UpdateTutorReferenceComponent;
  let fixture: ComponentFixture<UpdateTutorReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTutorReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTutorReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
