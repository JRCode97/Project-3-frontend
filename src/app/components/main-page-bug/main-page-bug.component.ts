import { Component, OnInit, Input } from '@angular/core';
import { BugReport } from 'src/app/models/BugReport';

@Component({
  selector: 'app-main-page-bug',
  templateUrl: './main-page-bug.component.html',
  styleUrls: ['./main-page-bug.component.css']
})
export class MainPageBugComponent implements OnInit {

  // Temp Field
  id:number = 0;
  title: String = 'Can\'t resolve promise';
  status: String = 'Unresolved';
  pointValue: Number = 500;
  username: String = 'WackyWill';
  dateApproved: number = 10;
  description: String = 'This is a description for my bug. There are many other bugs like it, but this one\'s mine.';
  repSteps: String = 'First run the page. Try to add 20 pizzas. Place order. It should return the list of objects but I\'m getting a promise.';
  // get bug object/model as @input and pull them out of field
  // will need to parse date (pipe?)

  @Input() bugReport:BugReport;

  constructor() { }

  ngOnInit(): void {
    this.id = this.bugReport.bId
    this.title = this.bugReport.title;
    this.status = this.bugReport.status;
    this.pointValue = this.bugReport.pointValue;
    this.username = this.bugReport.username;
    this.dateApproved = this.bugReport.approvedTime;
    this.description = this.bugReport.description;
    this.repSteps = this.bugReport.repSteps;
  }

}
