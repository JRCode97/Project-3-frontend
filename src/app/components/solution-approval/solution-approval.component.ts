import { Component, OnInit, ViewChild } from '@angular/core';
import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';
import Client from 'src/app/models/Client';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import Severity from 'src/app/models/Severity';
import Priority from 'src/app/models/Priority';
import SolutionStatus from 'src/app/models/SolutionStatus';

const dummy = new BugReport();
dummy.bId = 1;
dummy.title = 'The Buginning';
dummy.severity = Severity.high;
dummy.priority = Priority.high;
dummy.username = 'BugMaker3000';
dummy.description = 'There\'s a snake in my boot!';
dummy.createdTime = new Date('2020/5/10/16:20').getTime();

const dumdum = new Client();
dumdum.username = 'BugWrecker9001';

const sol1 = new Solution();
sol1.client = dumdum;
sol1.description = 'just grab the snake';
sol1.timeSubmitted = new Date('2020/5/12/16:20').getTime();
sol1.status = SolutionStatus.pending;
sol1.title = 'be brave!';
const sol2 = new Solution();
sol2.client = dumdum;
sol2.description = 'shoot the snake';
sol2.timeSubmitted = new Date('2020/5/13/16:20').getTime();
sol1.status = SolutionStatus.pending;
sol2.title = 'be dumb';
const sol3 = new Solution();
sol3.client = dumdum;
sol3.description = 'get new boots';
sol3.timeSubmitted = new Date('2020/5/18/16:20').getTime();
sol1.status = SolutionStatus.pending;
sol3.title = 'be rich';
dummy.solutions = [sol1, sol2, sol3];

@Component({
  selector: 'app-solution-approval',
  templateUrl: './solution-approval.component.html',
  styleUrls: ['./solution-approval.component.css']
})

export class SolutionApprovalComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  displayedColumns: string[] = ['title', 'description', 'timeSubmitted', 'solver', 'status' ];
  dataSource: MatTableDataSource<Solution>;
  report: BugReport = dummy;
  id: string;

  constructor(private api: ApiServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.report.solutions);
    this.dataSource.sort = this.sort;
    this.addData()
    this.id = this.route.snapshot.paramMap.get('id')
  }

  async addData() {
    const bugReport:BugReport = await this.api.getBugReportById(1);
    const solutions:Solution[] = await this.api.getSolutionsByBugId(1);
    this.report = bugReport;
    this.dataSource = new MatTableDataSource(solutions);
  }

}
