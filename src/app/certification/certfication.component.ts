import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CertificationService } from '../services/certification.service';
import { certification } from '../interfaces/certification';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent {
  student: any;
  today = new Date();
  cer: certification = {
    studentName: "",
    studentId: "",
    createdAt: new Date(),
    optainedAt: new Date(),
    Title:  "",
    provider:  "",
    file: "",
  };
  isSubmitting = false;
  constructor(
    private messageService: MessageService,
    private certificationService: CertificationService
  ) {}

  ngOnInit(): void {
    this.student = JSON.parse(localStorage.getItem('user') || '{}');
  }

  createCert(): void {
    if (this.isSubmitting) {
      return; // Prevent duplicate submissions
    }

    const data = {
      studentName: `${this.student.firstName} ${this.student.lastName}`,
      studentId: this.student._id,
      createdAt: this.today,
      optainedAt: this.cer.optainedAt,
      Title: this.cer.Title,
      provider: this.cer.provider,
      file: this.cer.file
    };

    this.isSubmitting = true;

    this.certificationService.createCertification(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isSubmitting = false; // Set back to false after successful submission
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Certification successfully saved',
          life: 3000,
        });
        this.resetForm(); // Reset the form after successful submission
      },
      error: (e: any) => {
        console.error(e); // Log error for debugging purposes
        this.isSubmitting = false; // Set back to false in case of error
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Certification not saved, please try again',
          life: 3000,
        });
      }
    });
  }

  private resetForm(): void {
    this.cer = {
      studentId: this.student?._id || '',
      studentName: `${this.student?.firstName} ${this.student?.lastName}` || '',
      createdAt: new Date(),
      optainedAt: new Date(),
      Title:  "",
      provider:  "",
      file: "",
    };
  }
  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      // Handle file(s) here, e.g., assign it to a field in your component
      // Example: this.cer.file = files[0];
      console.log(files[0]); // Log the file object for testing purposes
    }
  }
}
