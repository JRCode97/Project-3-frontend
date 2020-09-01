import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BugReport} from 'src/app/models/BugReport';
import {Client} from 'src/app/models/Client';
import {Application} from 'src/app/models/Application';
import {ApiServiceService} from 'src/app/services/api-service.service';
import { Validators } from '@angular/forms';
import BugStatus from 'src/app/models/BugStatus';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-bug-report',
  templateUrl: './new-bug-report.component.html',
  styleUrls: ['./new-bug-report.component.css']
})
export class NewBugReportComponent implements OnInit {

  bugForm =  this.fb.group({
    title: ['', Validators.required],
    application: ['', Validators.required],
    suspectedLocation: [''],
    severity: [''],
    priority: [''],
    reporter: [{value: '', disabled: true}],
    description: ['', Validators.required],
    reproduceSteps: ['']
  });

  client:Client;
  applicationList: Application[] = [];
  applicationNameList = [];
  priorityLevel = ['Low', 'Medium', 'High'];
  severityLevel = ['Low', 'Medium', 'High'];
  failToPost:boolean = false;


  constructor(private router:Router, private fb: FormBuilder, private api: ApiServiceService) { }

  async submitReport(){
    const report = new BugReport();
    report.title = this.bugForm.value.title;
    report.location = this.bugForm.value.suspectedLocation;
    report.repSteps = this.bugForm.value.reproduceSteps;
    report.priority = this.bugForm.value.priority;
    report.severity = this.bugForm.value.severity;
    report.username = this.client.username
    report.description = this.bugForm.value.description;
    report.status = BugStatus.requested;
    for (const app of this.applicationList){
      if (app.title === this.bugForm.value.application){
        report.app = app;
      }
    }
    report.createdTime = new Date().getTime();

    const result = await this.api.submitNewBugReport(report);

    if(result["bId"]>0){
      this.router.navigate([`/bugreport/${result["bId"]}`]);
    } else{
      this.failToPost = true;
    }
  }

  async getApplication(){
    this.applicationList = await this.api.getApplications();
    for (const app of this.applicationList){
      this.applicationNameList.push(app.title);
    }
  }

  getClient(){
    this.client = this.api.getLoggedClient();
    this.bugForm.controls['reporter'].setValue(this.client.username)
  }

  cancelReport(){
    this.router.navigate(["/main"]);
  }

  ngOnInit(): void {
    this.getApplication();
    this.getClient();
  }

}
