import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewBugReportComponent} from './components/new-bug-report/new-bug-report.component';
import {LoginComponent} from './components/login/login.component';
import {AdminBugsComponent} from './components/admin-bugs/admin-bugs.component';
import { ApplicationComponent } from './components/application/application.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { MainPageApplicationComponent } from './components/main-page-application/main-page-application.component';
import { SolutionApprovalComponent } from './components/solution-approval/solution-approval.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'adminbugs', component: AdminBugsComponent},
  { path: 'main', component: MainPageApplicationComponent },
  { path: 'application', component: ApplicationComponent },
  { path: 'newbugreport', component: NewBugReportComponent },
  { path: 'bugreport', component: BugReportViewComponent },
  { path: 'solutions/resolver', component: SolutionApprovalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
