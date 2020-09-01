import '@angular/compiler';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';
import { Modules } from './modules';


import { AdminBugsComponent } from './components/admin-bugs/admin-bugs.component';
import { AdminBugsCardsComponent } from './components/admin-bugs-cards/admin-bugs-cards.component';
import { AdminBugsTableComponent } from './components/admin-bugs-table/admin-bugs-table.component';
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationsTableComponent } from './components/application/applications-table/applications-table.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { BugReportsTableComponent } from './components/profile/profile-tables/bug-reports-table/bug-reports-table.component';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MainPageApplicationComponent } from './components/main-page-application/main-page-application.component';
import { MainPageBugComponent } from './components/main-page-bug/main-page-bug.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainPageLeaderboardComponent } from './components/main-page-leaderboard/main-page-leaderboard.component';
import { NewBugReportComponent } from './components/new-bug-report/new-bug-report.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component'
import { ProfileComponent } from './components/profile/profile.component';
import { SolutionApprovalComponent } from './components/solution-approval/solution-approval.component';
import { SolutionsTableComponent } from './components/profile/profile-tables/solutions-table/solutions-table.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { MetricsPageComponent } from './components/metrics-page/metrics-page.component';
import { MetricsPageSummaryComponent } from './components/metrics-page-summary/metrics-page-summary.component';
import { MetricsPageApplicationsComponent } from './components/metrics-page-applications/metrics-page-applications.component';
import { MetricsPageDeveloperComponent } from './components/metrics-page-developer/metrics-page-developer.component';
import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoginMatComponent } from './components/login-mat/login-mat.component';
import { ResolvedbugsPageComponent } from './components/resolvedbugs-page/resolvedbugs-page.component';
import { ViewBugsPageComponent } from './components/view-bugs-page/view-bugs-page.component';
import { UnresolvedbugsPageComponent } from './components/unresolvedbugs-page/unresolvedbugs-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    ApplicationsTableComponent,
    BugReportViewComponent,
    BugReportsTableComponent,
    LoginComponent,
    MainNavComponent,
    MainPageApplicationComponent,
    MainPageComponent,
    MainPageBugComponent,
    MainPageLeaderboardComponent,
    NewBugReportComponent,
    PasswordResetComponent,
    ProfileComponent,
    SolutionApprovalComponent,
    SolutionsTableComponent,
    UpdatePasswordComponent,
    LoadingSpinnerComponent,
    LoginMatComponent,
    ResolvedbugsPageComponent,
    ViewBugsPageComponent,
    UnresolvedbugsPageComponent,
    MetricsPageComponent,
    MetricsPageSummaryComponent,
    MetricsPageApplicationsComponent,
    MetricsPageDeveloperComponent,
  ],
  imports: [
    Modules
  ],
  providers: [DatePipe, { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
