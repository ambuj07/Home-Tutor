import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTutorAddressComponent } from './update-tutor-address.component';

describe('UpdateTutorAddressComponent', () => {
  let component: UpdateTutorAddressComponent;
  let fixture: ComponentFixture<UpdateTutorAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTutorAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTutorAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
