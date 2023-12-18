import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';

import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';

import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { RatingModule } from 'primeng/rating';

import { SplitterModule } from 'primeng/splitter';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';

import { AnimateModule } from 'primeng/animate';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StudentPanelComponent } from './student/student-panel/student-panel.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DemandsComponent } from './demands/demands.component';
import { SurveyComponent } from './survey/survey.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { ListresquestComponent } from './demands/listresquest/listresquest.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import {StyleClassModule} from 'primeng/styleclass';
import { PickListModule } from 'primeng/picklist';
import { UserService } from './services/user.service';
import { StudentManagementComponent } from './admin-panel/student-management/student-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCertifComponent } from './certification/add-certif/add-certif.component';
import { ListComplaintComponent } from './reclamation/list-complaint/list-complaint.component';
import { CertificationComponent } from './certification/certfication.component';
import { SurveyCreatorComponent } from './survey-creator/survey-creator.component';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { SurveyManagementComponent } from './admin-panel/survey-management/survey-management.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { RequestManagementComponent } from './admin-panel/request-management/request-management.component';
import { ComplaintManagementComponent } from './admin-panel/complaint-management/complaint-management.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { AppConfigModule } from './admin-panel/layout/config/config.module';
import { AppLayoutModule } from './admin-panel/layout/app.layout.module';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        StudentPanelComponent,
        ReclamationComponent,
        DemandsComponent,
        CertificationComponent,
        SurveyComponent,
        HeaderComponent,
        FooterComponent,
        SideBarComponent,
        MenuBarComponent,
        ListresquestComponent,
        AddCertifComponent,
        ListComplaintComponent,
        SurveyCreatorComponent,
        SurveyListComponent,
       

    ],
    providers: [UserService, MessageService, ConfirmationService, DatePipe,

    ],
    bootstrap: [AppComponent],
    imports: [
        TableModule,
        HttpClientModule,
        TabMenuModule,
        MenuModule,
        MenubarModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ConfirmDialogModule,
        DialogModule,
        ButtonModule,
        FormsModule,
        AnimateModule,
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
        SidebarModule,
        TagModule,
        DialogModule,
        SurveyCreatorModule,
        NgApexchartsModule,
        AppConfigModule,
        AppLayoutModule
    ]
})
export class AppModule { }
