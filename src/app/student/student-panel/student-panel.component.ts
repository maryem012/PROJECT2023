import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { certification } from 'src/app/interfaces/certification';
import { complaint } from 'src/app/interfaces/complaint';
import { request } from 'src/app/interfaces/request';
import { CertificationService } from 'src/app/services/certification.service';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent implements OnInit{
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
complaint:complaint={
  studentId: '',
  studentName: '',
  createdAt: new Date(),
  department: '',
  description: '',
  subject: '',
  status:''
}
cert:certification={
  studentName: "",
    studentId: "",
    createdAt: new Date(),
    optainedAt: new Date(),
    Title:  "",
    provider:  "",
    file: "",
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
  this.loadRequest();
  this.loadCertifs();

}

  loadRequest(){
this.requestService.getRequests().subscribe(res=>{
  this.loadedReq=res.filter((row)=>row.studentId===this.studId)
  console.log("request",this.loadedReq)
  this.numberOfRequests = this.loadedReq.length;


  }
  )}
  loadComplaints(){
 this.complaintService.getComplaints().subscribe(res=>{
  console.log(res)
  this.loadedCom=res.filter((row)=>row.studentId===this.studId)
  this.numberOfComplaints = this.loadedCom.length;

  console.log(this.loadedCom)
}
  )
 }
 loadCertifs(){
  this.certificationService.getCertifications().subscribe(res=>{
   console.log(res)
   this.loadedCert=res.filter((row)=>row.studentId===this.studId)
   console.log(this.loadedCert)
   this.numberOfCerts = this.loadedCert.length;

 }
   )
  }
  }
