import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SurveyService } from 'src/app/services/survey.service';
import { LayoutService } from '../layout/service/app.layout.service';

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
visible: boolean = false;

  constructor(    private layoutService: LayoutService,
  private surveyService:SurveyService,private messageService: MessageService, private http: HttpClient,private fileUploadService: SurveyService) {}


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
        this.fetchSurveys();
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
showDialog() {
  this.visible = true; // Show the dialog
}
}