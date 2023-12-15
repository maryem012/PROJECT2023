import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { RequestService } from 'src/app/services/request.service';
import { ChartOptions } from '../admin-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-management',
  templateUrl: './complaint-management.component.html',
  styleUrls: ['./complaint-management.component.css']
})
export class ComplaintManagementComponent implements OnInit,AfterViewInit {
  admin:any;
  isSidebarHidden = false;
  numberOfRequests:any;
  loadedcom:any;
  numberOfcoms:any;


  constructor(private requestService:RequestService,private complainService:ComplaintsService,private router: Router) {

  }


  ngOnInit(): void {
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin);
     this.loadComplain();
  }
    ngAfterViewInit(): void {
    // You can access the chart here via this.chart
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

      loadComplain(){
        this.complainService.getComplaints().subscribe(res=>{
          this.loadedcom=res
          console.log("loadedcom",this.loadedcom)
        }
        )
          }


}
