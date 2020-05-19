import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{ApplicationComponent} from './components/application/application.component';
import {NewBugReportComponent} from './components/new-bug-report/new-bug-report.component';
import {LoginComponent} from './components/login/login.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'application', component: ApplicationComponent},
  {path:'newbugreport', component:NewBugReportComponent},
  {path: 'login', component: LoginComponent},
  {path: 'bugreport', component: BugReportViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
