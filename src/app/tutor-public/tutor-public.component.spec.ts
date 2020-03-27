import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPublicComponent } from './tutor-public.component';

describe('TutorPublicComponent', () => {
  let component: TutorPublicComponent;
  let fixture: ComponentFixture<TutorPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
