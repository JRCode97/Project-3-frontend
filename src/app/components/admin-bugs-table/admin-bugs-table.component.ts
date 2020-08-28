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

  bugReportByApplication:Array<BugReport>;

  priority:string = "All";

  severity:string = "All";

  priorityNumber:number = 0;

  severityNumber:number = 0;

  apps:Array<Application>;

  reporterUsername:string;

  bugReportsDisplay:Array<BugReport>;

  priorityDisplay:string;

  severityDisplay:string;

  searchInput:string;

  selectedAppTitle:string = "All";
  //steps
  //set severity to low
  //set priority to high
  //set priority to all??? how do you unfilter
  ngOnInit() {
    //currentBugsDisplayed[]bugreports <--this one is manipulated to show what we want
    //bugReports <-- never is touched
    this.populate(this.bugReports);
    this.bugReportsDisplay = this.bugReports;

    /* this.getbugReportBySeverity(); */
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  populate(bugs:BugReport[]){
    this.dataSource = new MatTableDataSource<BugReport>(bugs);
    // console.log(this.bugReports);

    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.obs = this.dataSource.connect();

    this.getApplications();
    
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
    return bugReport.severity == "Medium"
  }

  filterHighSeverityBugs(bugReport){
    return bugReport.severity == "High"
  }

  // to get the bug reports by sevrity and priority
  filterByApplication(){
    
    if(this.selectedAppTitle === "All"){
      this.bugReportsDisplay = this.bugReports;
    }else{
      this.bugReportsDisplay = this.bugReports.filter(bugReport => bugReport.app.title === this.selectedAppTitle);
    }
    this.setbugReportByPriority();
    // if(this.severity !=="All"){
    //   console.log(this.severity);
    //   this.setbugReportBySeverity();
    //   return;
    // }else if (this.priority !=="All"){
    //   console.log(this.priority);
    //   this.setbugReportByPriority();
    //   return;
    // }
    // this.bugReportsDisplay = this.bugReportByApplication;
    // this.populate(this.bugReportsDisplay);
  }

  setbugReportByPriority(){
    if(this.priority == "Low"){
      this.bugReportsDisplay = this.bugReportsDisplay.filter(this.filterLowPriorityBugs);
    }
    else if(this.priority == "Medium"){
      this.bugReportsDisplay = this.bugReportsDisplay.filter(this.filterMediumPriorityBugs);
    }
    else if (this.priority == "High"){
      this.bugReportsDisplay = this.bugReportsDisplay.filter(this.filterHighPriorityBugs);
    }
    this.setbugReportBySeverity();
  }

  setbugReportBySeverity(){
    if (this.severity == "Low"){
      this.bugReportsDisplay = this.bugReportsDisplay.filter(this.filterLowSeverityBugs);
    }
    else if (this.severity == "Medium"){
      this.bugReportsDisplay = this.bugReportsDisplay.filter(this.filterMediumSeverityBugs);
    }
    else if (this.severity == "High"){
      this.bugReportsDisplay = this.bugReportsDisplay.filter(this.filterHighSeverityBugs);
    }
    this.populate(this.bugReportsDisplay);
  }
  async search(){
    let filteredReports: BugReport[] = [];

    if(this.searchInput !== ""){
      
      this.searchInput.toLowerCase();
      for(let report of this.bugReportsDisplay){
          let dateString = new Date(report.createdTime);
          if(report.title.toLowerCase().includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.app.title.toLowerCase().includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.location.toLowerCase().includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.severity.toLowerCase().includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.priority.toLowerCase().includes(this.searchInput)){
            filteredReports.push(report);
          }else if(dateString.toDateString().toString().toLowerCase().includes(this.searchInput)){
            filteredReports.push(report);
          }else if(report.username.toLowerCase().includes(this.searchInput)){
            filteredReports.push(report);
          }
        }
        this.populate(filteredReports);
    }else{
      this.populate(this.bugReportsDisplay);
    }
      
  }
  
  async getApplications(){
    this.apps = await this.apiservice.getApplications();
    return this.apps;
  }
  

  
}

