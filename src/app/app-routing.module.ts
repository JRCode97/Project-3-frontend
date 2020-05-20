import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewBugReportComponent} from './components/new-bug-report/new-bug-report.component';
import {TestComponent} from './components/test/test.component';
import {LoginComponent} from './components/login/login.component';
import {AdminBugsTableComponent} from './components/admin-bugs-table/admin-bugs-table.component';
import {AdminBugsCardsComponent} from './components/admin-bugs-cards/admin-bugs-cards.component';
import {AdminBugsComponent} from './components/admin-bugs/admin-bugs.component';
import { ApplicationComponent } from './components/application/application.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageApplicationComponent } from './components/main-page-application/main-page-application.component'
import { NewBugReportComponent } from './components/new-bug-report/new-bug-report.component';
import { SolutionApprovalComponent } from './components/solution-approval/solution-approval.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'adminbugs', component: AdminBugsComponent},
  { path: 'main', component: MainPageApplicationComponent },
  { path: 'application', component: ApplicationComponent },
  { path: 'newbugreport', component:NewBugReportComponent },
  { path: 'bugreport', component: BugReportViewComponent },
  { path: 'solutions/resolver', component: SolutionApprovalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
