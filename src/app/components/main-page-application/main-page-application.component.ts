import { Component, OnInit, Input } from '@angular/core';
import { Application } from 'src/app/models/Application';
import { BugReport } from 'src/app/models/BugReport';

@Component({
  selector: 'app-main-page-application',
  templateUrl: './main-page-application.component.html',
  styleUrls: ['./main-page-application.component.css']
})
export class MainPageApplicationComponent implements OnInit {

  panelOpenState = false;

  title: String = 'Cursed Pizza Online Ordering System App';
  gitLink: String = 'http://github.com/wackywill/cpoos';
  bugCount: Number = 1;
  reports: BugReport[];

  @Input() application: Application;

  constructor() { }

  ngOnInit(): void {
    this.title = this.application.title;
    this.gitLink = this.application.gitLink;
    this.reports =  this.getOpenReports();
    this.bugCount = this.reports.length;
  }

  getOpenReports(): BugReport[] {
    const holder: BugReport[] = this.application.reports;
    const returner: BugReport[] = [];
    for (const report of holder) {
      if (report.status !== 'Resolved') {
        returner.push(report);
      }
    }
    return returner;
  }

}
