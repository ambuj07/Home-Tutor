import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyStudendsComponent } from './nearby-studends.component';

describe('NearbyStudendsComponent', () => {
  let component: NearbyStudendsComponent;
  let fixture: ComponentFixture<NearbyStudendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyStudendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyStudendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
