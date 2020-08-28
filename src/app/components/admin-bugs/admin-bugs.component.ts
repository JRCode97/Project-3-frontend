import { Component, OnInit } from '@angular/core';
import BugReport from '../../models/BugReport';
import {ApiServiceService} from '../../services/api-service.service';

@Component({
  selector: 'app-admin-bugs',
  templateUrl: './admin-bugs.component.html',
  styleUrls: ['./admin-bugs.component.css']
})

export class AdminBugsComponent implements OnInit {

  bugReports: Array<BugReport>;

  public show = false;

  public buttonName: any = 'Table View';
  shown = false;

  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.getBugReports();
  }

  toggle() {
    this.show = !this.show;
    this.shown = !this.shown;

    // CHANGE THE NAME OF THE BUTTON
    if (this.show) {
      this.buttonName = 'Card View';
    }
    else {
      this.buttonName = 'Table View';
    }
  }

  async getBugReports(){
    this.bugReports = await this.apiservice.getRequestedBugs();
    return this.bugReports;
  }


}
