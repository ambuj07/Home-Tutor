import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyTutorsComponent } from './nearby-tutors.component';

describe('NearbyTutorsComponent', () => {
  let component: NearbyTutorsComponent;
  let fixture: ComponentFixture<NearbyTutorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyTutorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
