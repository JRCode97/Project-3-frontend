import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BugReportsTableDataSource, BugReportsTableItem } from './bug-reports-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-bug-reports-table',
  templateUrl: './bug-reports-table.component.html',
  styleUrls: ['./bug-reports-table.component.css']
})
export class BugReportsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BugReportsTableItem>;
  dataSource: BugReportsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initBugreports()
    this.dataSource = new BugReportsTableDataSource(null);
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  bugreportsArray = []

  async initBugreports(){
    let bugreports = await this.api.getBugReports()
    console.log(bugreports)
    
    this.dataSource = new BugReportsTableDataSource(bugreports);
    console.log(this.dataSource)
  }
}
