import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RejectedSolutionTableDataSource, RejectedSolutionTableItem } from './rejected-solution-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-rejected-solution-table',
  templateUrl: './rejected-solution-table.component.html',
  styleUrls: ['./rejected-solution-table.component.css']
})
export class RejectedSolutionTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<RejectedSolutionTableItem>;
  dataSource: RejectedSolutionTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}


  ngOnInit() {
    this.initSolutions()
    this.dataSource = new RejectedSolutionTableDataSource(null);
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
    solutions = solutions.filter(sol => sol.status === "Rejected");
    this.dataSource = new RejectedSolutionTableDataSource(solutions);
  }

}
