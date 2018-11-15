import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorMenuComponent } from './tutor-menu.component';

describe('TutorMenuComponent', () => {
  let component: TutorMenuComponent;
  let fixture: ComponentFixture<TutorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
