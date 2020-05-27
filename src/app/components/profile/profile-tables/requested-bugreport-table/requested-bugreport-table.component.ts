import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RequestedBugreportTableDataSource, RequestedBugreportTableItem } from './requested-bugreport-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-requested-bugreport-table',
  templateUrl: './requested-bugreport-table.component.html',
  styleUrls: ['./requested-bugreport-table.component.css']
})
export class RequestedBugreportTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<RequestedBugreportTableItem>;
  dataSource: RequestedBugreportTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initBugreports()
    this.dataSource = new RequestedBugreportTableDataSource(null);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  bugreportsArray = []

  async initBugreports(){
    let client:Client = this.api.getLoggedClient()
    let bugreports = await this.api.getbugReportByClientUsername(client.username)
    console.log(bugreports)
    bugreports = bugreports.filter(br => br.status === "Requested")
    this.dataSource = new RequestedBugreportTableDataSource(bugreports);
    console.log(this.dataSource)
  }
}
