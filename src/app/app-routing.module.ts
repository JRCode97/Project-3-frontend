import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBugsComponent } from './components/admin-bugs/admin-bugs.component';
import { ApplicationComponent } from './components/application/application.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewBugReportComponent } from './components/new-bug-report/new-bug-report.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component'
import { ProfileComponent } from './components/profile/profile.component';
import { SolutionApprovalComponent } from './components/solution-approval/solution-approval.component';
import { ResolvedbugsPageComponent } from './components/resolvedbugs-page/resolvedbugs-page.component';
import { ViewBugsPageComponent } from './components/view-bugs-page/view-bugs-page.component'
import { LoginMatComponent } from './components/login-mat/login-mat.component';
import { MetricsPageComponent } from './components/metrics-page/metrics-page.component';

const routes: Routes = [
  { path: 'loginbackup', component: LoginComponent },
  { path: 'adminbugs', component: AdminBugsComponent},
  { path: 'applications', component: ApplicationComponent },
  { path: 'bugreport/:id', component: BugReportViewComponent },
  { path: 'bugsolutionreview/:id', component: SolutionApprovalComponent},
  { path: 'main', component: MainPageComponent },
  { path: 'resolved', component:  ResolvedbugsPageComponent},
  { path: 'newbugreport', component: NewBugReportComponent },
  { path: 'newpassword', component: UpdatePasswordComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'bugreportapprove/:id', component: BugReportViewComponent},
  { path: 'bugs', component : ViewBugsPageComponent },
  { path: 'metrics', component: MetricsPageComponent},
  { path: '', component: LoginMatComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
