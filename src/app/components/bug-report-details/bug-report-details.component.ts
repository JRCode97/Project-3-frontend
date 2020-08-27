import { Component, OnInit, Input } from '@angular/core';
import Solution from 'src/app/models/Solution';
import Client from 'src/app/models/Client';

import BugReport from 'src/app/models/BugReport';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import BugStatus from 'src/app/models/BugStatus';
import Severity from 'src/app/models/Severity';
import Priority from 'src/app/models/Priority';

@Component({

  selector: 'app-bug-report-details',
  templateUrl: './bug-report-details.component.html',
  styleUrls: ['./bug-report-details.component.css']
})
export class BugReportDetailsComponent implements OnInit {
  public brId: any;
  public solutions: Array<Solution>;
  public br: BugReport;
  public client: Client;
  public SolDescription: string = '';
  public SolTitle: string = '';
  @Input() public points: number = 0;
  public severity: any;
  public priority: any;
  public DeniedStatus: BugStatus.denied;
  public RequestedStatus: BugStatus.requested;
  public priorityLevel = ['Low', 'Medium', 'High'];
  public severityLevel = ['Low', 'Medium', 'High'];
  isAdmin:boolean;
  constructor(private apiserv: ApiServiceService, private route: ActivatedRoute, private router: Router) {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // this.brId = urlParams.get("brid");
    this.getClient();
    if (this.client == null || this.client === undefined)
      this.router.navigate(["/"]);
    else {

      console.log(this.client);
      this.brId = this.route.snapshot.paramMap.get("id");

    }

  }

  ngOnInit(): void {
    this.getBugReportById();
  }

  //0. Get Client By ID 
  getClient(): Client {
    this.client = this.apiserv.getLoggedClient();
    this.isAdmin = this.client.role ? true : false;
    console.log(this.client);
    return this.client;
  }
  //1. Get Bug Report By ID 
  async  getBugReportById(): Promise<BugReport> {
    this.br = await this.apiserv.getBugReportById(this.brId);

    console.log(this.br);
    return this.br;
  }
  //3. Approve Bug report 
  async AcceptBug() {
    this.br.status = BugStatus.unresolved;
    // this.br.severity=  this.severity;
    // this.br.priority=this.priority;
    //this.br.pointValue=this.points;
    const bugReport: BugReport = await this.apiserv.putBugReport(this.br);
    this.br = bugReport;
  }

  //4. Reject Bug report
  async RejectBug() {
    this.br.status = BugStatus.denied;
    // this.br.severity=  this.severity;
    // this.br.priority=this.priority;
    this.br.pointValue=0;
    const bugReport: BugReport = await this.apiserv.putBugReport(this.br);
    this.br = bugReport;
  }
  
  setSeverity(event)
  {
    this.severity= event.target.value;
  
  }
  setPriority(event)
  {
    this.priority= event.target.value;
 
  }}
