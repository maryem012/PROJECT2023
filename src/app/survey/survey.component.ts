import { Component, OnInit } from '@angular/core';
import * as Survey from 'survey-angular';
import { json } from './json';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  survey: any;
  title:any
  ngOnInit() {
    this.title = 'My First Survey';
    const survey = new Survey.Model(json);

    survey.render('surveyElement');
  }
}
