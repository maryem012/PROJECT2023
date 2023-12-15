import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ChartComponent } from "ng-apexcharts";
import { RequestService } from '../services/request.service';
import { ComplaintsService } from '../services/complaints.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any[];
};

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css', ]
})
export class AdminPanelComponent implements OnInit,AfterViewInit {
  admin:any;
  loadedReq:any;
  isSidebarHidden = false;
  numberOfRequests:any;
  loadedcom:any;
  numberOfcoms:any;

  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private requestService:RequestService,private complainService:ComplaintsService) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }


  ngOnInit(): void {
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin);
    this.loadRequest();
     this.loadComplain();
  }
    ngAfterViewInit(): void {
    // You can access the chart here via this.chart
    console.log(this.chart);
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
      loadComplain(){
        this.complainService.getComplaints().subscribe(res=>{
          this.loadedcom=res
          console.log("loadedcom",this.loadedcom)
          this.numberOfcoms = this.loadedcom.length;
        }
        )
          }


}
