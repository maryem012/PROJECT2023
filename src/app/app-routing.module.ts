import { NgModule } from '@angular/core';
import { RouterModule, Routes, defaultUrlMatcher } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentPanelComponent } from './student/student-panel/student-panel.component';
import { SurveyComponent } from './survey/survey.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DemandsComponent } from './demands/demands.component';
import { ListresquestComponent } from './demands/listresquest/listresquest.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddCertifComponent } from './certification/add-certif/add-certif.component';
import { ListComplaintComponent } from './reclamation/list-complaint/list-complaint.component';
import { CertificationComponent } from './certification/certfication.component';
import { SurveyCreatorComponent } from './survey-creator/survey-creator.component';
import { SurveyManagementComponent } from './admin-panel/survey-management/survey-management.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentPanelComponent },
  { path: 'survey/:filename', component: SurveyComponent },
  { path: 'reclamation', component: ReclamationComponent },
  { path: 'req', component: DemandsComponent },
  { path: 'myreq', component: ListresquestComponent },
  { path: 'mycomp', component: ListComplaintComponent },
  { path: 'cert', component: CertificationComponent },
  { path: 'surveym', component: SurveyManagementComponent },
  { path: 'surveylist', component: SurveyListComponent },

  { path: 'admin', component: AdminPanelComponent },

  { path: 'addNew', component: AddCertifComponent },
  { path: 'sur', component: SurveyCreatorComponent },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
