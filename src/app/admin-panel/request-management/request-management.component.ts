import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { RequestService } from 'src/app/services/request.service';
import { LayoutService } from '../layout/service/app.layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
})
export class RequestManagementComponent implements OnInit, AfterViewInit {
  admin: any;
  loadedReq: any;
  isSidebarHidden = false;
  numberOfRequests: any;
  loadedcom: any;
  numberOfcoms: any;
  visible: boolean = false;
  selectedRequest: any

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private layoutService: LayoutService,
    private requestService: RequestService, private complainService: ComplaintsService, private router: Router,private notificationService:NotificationService
    ) {
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
  showDialog(loadedReq: any) {
    this.selectedRequest = loadedReq; // Assign the clicked row data to a variable
    this.visible = true; // Show the dialog
  }
  loadRequest() {
    this.requestService.getRequests().subscribe(res => {
      this.loadedReq = res
      console.log("request", this.loadedReq)
      this.numberOfRequests = this.loadedReq.length;
    }
    )
  }
  markAsTreated() {
    console.log('Selected request before update:', this.selectedRequest);
    if (this.selectedRequest && this.selectedRequest._id){
      this.selectedRequest.status="treated"
      this.requestService.updateRequest(this.selectedRequest).subscribe({
        next: (res) => {
          console.log(res);

        },
        error: (e) => console.error(e)
      })

    }}

  confirmMarkAsTreated() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to mark this request as treated?',
      accept: () => {
        this.markAsTreated();
      }
    });
  }


  deleteRequest(loadedReq: any) {
    console.log('Delete button clicked for:', loadedReq);

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this reqquest',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.requestService.deleteRequest(loadedReq._id).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'request Deleted',
              life: 3000,
            });
            this.loadRequest();
          },
          error: (e) => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'request not deleted',
              life: 3000,
            });
          }
        })
      },
    });
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


}
