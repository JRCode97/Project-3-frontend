import '@angular/compiler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { EditorModule} from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewBugReportComponent } from './components/new-bug-report/new-bug-report.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderModule} from '@angular/material/slider';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    NewBugReportComponent,
    LoginComponent,
    // MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    EditorModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
