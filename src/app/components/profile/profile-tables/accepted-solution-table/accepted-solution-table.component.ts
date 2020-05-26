import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AcceptedSolutionTableDataSource, AcceptedSolutionTableItem } from './accepted-solution-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-accepted-solution-table',
  templateUrl: './accepted-solution-table.component.html',
  styleUrls: ['./accepted-solution-table.component.css']
})
export class AcceptedSolutionTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AcceptedSolutionTableItem>;
  dataSource: AcceptedSolutionTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initSolutions()
    this.dataSource = new AcceptedSolutionTableDataSource(null);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  solutionArray=[]

  async initSolutions(){
    let solutions = await this.api.getSolutionsByClientId(1)
    console.log(solutions)
    solutions = solutions.filter(sol => sol.status === "Accepted")
    this.dataSource = new AcceptedSolutionTableDataSource(solutions);
    console.log(this.dataSource)
  }
}
