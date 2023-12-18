import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }
                ]
            },
            {
                label: 'Manegement',
                items: [
                  { label: 'Requests Management', icon: 'pi pi-fw pi-telegram', routerLink: ['/admin/request_management'] },
                  { label: 'Complaints Management', icon: 'pi pi-fw pi-thumbs-down-fill', routerLink: ['/admin/complaint_management'] },
                  { label: 'Survey Management', icon: 'pi pi-fw pi-megaphone', routerLink: ['/admin/survey_management'] },
                  { label: 'Student Management', icon: 'pi pi-fw pi-users', routerLink: ['/admin/student_management'] },


                ]
            },
            {
              label: 'Auth',
              items: [
                  { label: 'Profile', icon: 'pi pi-fw pi-user-edit', routerLink: ['./authentication-login.html'] },
                  { label: 'Logout', icon: 'pi pi-fw pi-sign-out', routerLink: ['./authentication-register.html'] }
              ]
          }]}

}
