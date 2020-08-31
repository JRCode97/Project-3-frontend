import { AfterViewInit, Component, OnInit,Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BugReportsTableItem>;
  obs: Observable<any>;
  @Input() bugReports: BugReport[];
  dataSource: MatTableDataSource<BugReport> = new MatTableDataSource<BugReport>();
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  ngOnInit() {
    this.initBugreports()
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.obs = this.dataSource.connect();
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  bugreportsArray = []

  async initBugreports(){
    this.dataSource = await new MatTableDataSource(this.bugReports);
    // let client:Client = this.api.getLoggedClient();
    // let bugreports = await this.api.getbugReportByClientUsername(client.username);
    // this.dataSource = new BugReportsTableDataSource(bugreports);
  }
}
