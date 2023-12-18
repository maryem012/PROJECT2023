import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { RequestService } from 'src/app/services/request.service';
import { ChartOptions } from '../admin-panel.component';
import { Router } from '@angular/router';
import { LayoutService } from '../layout/service/app.layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-complaint-management',
  templateUrl: './complaint-management.component.html',
})
export class ComplaintManagementComponent implements OnInit,AfterViewInit {
  admin:any;
  isSidebarHidden = false;
  numberOfRequests:any;
  loadedcom:any;
  numberOfcoms:any;
selectedComplaints:any
visible: boolean = false;
constructor(private layoutService:LayoutService,private complainService:ComplaintsService,private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) {

  }


  ngOnInit(): void {
    this.admin = localStorage.getItem('user');
    this.admin = JSON.parse(this.admin);
     this.loadComplain();
  }
    ngAfterViewInit(): void {
    // You can access the chart here via this.chart
  }


      loadComplain(){
        this.complainService.getComplaints().subscribe(res=>{
          this.loadedcom=res
          console.log("loadedcom",this.loadedcom)
        }
        )
          }

          showDialog(loadedcom: any): void {
            this.selectedComplaints = loadedcom;
            this.visible = true;
          }
        


          get containerClass() {
            return {
                'layout-theme-light': this.layoutService.config.colorScheme === 'light',
                'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
                'layout-overlay': this.layoutService.config.menuMode === 'overlay',
                'layout-static': this.layoutService.config.menuMode === 'static',
                'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
                'layout-overlay-active': this.layoutService.state.overlayMenuActive,
                'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
                'p-input-filled': this.layoutService.config.inputStyle === 'filled',
                'p-ripple-disabled': !this.layoutService.config.ripple
            }
        }
        markAsTreated() {
          console.log('Selected Complaints before update:', this.selectedComplaints);
          if (this.selectedComplaints && this.selectedComplaints._id){
            this.selectedComplaints.status="treated"
            this.complainService.updateComplaint(this.selectedComplaints).subscribe({
              next: (res) => {
                console.log(res);
                console.log('Selected Complaints zfter update:', this.selectedComplaints);

              },
              error: (e) => console.error(e)
            })
        
          }}
      
        confirmMarkAsTreated() {
          this.confirmationService.confirm({
            message: 'Are you sure you want to mark this complaint as treated?',
            accept: () => {
              this.markAsTreated();
            }
          });
        }
      

        deleteComplaint(loadedcom: any) {
          console.log('Delete button clicked for:', loadedcom);
      
          this.confirmationService.confirm({
            message: 'Are you sure you want to delete this complaint',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.complainService.deleteComplaint(loadedcom._id).subscribe({
                next: (res) => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'complaint Deleted',
                    life: 3000,
                  });
                  this.loadComplain();
                },
                error: (e) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'error',
                    detail: 'complaint not deleted',
                    life: 3000,
                  });
                }
              })
            },
          });
        }
}
