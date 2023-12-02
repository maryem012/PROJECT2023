import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  name = 'Angular';
  public isCollapsed = true;
  items!: MenuItem[] | undefined
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-file',
        routerLink:['/student']

      },
      {
        label: 'Certification',
        icon: 'pi pi-fw pi-pencil',
        routerLink:['/certif']


      },
      {
        label: 'Complaints',
        icon: 'pi pi-fw pi-user',
        routerLink:['/reclamation']

      },
      {
        label: 'Requests',
        icon: 'pi pi-fw pi-user',
        routerLink:['/req']

      },
      {
        label: 'survey',
        icon: 'pi pi-fw pi-user',
        routerLink:['/survey']

      },

    ];
    this.activeItem = this.items[0];

  }
}
