import { AfterViewInit, Component, OnInit,Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { BugReportsTableDataSource, BugReportsTableItem } from './bug-reports-table-datasource';
import {Observable} from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Client from 'src/app/models/Client';
import BugReport from '../../../../models/BugReport';

@Component({
  selector: 'app-bug-reports-table',
  templateUrl: './bug-reports-table.component.html',
  styleUrls: ['./bug-reports-table.component.css']
})
export class BugReportsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BugReport>;
  obs: Observable<any>;
  @Input() bugStatus: string;
  @Input() client:Client;
  storedReports: BugReport[];
  bugReports: BugReport[];
  dataSource: MatTableDataSource<BugReport> = new MatTableDataSource<BugReport>();
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private changeDetectorRef: ChangeDetectorRef, private api: ApiServiceService){}

  ngOnInit() {
    this.initBugreports()
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    
  }

  async initBugreports(){

    this.storedReports = await this.api.getbugReportByClientUsername(this.client.username);
    this.changeDetectorRef.detectChanges();

    this.obs = this.dataSource.connect();
    this.dataSource = new MatTableDataSource(await this.filterBugs());

  }

  async filterBugs(){
    switch (this.bugStatus) {
      case "Requested":
        this.bugReports = this.storedReports.filter(br => br.status === "Requested");
        break;
      case "Denied":
        this.bugReports = this.storedReports.filter(br => br.status === "Denied");
        break;
      case "Unresolved":
        this.bugReports = this.storedReports.filter(br => br.status === "Unresolved");
        break;
      case "Resolved":
        this.bugReports = this.storedReports.filter(br => br.status === "Resolved");
        break;
      default:
        this.bugReports = this.storedReports;
        break;
    }
    
    return this.bugReports;
  }
}
