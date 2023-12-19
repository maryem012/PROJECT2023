import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultsComponent } from './survey-results.component';

describe('SurveyResultsComponent', () => {
  let component: SurveyResultsComponent;
  let fixture: ComponentFixture<SurveyResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyResultsComponent]
    });
    fixture = TestBed.createComponent(SurveyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
