import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bug-report-details',
  templateUrl: './bug-report-details.component.html',
  styleUrls: ['./bug-report-details.component.css']
})
export class BugReportDetailsComponent implements OnInit {
  
  title = "Bug Subject";
  application = "Application Name";
  suspectedLocation = "bug suspected Location";
  severity = "Bug severity";
  priority = "Bug priority";
  reporter = "User name";
  description = "Bug description";
  reproduceSteps = "Bug reproduce Steps";
  points = "Bug points";

  applications=["Pizza Palor", "Reimbusement Project", "Bug Reports"];
  priorityLevel = ["not urgent", "medium", "urgent"];
  severityLevel = ["not severe", "medium", "very severe"];
  constructor() { }

  ngOnInit(): void {
  }

}
