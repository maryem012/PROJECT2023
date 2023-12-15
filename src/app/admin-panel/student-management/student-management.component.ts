import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent  implements OnInit,AfterViewInit {
  admin:any;
  loadedReq:any;
  isSidebarHidden = false;
  numberOfRequests:any;
  loadedcom:any;
  numberOfcoms:any;


  constructor(private router: Router) {

  }


  ngOnInit(): void {
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin);

  }
    ngAfterViewInit(): void {
    // You can access the chart here via this.chart
  }





}
