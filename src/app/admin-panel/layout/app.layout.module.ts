import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { AdminPanelComponent } from '../admin-panel.component';
import { ComplaintManagementComponent } from '../complaint-management/complaint-management.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RequestManagementComponent } from '../request-management/request-management.component';
import { SurveyManagementComponent } from '../survey-management/survey-management.component';
import { DatePipe } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { PickListModule } from 'primeng/picklist';
import { RatingModule } from 'primeng/rating';
import { SplitterModule } from 'primeng/splitter';
import { StyleClassModule } from 'primeng/styleclass';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { TableModule } from 'primeng/table';
import { Button, ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { StudentManagementComponent } from '../student-management/student-management.component';
import { SurveyResultsComponent } from '../survey-management/survey-results/survey-results.component';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        AdminPanelComponent,
        RequestManagementComponent,
        ComplaintManagementComponent,
        DashboardComponent,
        StudentManagementComponent,
        SurveyManagementComponent,
        SurveyResultsComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        RatingModule,
        DropdownModule,
        DatePipe,
        CardModule,
        NgbCollapseModule,
        BrowserAnimationsModule,
        StyleClassModule,
        PickListModule,
        SplitterModule,
        FieldsetModule,
        VirtualScrollerModule,
        ToastModule,
        MessagesModule,
        ConfirmDialogModule,
        MessagesModule,
        FileUploadModule,
        TagModule,
        TableModule,
        ButtonModule,
        DialogModule,
        ChipModule,
        ChartModule,
        MultiSelectModule
    ],
    exports: [AppLayoutComponent],
    providers:  [MessageService, ConfirmationService]
})
export class AppLayoutModule { }
