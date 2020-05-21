import '@angular/compiler';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card'
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
import { EditorModule, TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';

import { ApplicationComponent } from './components/application/application.component';
import { ApplicationsTableComponent } from './components/application/applications-table/applications-table.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { BugReportDetailsComponent } from './components/bug-report-details/bug-report-details.component';
import { MainPageApplicationComponent } from './components/main-page-application/main-page-application.component';
import { MainPageBugComponent } from './components/main-page-bug/main-page-bug.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainPageLeaderboardComponent } from './components/main-page-leaderboard/main-page-leaderboard.component';
import { NewBugReportComponent } from './components/new-bug-report/new-bug-report.component';
import { PostedSolutionsTableComponent } from './components/posted-solutions-table/posted-solutions-table.component';
import { SolutionApprovalComponent } from './components/solution-approval/solution-approval.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component'

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    ApplicationsTableComponent,
    BugReportViewComponent,
    BugReportDetailsComponent,
    LoginComponent,
    MainNavComponent,
    MainPageApplicationComponent,
    MainPageComponent,
    MainPageBugComponent,
    MainPageLeaderboardComponent,
    NewBugReportComponent,
    PostedSolutionsTableComponent,
    SolutionApprovalComponent,
    UpdatePasswordComponent
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
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
