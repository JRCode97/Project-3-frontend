import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewBugReportComponent} from './components/new-bug-report/new-bug-report.component';
import {TestComponent} from './components/test/test.component';
import {LoginComponent} from './components/login/login.component';
import {AdminBugsTableComponent} from './components/admin-bugs-table/admin-bugs-table.component';
import {AdminBugsCardsComponent} from './components/admin-bugs-cards/admin-bugs-cards.component';
import {AdminBugsComponent} from './components/admin-bugs/admin-bugs.component';


const routes: Routes = [
    {path: 'newbugreport', component: NewBugReportComponent},
    {path: 'test', component: TestComponent},
    {path: '', component: LoginComponent},
    {path: 'adminbugst', component: AdminBugsTableComponent},
    {path: 'adminbugsc', component: AdminBugsCardsComponent},
  {path: 'adminbugs', component: AdminBugsComponent}

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
