import '@angular/compiler';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule} from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditorModule, TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminBugsComponent } from './components/admin-bugs/admin-bugs.component';
import { AdminBugsCardsComponent } from './components/admin-bugs-cards/admin-bugs-cards.component';
import { AdminBugsTableComponent } from './components/admin-bugs-table/admin-bugs-table.component';
import { AppComponent } from './app.component';
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
import {MetricsPageComponent} from './components/metrics-page/metrics-page.component';
import { MetricsPageSummaryComponent } from './components/metrics-page-summary/metrics-page-summary.component';
import { MetricsPageApplicationsComponent } from './components/metrics-page-applications/metrics-page-applications.component';
import { MetricsPageDeveloperComponent } from './components/metrics-page-developer/metrics-page-developer.component';

import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RequestedBugreportTableComponent } from './components/profile/profile-tables/requested-bugreport-table/requested-bugreport-table.component';
import { UnresolvedBugreportTableComponent } from './components/profile/profile-tables/unresolved-bugreport-table/unresolved-bugreport-table.component';
import { ResolvedBugreportTableComponent } from './components/profile/profile-tables/resolved-bugreport-table/resolved-bugreport-table.component';
import { DeniedBugreportTableComponent } from './components/profile/profile-tables/denied-bugreport-table/denied-bugreport-table.component';
import { PendingSolutionTableComponent } from './components/profile/profile-tables/pending-solution-table/pending-solution-table.component';
import { AcceptedSolutionTableComponent } from './components/profile/profile-tables/accepted-solution-table/accepted-solution-table.component';
import { RejectedSolutionTableComponent } from './components/profile/profile-tables/rejected-solution-table/rejected-solution-table.component';
import { LoginMatComponent } from './components/login-mat/login-mat.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ResolvedbugsPageComponent } from './components/resolvedbugs-page/resolvedbugs-page.component';
import { ViewBugsPageComponent } from './components/view-bugs-page/view-bugs-page.component';
import { UnresolvedbugsPageComponent } from './components/unresolvedbugs-page/unresolvedbugs-page.component';
import { DatePipe } from '@angular/common';








@NgModule({
  declarations: [
    AdminBugsComponent,
    AdminBugsCardsComponent,
    AdminBugsTableComponent,
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
    UnresolvedBugreportTableComponent,
    ResolvedBugreportTableComponent,
    UpdatePasswordComponent,
    LoadingSpinnerComponent,
    RequestedBugreportTableComponent,
    DeniedBugreportTableComponent,
    PendingSolutionTableComponent,
    AcceptedSolutionTableComponent,
    RejectedSolutionTableComponent,
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
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EditorModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    NgbModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [DatePipe, { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
