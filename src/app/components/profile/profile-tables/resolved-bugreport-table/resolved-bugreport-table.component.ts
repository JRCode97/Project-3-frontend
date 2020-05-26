import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ResolvedBugreportTableDataSource, ResolvedBugreportTableItem } from './resolved-bugreport-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-resolved-bugreport-table',
  templateUrl: './resolved-bugreport-table.component.html',
  styleUrls: ['./resolved-bugreport-table.component.css']
})
export class ResolvedBugreportTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ResolvedBugreportTableItem>;
  dataSource: ResolvedBugreportTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initBugreports()
    this.dataSource = new ResolvedBugreportTableDataSource(null);
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
    bugreports = bugreports.filter(br => br.status === "Resolved")
    this.dataSource = new ResolvedBugreportTableDataSource(bugreports);
    console.log(this.dataSource)
  }
}
