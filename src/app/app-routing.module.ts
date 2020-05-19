import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewBugReportComponent} from './components/new-bug-report/new-bug-report.component'
import {TestComponent} from './components/test/test.component'

const routes: Routes = [
    {path:'newbugreport', component:NewBugReportComponent},
    {path:'test', component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
