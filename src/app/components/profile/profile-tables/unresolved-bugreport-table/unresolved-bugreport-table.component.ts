import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UnresolvedBugreportTableDataSource, UnresolvedBugreportTableItem } from './unresolved-bugreport-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-unresolved-bugreport-table',
  templateUrl: './unresolved-bugreport-table.component.html',
  styleUrls: ['./unresolved-bugreport-table.component.css']
})
export class UnresolvedBugreportTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UnresolvedBugreportTableItem>;
  dataSource: UnresolvedBugreportTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}


  ngOnInit() {
    this.initBugreports()
    this.dataSource = new UnresolvedBugreportTableDataSource(null);
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
    bugreports = bugreports.filter(br => br.status === "Unresolved")
    this.dataSource = new UnresolvedBugreportTableDataSource(bugreports);
    console.log(this.dataSource)
  }
}
