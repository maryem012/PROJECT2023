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
  loadedCert:any;
  today = new Date();
  studId:any;
  isSubmitting = false;
  constructor(
    private messageService: MessageService,
    private certificationService: CertificationService
  ) {}

  ngOnInit(): void {
    this.student = localStorage.getItem('user');
    this.student = JSON.parse(this.student);
    this.studId=this.student._id
this.loadCertifications();
  }



  loadCertifications(){
    this.certificationService.getCertifications().subscribe(res=>{
     console.log(res)
     this.loadedCert=res.filter((row)=>row.studentId===this.studId)

     console.log(this.loadedCert)
   }
     )
    }
}
