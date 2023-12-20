import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ChartComponent } from "ng-apexcharts";
import { RequestService } from '../services/request.service';
import { ComplaintsService } from '../services/complaints.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SurveyService } from '../services/survey.service';
import { LayoutService } from './layout/service/app.layout.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any[];
};
const availableChartTypes: string[] = ['bar', 'pie']; // Add more types as needed

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css', ]
})
export class AdminPanelComponent implements OnInit,AfterViewInit {
  admin:any;
  surveys:any
  loadedReq:any;
  isSidebarHidden = false;
  numberOfRequests:any;
  loadedcom:any;
  numberOfcoms:any;
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
  Selectedsurvey:any

  constructor(private requestService:RequestService,private complainService:ComplaintsService,private router: Router,private route: ActivatedRoute,    private layoutService: LayoutService,
    private surveyService:SurveyService,private messageService: MessageService, private http: HttpClient,private fileUploadService: SurveyService,private confirmationService:ConfirmationService) {
  }

  ngOnInit(): void {
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin);
    this.loadRequest();
     this.loadComplain();
     this.fetchSurveys();
     this.fetchSurveyResults()
     this.surveyService.getSurveys().subscribe(
      (data: any) => {
        this.surveys = data; // Assuming data contains the list of available surveys
        this.selectRandomSurvey();
      },
      (error: any) => {
        console.error('Error fetching surveys:', error);
        // Handle error, show error message, etc.
      }
    );
  }
    ngAfterViewInit(): void {
    // You can access the chart here via this.chart
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
  selectRandomSurvey(): void {
    if (this.surveys && this.surveys.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.surveys.length);
      this.selectedSurvey = this.surveys[randomIndex].filename;

      // Fetch and display results for the randomly selected survey
      if (this.selectedSurvey) {
        this.displaySurveyResults(this.selectedSurvey);
      }
    }}
  loadRequest(){
    this.requestService.getRequests().subscribe(res=>{
      this.loadedReq=res
      console.log("request",this.loadedReq)
      this.numberOfRequests = this.loadedReq.length;
    }
    )
      }
      loadComplain(){
        this.complainService.getComplaints().subscribe(res=>{
          this.loadedcom=res
          console.log("loadedcom",this.loadedcom)
          this.numberOfcoms = this.loadedcom.length;
        }
        )
          }
//survey list
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
//charts

onSurveySelect(): void {
  this.displaySurveyResults(this.selectedSurvey);
}

displaySurveyResults(filename: string): void {
  this.surveyService.getSurveyResultByFilename(filename).subscribe(
    (data: any) => {
      this.surveyResults = data.data; // Assuming data contains an array of survey results
      console.log('Fetched Survey Results:', this.surveyResults);

      // Extract field names dynamically and set questionsList
      if (this.surveyResults && this.surveyResults.length > 0) {
        const firstSurvey = this.surveyResults[0];
        this.questionsList = Object.keys(firstSurvey.results.surveyResults);
        console.log('Questions List:', this.questionsList);

        // Call displayCharts to render charts for each question
        this.displayCharts();
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

// Add available chart types at the top of the component

// Inside the component class
displayCharts(): void {
  if (this.questionsList.length > 0 && this.surveyResults) {
    // Clear previous chart data
    this.multipleChartData = [];

    // Create an array to store titles and chart types for each chart
    const chartTitles: string[] = [];
    const chartTypes: string[] = [];

    // Iterate through each question
    this.questionsList.forEach((selectedQuestion: string | number) => {
      const questionMap: Map<string, number> = new Map();

      this.surveyResults.forEach((result: any) => {
        const response = result.results.surveyResults[selectedQuestion];
        const responseKey = JSON.stringify(response);

        if (questionMap.has(responseKey)) {
          questionMap.set(responseKey, questionMap.get(responseKey)! + 1);
        } else {
          questionMap.set(responseKey, 1);
        }
      });

      const surveyLabels: string[] = Array.from(questionMap.keys());
      const surveyData: number[] = Array.from(questionMap.values());

      // Randomly select a chart type for each question
      const randomChartType = availableChartTypes[Math.floor(Math.random() * availableChartTypes.length)];

      // Create chart data for each question without a title
      const chartData = {
        labels: surveyLabels,
        datasets: [
          {
            data: surveyData,
            backgroundColor: this.getRandomColors(surveyData.length), // Function to generate random colors
            type: randomChartType // Assign the random chart type
          }
        ]
      };

      // Push chart data for each question into the array
      this.multipleChartData.push(chartData);

      // Push the title and chart type for each chart into the respective arrays
      chartTitles.push(selectedQuestion.toString()); // Assuming selectedQuestion is a string
      chartTypes.push(randomChartType);
    });

    // Assign titles and chart types to each chart data
    this.multipleChartData.forEach((chartData, index) => {
      chartData['title'] = chartTitles[index];
      chartData['chartType'] = chartTypes[index];
    });
  }
}


getRandomColors(count: number): string[] {
  // Generate random colors (you can modify this function as needed)
  const colors = [];
  for (let i = 0; i < count; i++) {
    const randomColor = '#' + Math.floor(Math.random() * 16774215).toString(16);
    colors.push(randomColor);
  }
  return colors;
}
///fetch all survey results
fetchSurveyResults(): void {
  this.surveyService.fetchSavedSurveyResults().subscribe(
    (surveys: any[]) => {
      console.log('Fetched Surveys results:', surveys);

      const surveyResponseCounts = this.calculateSurveyResponseCounts(surveys);
      console.log('Survey Response Counts:', surveyResponseCounts);

      const labels = surveyResponseCounts.map(survey => survey.surveyName.substring(0, survey.surveyName.indexOf('.'))  );
      console.log('Labels:', labels);

      const data = surveyResponseCounts.map(survey => survey.responseCount);
      console.log('Data:', data);

      // Prepare the chart data
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Number of Responses',
            data: data,
            backgroundColor: this.getRandomColors(data.length), // Function to generate random colors
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    },
    (error: any) => {
      console.error('Error fetching survey data:', error);
      // Handle error, show error message, etc.
    }
  );
}





calculateSurveyResponseCounts(surveys: any[]): { surveyName: string; responseCount: number }[] {
  const responseCounts: { [key: string]: number } = {};

  // Calculate response counts for each survey
  surveys.forEach(survey => {
    const surveyName = survey.results?.surveyName;

    if (surveyName) {
      if (responseCounts[surveyName]) {
        responseCounts[surveyName]++;
      } else {
        responseCounts[surveyName] = 1;
      }
    }
  });

  // Convert responseCounts object into an array of objects for each survey
  const responseCountsArray = Object.keys(responseCounts).map(key => ({
    surveyName: key,
    responseCount: responseCounts[key]
  }));

  return responseCountsArray;
}






}
