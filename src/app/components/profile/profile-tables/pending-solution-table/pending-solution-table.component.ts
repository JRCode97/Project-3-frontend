import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PendingSolutionTableDataSource, PendingSolutionTableItem } from './pending-solution-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-pending-solution-table',
  templateUrl: './pending-solution-table.component.html',
  styleUrls: ['./pending-solution-table.component.css']
})
export class PendingSolutionTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PendingSolutionTableItem>;
  dataSource: PendingSolutionTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initSolutions()
    this.dataSource = new PendingSolutionTableDataSource(null);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  solutionArray=[]

  async initSolutions(){
    let client = this.api.getLoggedClient();
    let solutions = await this.api.getSolutionsByClientId(client.cId);
    solutions = solutions.filter(sol => sol.status === "Pending");
    this.dataSource = new PendingSolutionTableDataSource(solutions);
  }
}
