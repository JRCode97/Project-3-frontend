import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DeniedBugreportTableDataSource, DeniedBugreportTableItem } from './denied-bugreport-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-denied-bugreport-table',
  templateUrl: './denied-bugreport-table.component.html',
  styleUrls: ['./denied-bugreport-table.component.css']
})
export class DeniedBugreportTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DeniedBugreportTableItem>;
  dataSource: DeniedBugreportTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initBugreports()
    this.dataSource = new DeniedBugreportTableDataSource(null);
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
    bugreports = bugreports.filter(br => br.status === "Denied")
    this.dataSource = new DeniedBugreportTableDataSource(bugreports);
    console.log(this.dataSource)
  }
}
