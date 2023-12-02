import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsComponent } from './demands.component';

describe('DemandsComponent', () => {
  let component: DemandsComponent;
  let fixture: ComponentFixture<DemandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandsComponent]
    });
    fixture = TestBed.createComponent(DemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
