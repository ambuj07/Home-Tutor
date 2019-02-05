import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkLocationComponent } from './update-work-location.component';

describe('UpdateWorkLocationComponent', () => {
  let component: UpdateWorkLocationComponent;
  let fixture: ComponentFixture<UpdateWorkLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWorkLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
