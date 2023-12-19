import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../admin-panel/layout/service/app.layout.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public layoutService: LayoutService,private authservice:AuthService ) { }
  name = 'Angular';
  public isCollapsed = true;
  items!: MenuItem[] | undefined
  activeItem: MenuItem | undefined;
  rounded:any=false;
  student:any
  ngOnInit(): void {
    this.student = localStorage.getItem('user');
    this.student = JSON.parse(this.student);
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
        routerLink:['/survey']

      },

    ];
    this.activeItem = this.items[0];

  }

  logOut() {
    this.authservice.doLogout()

    }
  }




