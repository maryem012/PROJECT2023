import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { complaint } from 'src/app/interfaces/complaint';
import { CertificationService } from 'src/app/services/certification.service';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-list-complaint',
  templateUrl: './list-complaint.component.html',
  styleUrls: ['./list-complaint.component.css']
})
export class ListComplaintComponent {
  constructor(private certificationService:CertificationService,  private requestService:RequestService,private messageService:MessageService,private complaintService:ComplaintsService){}
  student:any;
  loadedCert:any

  complaint:complaint={
    studentId: '',
    studentName: '',
    createdAt: new Date(),
    department: '',
    description: '',
    subject: '',
    status:''
  }

  loadedReq:any;
  loadedCom:any
  studId:any
  numberOfComplaints:any
  numberOfRequests:any
  numberOfCerts:any
  ngOnInit(): void {
    this.student = localStorage.getItem('user');
    this.student = JSON.parse(this.student);
    this.studId=this.student._id
    this.loadComplaints();


  }


    loadComplaints(){
   this.complaintService.getComplaints().subscribe(res=>{
    console.log(res)
    this.loadedCom=res.filter((row)=>row.studentId===this.studId)
    this.numberOfComplaints = this.loadedCom.length;

    console.log(this.loadedCom)
  }
    )
   }

    }
