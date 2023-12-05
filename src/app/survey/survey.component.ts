import { Component, OnInit } from '@angular/core';
import * as Survey from 'survey-angular';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../services/survey.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  survey: any;
  title: string = '';
  student:any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private surveyService: SurveyService ,
    private MessageService: MessageService,  ) {}

  ngOnInit() {
    this.student = localStorage.getItem('user');
    this.student = JSON.parse(this.student);
    console.log (this.student._id)
    this.route.params.subscribe(params => {
      const filename = params['filename']; // Get the survey ID from the route parameter

      // Fetch survey data by filename from the backend via your service
      this.surveyService.getSurvey(filename).subscribe(
        (data: any) => {
          this.initializeSurvey(data); // Initialize the survey with the fetched data
        },
        error => {
          console.error('Error fetching survey:', error);
        }
      );
    });
  }

  initializeSurvey(data: any): void {
    // Initialize Survey with the fetched survey data
    this.survey = new Survey.Model(data);
    this.title = data.title || 'Survey Title';

    // Attach the onComplete event handler to save survey results
    this.survey.onComplete.add((sender: any, options: any) => {
      this.saveSurveyResults(sender.data); // Save survey results when the survey is completed
    });

    // Render the survey in 'surveyElement' div
    this.survey.render('surveyElement');
  }

  saveSurveyResults(results: any): void {
    // Get the survey filename from the route
    const filename = this.route.snapshot.params['filename'];

    // Combine survey results with additional data (student ID and survey filename)
     const dataToSave = {
      studentId: this.student._id, // Assuming 'id' is the property holding the student ID
    
      surveyName: filename,
      surveyResults: results
    };

    // Send the combined data to the backend for saving
    this.surveyService.saveSurveyResults(dataToSave).subscribe(
      (response: any) => {
        console.log('Survey results saved successfully:', response);
        this.MessageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Survey results saved successfully',
          life: 3000,
        });
      },
      error => {
        console.error('Error saving survey results:', error);
        // Optionally, display an error message or perform other actions
      }
    );
  }

}
