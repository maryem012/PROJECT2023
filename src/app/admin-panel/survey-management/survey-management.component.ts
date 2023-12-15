import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SurveyService } from 'src/app/services/survey.service';

interface CustomFile {
  name: string;
  size: number;
}

@Component({
  selector: 'app-survey-management',
  templateUrl: './survey-management.component.html',
  styleUrls: ['./survey-management.component.css']
})
export class SurveyManagementComponent implements OnInit {
  uploadedFiles: CustomFile[] = [];
admin:any
surveys: any;

  constructor(private surveyService:SurveyService,private messageService: MessageService, private http: HttpClient,private fileUploadService: SurveyService) {}


  ngOnInit(): void {
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin);
  this.fetchSurveys();
  }
  onUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    this.fileUploadService.uploadFile(file).subscribe({
      next: (response: any) => {
        console.log('File uploaded successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'File successfully saved',
          life: 3000,
        });
      },
      error: (e: any) => {
                  console.error('Error uploading file:', e);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'file not saved, please try again',
          life: 3000,
        });
  }});
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
