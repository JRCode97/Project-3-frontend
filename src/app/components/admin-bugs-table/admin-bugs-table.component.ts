import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import BugReport from '../../models/BugReport';
import {MatExpansionModule} from '@angular/material/expansion';
import Application from 'src/app/models/Application';
import {ApiServiceService} from '../../services/api-service.service';

@Component({
  selector: 'app-admin-bugs-table',
  templateUrl: './admin-bugs-table.component.html',
  styleUrls: ['./admin-bugs-table.component.css']
})
export class AdminBugsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() bugReports: BugReport[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BugReport>;
  obs: Observable<any>;
  dataSource: MatTableDataSource<BugReport> = new MatTableDataSource<BugReport>();


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'application', 'location', 'severity', 'priority', 'date', 'developer', 'details' ];
  constructor(private changeDetectorRef: ChangeDetectorRef, private apiservice: ApiServiceService) {
  }

  bugReportsByReporter:Array<BugReport>;

  bugReportByPriority:Array<BugReport>;

  bugReportBySeverity:Array<BugReport>;

  priority:string;

  severity:string

  priorityNumber:number = 0;

  severityNumber:number = 0;

  apps:Array<Application>;

  reporterUsername:string;

  bugReportsDisplay:Array<BugReport>;

  priorityDisplay:string;

  severityDisplay:string;

  searchInput:string;

  //steps
  //set severity to low
  //set priority to high
  //set priority to all??? how do you unfilter
  ngOnInit() {
    //currentBugsDisplayed[]bugreports <--this one is manipulated to show what we want
    //bugReports <-- never is touched
    this.populate(this.bugReports);

    /* this.getbugReportBySeverity(); */
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  populate(bugs:BugReport[]){
    this.dataSource = new MatTableDataSource<BugReport>(bugs);
    console.log(this.bugReports);

    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.obs = this.dataSource.connect();

    //this.getbugReportByPriority();

    this.getApplications();

    this.priorityDisplay = localStorage.getItem("priorityString");
    this.severityDisplay = localStorage.getItem("severityString");
    
  }
  //Priority and Severity filters

  filterLowPriorityBugs(bugReport){
    return bugReport.priority == "Low"
  }

  filterMediumPriorityBugs(bugReport){
    return bugReport.priority == "Medium"
  }
    
  filterHighPriorityBugs(bugReport){
    return bugReport.priority == "High"
  }

  filterLowSeverityBugs(bugReport){
    return bugReport.severity == "Low"
  }

  filterMediumSeverityBugs(bugReport){
    return bugReport.priority == "Medium"
  }

  filterHighSeverityBugs(bugReport){
    return bugReport.priority == "High"
  }

  // to get the bug reports by sevrity and priority

  setbugReportByPriority(){
    if(this.priority == "Low"){
      this.bugReportsDisplay = this.bugReportsDisplay.filter(this.filterLowPriorityBugs)
      this.populate(this.bugReportsDisplay);
      // localStorage.setItem("priority", "1");
      // localStorage.setItem("priorityString", "Low");
      // location.reload();
    }
    else if(this.priority == "Medium"){
      localStorage.setItem("priority", "2");
      localStorage.setItem("priorityString", "Medium");
      location.reload();
    }
    else if (this.priority == "High"){
      localStorage.setItem("priority", "3");
      localStorage.setItem("priorityString", "High");
      location.reload();
    }
    else if(this.priority == "All"){
      localStorage.setItem("priority", "0");
      localStorage.setItem("priorityString", "All");
      location.reload();
    }
  }

  getbugReportByPriority(){
    this.priorityNumber = Number(localStorage.getItem("priority"));
    console.log(this.priorityNumber + "priority");
    
    switch(this.priorityNumber){

      case 0: this.bugReportByPriority = this.bugReports;
      break;

      case 1: this.bugReportByPriority = this.bugReports.filter(this.filterLowPriorityBugs);
      break;

      case 2: this.bugReportByPriority = this.bugReports.filter(this.filterMediumPriorityBugs);
      break;

      case 3: this.bugReportByPriority = this.bugReports.filter(this.filterHighPriorityBugs);
      break;

      default: this.bugReportByPriority = this.bugReports;
      break;
    }
    this.bugReportsDisplay = this.bugReportByPriority;
    this.getbugReportBySeverity();
  }

  setbugReportBySeverity(){
    if (this.severity == "Low"){
      localStorage.setItem("severity", "1");
      localStorage.setItem("severityString", "Low");
      location.reload();
    }
    else if (this.severity == "Medium"){
      localStorage.setItem("severity", "2");
      localStorage.setItem("severityString", "Medium");
      location.reload();
    }
    else if (this.severity == "High"){
      localStorage.setItem("severity", "3");
      localStorage.setItem("severityString", "High");
      location.reload();
    }
    else if(this.severity == "All"){
      localStorage.setItem("severity", "0");
      localStorage.setItem("severityString", "All");
      location.reload();
    }
  }

  getbugReportBySeverity(){
    this.severityNumber = Number(localStorage.getItem("severity"));
    console.log(this.severityNumber + "severity");
    	
    switch(this.severityNumber){

      case 0: this.bugReportBySeverity = this.bugReportsDisplay;
      break;

      case 1: this.bugReportBySeverity = this.bugReportsDisplay.filter(this.filterLowSeverityBugs);
      break;

      case 2: this.bugReportBySeverity = this.bugReportsDisplay.filter(this.filterMediumSeverityBugs);
      break;

      case 3: this.bugReportBySeverity = this.bugReportsDisplay.filter(this.filterHighSeverityBugs);
      break;

      default: this.bugReportBySeverity = this.bugReportsDisplay;
      break;
    }
    this.dataSource.data = this.bugReportBySeverity;
  }

  async search(){
    let filteredReports: BugReport[] = [];
    /* this.bugReportsByReporter = await this.apiservice.getbugReportByClientUsername(this.reporterUsername);
    console.log(this.bugReportsByReporter);
    return this.bugReportsByReporter; */
    if(this.searchInput !== ""){
      
      
      for(let report of this.bugReports){
          let dateString = new Date(report.createdTime);
          if(report.title.includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.app.title.includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.location.includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.severity.includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.priority.includes(this.searchInput)){
            filteredReports.push(report);
          }else if(dateString.toDateString().toString().includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.username.includes(this.searchInput)){
            filteredReports.push(report);
          }
        }
        this.populate(filteredReports);
    }else{
      this.populate(this.bugReports);
    }
      
  }
    


  

  async getApplications(){
    this.apps = await this.apiservice.getApplications();
    return this.apps;
  }

}

