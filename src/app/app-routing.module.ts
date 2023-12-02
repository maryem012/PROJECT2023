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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentPanelComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'reclamation', component: ReclamationComponent },
  { path: 'req', component: DemandsComponent },
  { path: 'myreq', component: ListresquestComponent },
  { path: 'mycomp', component: ListComplaintComponent },

  { path: 'admin', component: AdminPanelComponent },

  { path: 'addNew', component: AddCertifComponent },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
