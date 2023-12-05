import { Component, OnInit } from '@angular/core';
import { SurveyCreatorModel } from "survey-creator-core";
import { SurveyService } from '../services/survey.service';

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true
};
const defaultJson = {
  pages: [{
    name: "Name",
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  }]
};
@Component({
  selector: 'app-survey-creator',
  templateUrl: './survey-creator.component.html',
  styleUrls: ['./survey-creator.component.css']
})
export class SurveyCreatorComponent  implements OnInit {
  constructor( private surveyService:SurveyService){}
  surveyCreatorModel: SurveyCreatorModel = new SurveyCreatorModel(defaultJson);
   ngOnInit() {
    const creator = new SurveyCreatorModel(creatorOptions);
    creator.text = window.localStorage.getItem('survey-json') || JSON.stringify(defaultJson);

   
    this.surveyCreatorModel = creator;
  }
}
