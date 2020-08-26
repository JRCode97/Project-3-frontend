import { Component, OnInit } from '@angular/core';
import BugReport from '../../models/BugReport';
import {ApiServiceService} from '../../services/api-service.service';
import Application from 'src/app/models/Application';

@Component({
  selector: 'app-admin-bugs',
  templateUrl: './admin-bugs.component.html',
  styleUrls: ['./admin-bugs.component.css']
})

export class AdminBugsComponent implements OnInit {

  bugReports: Array<BugReport>;

  apps:Array<Application>;

  public show = false;
  
  public buttonName: any = 'Card View';
  shown = false;

  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.getBugReports();
    this.getApplications();
  }

  toggle() {
    this.show = !this.show;
    this.shown = !this.shown;

    // CHANGE THE NAME OF THE BUTTON
    if (this.show) {
      this.buttonName = 'Table View';
    }
    else {
      this.buttonName = 'Card View';
    }
  }

  async getBugReports(){
    this.bugReports = await this.apiservice.getRequestedBugs();
    return this.bugReports;
  }

  async getApplications(){
    this.apps = await this.apiservice.getApplications();
    return this.apps;
  }


}
