import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SurveyService } from 'src/app/services/survey.service';
import { LayoutService } from '../../layout/service/app.layout.service';
interface SurveyResult {
  _id: string;
  results: {
    [key: string]: any; // Adjust this based on your survey result structure
  };
}
@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {
  constructor(private router: Router,private route: ActivatedRoute,    private layoutService: LayoutService,
    private surveyService:SurveyService,private messageService: MessageService, private http: HttpClient,private fileUploadService: SurveyService,private confirmationService:ConfirmationService) {
      
    }
    surveyResult:any
    filename:any
    selectedSurvey: any;
    selectedQuestions:any;
    selectedQuestion: any;
    chartData: any;
    surveyResults:any
    surveysList: any[] = []; // Populate this with your survey data
    questionsList: string[] = [];
    multipleChartData: any[] = [];
    selectedChartType: string = 'bar'; // Default chart type
    result:any
  
ngOnInit(): void {
   this.filename = this.route.snapshot.paramMap.get('filename');
console.log(this.filename)
  // Retrieve the filename parameter from the URL
    if (this.filename) {
      // Call a method to fetch survey results based on the filename
      this.displaySurveyResults(this.filename);
    } else {
      // Handle case where filename is not available in the URL
      console.error('Filename not found in URL.');
    }



  };

  
  displaySurveyResults(filename: string): void {
    this.surveyService.getSurveyResultByFilename(filename).subscribe(
      (data: any) => {
        this.surveyResults = data.data; // Assuming data contains an array of survey results
        console.log('Fetched Survey Results:', this.surveyResults);
  
        // Extract field names dynamically and set questionsList
        if (this.surveyResults && this.surveyResults.length > 0) {
          const firstSurvey = this.surveyResults[0]; // Consider the first survey for field extraction
          this.questionsList = Object.keys(firstSurvey.results.surveyResults);
          console.log('Questions List:', this.questionsList);
        } else {
          console.log('No survey results found.');
        }
      },
      (error: any) => {
        console.error('Error fetching survey results:', error);
        // Handle error, show error message, etc.
      }
    );
  }
  displayMultipleCharts(): void {
    if (this.selectedQuestions.length > 0 && this.surveyResults) {
      // Initialize an array to hold chart data for multiple questions
      this.multipleChartData = [];
  
      // Iterate through each selected question
      this.selectedQuestions.forEach((selectedQuestion: string | number) => {
        const questionMap: Map<string, number> = new Map();
  
        this.surveyResults.forEach((result: any) => {
          const response = result.results.surveyResults[selectedQuestion];
          const responseKey = JSON.stringify(response); // Convert the response to a string key
  
          if (questionMap.has(responseKey)) {
            questionMap.set(responseKey, questionMap.get(responseKey)! + 1);
          } else {
            questionMap.set(responseKey, 1);
          }
        });
  
        const labels: string[] = Array.from(questionMap.keys());
        const data: number[] = Array.from(questionMap.values());
  
        // Push chart data for each question into the array
        this.multipleChartData.push({
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: this.getRandomColors(data.length), // Function to generate random colors
              type: this.selectedChartType // Set the chart type dynamically
            }
          ]
        });
      });
    }
  }
  
  

  

  getRandomColors(count: number): string[] {
    // Generate random colors (you can modify this function as needed)
    const colors = [];
    for (let i = 0; i < count; i++) {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(randomColor);
    }
    return colors;
  }
  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple
    }
}


}
