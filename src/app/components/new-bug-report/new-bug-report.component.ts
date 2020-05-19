import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

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

  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }



}
