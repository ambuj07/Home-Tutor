import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkExperienceComponent } from './update-work-experience.component';

describe('UpdateWorkExperienceComponent', () => {
  let component: UpdateWorkExperienceComponent;
  let fixture: ComponentFixture<UpdateWorkExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWorkExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
