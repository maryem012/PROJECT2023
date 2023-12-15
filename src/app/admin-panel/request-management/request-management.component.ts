import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.css']
})
export class RequestManagementComponent implements OnInit,AfterViewInit {
  admin:any;
  loadedReq:any;
  isSidebarHidden = false;
  numberOfRequests:any;
  loadedcom:any;
  numberOfcoms:any;


  constructor(private requestService:RequestService,private complainService:ComplaintsService,private router: Router) {

  }


  ngOnInit(): void {
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin);
    this.loadRequest();
  }
    ngAfterViewInit(): void {
    // You can access the chart here via this.chart
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
  loadRequest(){
    this.requestService.getRequests().subscribe(res=>{
      this.loadedReq=res
      console.log("request",this.loadedReq)
      this.numberOfRequests = this.loadedReq.length;
    }
    )
      }


}
