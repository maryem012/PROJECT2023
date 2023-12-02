import { Component } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { request } from 'src/app/interfaces/request';
import { CertificationService } from 'src/app/services/certification.service';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-listresquest',
  templateUrl: './listresquest.component.html',
  styleUrls: ['./listresquest.component.css']
})
export class ListresquestComponent  {
  constructor(private certificationService:CertificationService,  private requestService:RequestService,private messageService:MessageService,private complaintService:ComplaintsService){}
  student:any;
  loadedCert:any
  request:request={
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
    this.loadRequest();

  }

    loadRequest(){
  this.requestService.getRequests().subscribe(res=>{
    this.loadedReq=res.filter((row)=>row.studentId===this.studId)
    console.log("request",this.loadedReq)
    this.numberOfRequests = this.loadedReq.length;


    }
    )}}
