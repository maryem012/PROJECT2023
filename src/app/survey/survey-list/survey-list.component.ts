import { Component, OnInit } from '@angular/core';
import { Survey } from 'knockout/kosurvey';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveys: any;

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.fetchSurveys();
  }

  fetchSurveys(): void {
    this.surveyService.getSurveys()
      .subscribe(
        (data: any) => {
          this.surveys = data;
          // Log the fetched surveys
          console.log(this.surveys);
        },
        error => {
          console.error('Error fetching surveys:', error);
        }
      );
  }
}
