import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewBugReportComponent} from './components/new-bug-report/new-bug-report.component';
import {TestComponent} from './components/test/test.component';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
    {path: 'newbugreport', component: NewBugReportComponent},
    {path: 'test', component: TestComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule]
})

export class AppRoutingModule{}
