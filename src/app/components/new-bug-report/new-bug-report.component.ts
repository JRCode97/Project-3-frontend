import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BugReport} from 'src/app/models/BugReport';
import {Client} from 'src/app/models/Client';
import {Application} from 'src/app/models/Application';
import {ApiServiceService} from 'src/app/services/api-service.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-bug-report',
  templateUrl: './new-bug-report.component.html',
  styleUrls: ['./new-bug-report.component.css']
})
export class NewBugReportComponent implements OnInit {

  bugForm =  this.fb.group({
    title: ['', Validators.required],
    application: [''],
    suspectedLocation: [''],
    severity: [''],
    priority: [''],
    reporter: [''],
    description: ['', Validators.required],
    reproduceSteps: ['']
  });

  client:Client;
  applicationList: Application[] = [];
  applicationNameList = [];
  priorityLevel = ['low', 'medium', 'high'];
  severityLevel = ['low', 'medium', 'high'];


  constructor(private fb: FormBuilder, private api: ApiServiceService) { }

  async submitReport(){
    const report = new BugReport();
    report.title = this.bugForm.value.title;
    report.location = this.bugForm.value.suspectedLocation;
    report.repSteps = this.bugForm.value.reproduceSteps;
    report.priority = this.bugForm.value.priority;
    report.severity = this.bugForm.value.severity;
    report.username = this.bugForm.value.reporter;
    report.description = this.bugForm.value.description;
    for (const app of this.applicationList){
      if (app.title === this.bugForm.value.application){
        report.app = app;
      }
    }
    report.createdTime = new Date().getTime();

    console.log(report);
    const result = await this.api.submitNewBugReport(report);
    console.log(result);
  }

  async getApplication(){
    this.applicationList = await this.api.getApplications();
    for (const app of this.applicationList){
      this.applicationNameList.push(app.title);
    }
  }

  getClient(){
    this.client = this.api.getLoggedClient();
    this.bugForm.value.reporter = this.client.username;
    console.log(this.bugForm.value.reporter);
  }

  ngOnInit(): void {
    this.getApplication();
    this.getClient();
  }



}
