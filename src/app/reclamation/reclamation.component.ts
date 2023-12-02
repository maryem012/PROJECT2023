import { Component, OnInit } from '@angular/core';
import { complaint } from '../interfaces/complaint';
import { MessageService } from 'primeng/api';
import { ComplaintsService } from '../services/complaints.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  constructor(private MessageService: MessageService, private complaintService: ComplaintsService) {}

  student: any;
  today = new Date();
  rec: complaint = {
    studentId: '',
    studentName: '',
    createdAt: new Date(),
    department: '',
    description: '',
    subject: '',
    status:''
  };
  isSubmitting = false;

  ngOnInit(): void {
    this.student = localStorage.getItem('user');
    this.student = JSON.parse(this.student);
  }

  createComplaint() {
    if (this.isSubmitting) {
      return;
    }

    const data = {
      studentId: this.student._id,
      studentName: this.student.firstName + this.student.lastName,
      createdAt: this.today,
      department: this.rec.department,
      description: this.rec.description,
      subject: this.rec.subject,
      status:this.rec.status="waiting",
    };

    this.isSubmitting = true;

    this.complaintService.createComplaint(data).subscribe(
      (res) => {
        console.log(res);
        this.MessageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Complaint saved successfully',
          life: 3000,
        });
        this.resetForm();
        this.isSubmitting = false;
      },
      (error) => {
        console.error(error);
        this.MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save the complaint. Please try again.',
          life: 3000,
        });
        this.isSubmitting = false;
      }
    );
  }

  private resetForm() {
    this.rec = {
      studentId: this.student._id,
      studentName: this.student.firstName + this.student.LastName,
      createdAt: new Date(),
      department: '',
      description: '',
      subject: '',
      status:this.rec.status,

    };
  }



}
