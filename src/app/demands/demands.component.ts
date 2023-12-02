import { Component, OnInit } from '@angular/core';
import { request } from '../interfaces/request';
import { RequestService } from '../services/request.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.css']
})
export class DemandsComponent implements OnInit {
  constructor(private messageService: MessageService, private RequestService: RequestService) {}

  student: any;
  today = new Date();
  req: request = {
    studentId: '',
  studentName: '',
  createdAt: new Date(),
  department: '',
  description: '',
  subject: '',
  status:'',
  };
  isSubmitting = false;

  ngOnInit(): void {
    this.student = localStorage.getItem('user');
    this.student = JSON.parse(this.student);
  }

  createRequest() {
    if (this.isSubmitting) {
      return; // Prevent duplicate submissions
    }

    const data = {
      studentId: this.student._id,
      studentName: this.student.firstName + this.student.lastName,
      createdAt: this.today,
      department: this.req.department,
      description: this.req.description,
      subject: this.req.subject,
      status:this.req.status="waiting"
    };

    this.isSubmitting = true;

    this.RequestService.createRequest(data).subscribe({

      next: (res:any) => {

        console.log(res);
        this.isSubmitting = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Request successfully saved',
          life: 3000,

        })
      },
      error: (e:any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: ' Request no saved , try again',
          life: 3000,
        });
      }

    })}

  private resetForm() {
    this.req = {
      studentId: this.student._id,
      studentName: this.student.firstName + this.student.LastName,
      createdAt: new Date(),
      department: '',
      description: '',
      subject: '',
      status:''
    };
  }


}
