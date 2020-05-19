import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MainPageBugComponent } from './components/main-page-bug/main-page-bug.component';
import { MainPageApplicationComponent } from './components/main-page-application/main-page-application.component';
import { MainPageLeaderboardComponent } from './components/main-page-leaderboard/main-page-leaderboard.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageBugComponent,
    MainPageApplicationComponent,
    MainPageLeaderboardComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
