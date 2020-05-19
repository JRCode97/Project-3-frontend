import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BugReport} from 'src/app/models/BugReport';
import {ApiServiceService} from 'src/app/services/api-service.service';

@Component({
  selector: 'app-new-bug-report',
  templateUrl: './new-bug-report.component.html',
  styleUrls: ['./new-bug-report.component.css']
})
export class NewBugReportComponent implements OnInit {

  bugForm =  this.fb.group({
    title: [''],
    application: [''],
    suspectedLocation:[''],
    severity:[''],
    priority:[''],
    reporter:[''],
    description:[''],
    reproduceSteps:['']
  })

  applications=["Pizza Palor", "Reimbusement Project", "Bug Reports"];
  priorityLevel = ["not urgent", "medium", "urgent"];
  severityLevel = ["not severe", "medium", "very severe"];

  
  constructor(private fb:FormBuilder, private api:ApiServiceService) { }

  async submitReport(){
    let report = new BugReport();
    report.title = this.bugForm.value.title
    report.location = this.bugForm.value.suspectedLocation
    report.repSteps = this.bugForm.value.reproduceSteps
    report.priority = this.bugForm.value.priority
    report.severity = this.bugForm.value.severity
    report.username = this.bugForm.value.reporter
    report.description = this.bugForm.value.description

    console.log(report)
    let result = await this.api.submitNewBugReport(report);
    console.log(result);
  }

  ngOnInit(): void {
    console.log(this.bugForm.value)
  }



}
