import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBugsComponent } from './components/admin-bugs/admin-bugs.component';
import { ApplicationComponent } from './components/application/application.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewBugReportComponent } from './components/new-bug-report/new-bug-report.component';
import { SolutionApprovalComponent } from './components/solution-approval/solution-approval.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component'

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'adminbugs', component: AdminBugsComponent},
  { path: 'application', component: ApplicationComponent },
  { path: 'bugreport/:id', component: BugReportViewComponent },
  { path: 'bugsolutionreview/:id', component: SolutionApprovalComponent},
  { path: 'main', component: MainPageComponent },
  { path: 'newbugreport', component: NewBugReportComponent },
  { path: 'newpassword', component:UpdatePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
