import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../admin-panel/layout/service/app.layout.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notification: string = '';
  private subscription: Subscription = new Subscription;
  constructor(public layoutService: LayoutService,private authservice:AuthService,private notificationService: NotificationService ) { }
  name = 'Angular';
  public isCollapsed = true;
  items!: MenuItem[] | undefined
  activeItem: MenuItem | undefined;
  rounded:any=false;
  student:any
  number:string=""
  showNotificationMessage:any;
  notifications: any[] = [];
  clicked:boolean=false
  ngOnInit(): void {
    this.student = localStorage.getItem('user');
    this.student = JSON.parse(this.student);
    this.fetchNotifications();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-file',
        routerLink:['/student']

      },
      {
        label: 'Certification',
        icon: 'pi pi-fw pi-pencil',
        routerLink:['/cert']


      },
      {
        label: 'Complaints',
        icon: 'pi pi-fw pi-user',
        routerLink:['/mycomp']

      },
      {
        label: 'Requests',
        icon: 'pi pi-fw pi-user',
        routerLink:['/myreq']

      },
      {
        label: 'survey',
        icon: 'pi pi-fw pi-user',
        routerLink:['/surveylist']

      },

    ];
    this.activeItem = this.items[0];

  }

  fetchNotifications(): void {
    this.notificationService.getNotifications( this.student._id)
      .subscribe(data => {
        this.notifications = data;
        console.log('notif',this.notifications)
this.number=this.notifications.length.toString()
console.log('notif',this.number)

      });
  }
  logOut() {
    this.authservice.doLogout()

    }
    isClicked(){
this.clicked=true
    }
  }




