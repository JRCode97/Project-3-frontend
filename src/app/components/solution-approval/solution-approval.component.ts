import { Component, OnInit, ViewChild } from '@angular/core';
import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';
import Client from 'src/app/models/Client';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

const dummy = new BugReport();
dummy.bId = 1;
dummy.title = 'The Buginning';
dummy.severity = 'high';
dummy.username = 'BugMaker3000';
dummy.description = "There's a snake in my boot!";
dummy.dateCreated = new Date('2020/5/10/16:20').getTime();
    
const dumdum = new Client();
dumdum.username = 'BugWrecker9001';

const sol1 = new Solution();
sol1.client = dumdum;
sol1.description = 'just grab the snake';
sol1.timeSubmitted = new Date('2020/5/12/16:20').getTime();
sol1.status = 'pending';
sol1.title = 'be brave!';
const sol2 = new Solution();
sol2.client = dumdum;
sol2.description = 'shoot the snake';
sol2.timeSubmitted = new Date('2020/5/13/16:20').getTime();
sol2.status = 'pending';
sol2.title = 'be dumb';
const sol3 = new Solution();
sol3.client = dumdum;
sol3.description = 'get new boots';
sol3.timeSubmitted = new Date('2020/5/18/16:20').getTime();
sol3.status = 'pending';
sol3.title = 'be rich';
dummy.solutions = [sol1, sol2, sol3];

@Component({
  selector: 'app-solution-approval',
  templateUrl: './solution-approval.component.html',
  styleUrls: ['./solution-approval.component.css']
})

export class SolutionApprovalComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  displayedColumns: string[] = ['title', 'description', 'timeSubmitted', 'solver', 'status'];
  dataSource: MatTableDataSource<Solution>;
  report: BugReport;

  constructor() { }

  ngOnInit(): void {
    this.report = dummy;
    this.dataSource = new MatTableDataSource(dummy.solutions);
    this.dataSource.sort = this.sort;
  }

}