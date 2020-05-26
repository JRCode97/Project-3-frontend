import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ResolvedbugsTableDataSource, ResolvedbugsTableItem } from './resolvedbugs-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';
import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';

@Component({
  selector: 'app-resolvedbugs-table',
  templateUrl: './resolvedbugs-table.component.html',
  styleUrls: ['./resolvedbugs-table.component.css']
})
export class ResolvedbugsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ResolvedbugsTableItem>;
  dataSource: ResolvedbugsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'bugdetails','username'];

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initResolvedBugs();
    this.dataSource = new ResolvedbugsTableDataSource(this.bugreports);
    this.dataSource.sort=this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  bugreports: Array<BugReport>;
  solutions: Array<Solution>;

  async initResolvedBugs(){
    console.log("Hit");
    const bugreports= await this.api.getResolvedBugs();
    const solutions = await this.api.getSolutionsByBugId(Number(1));
    console.log(bugreports);
    console.log(solutions);
    this.dataSource= new ResolvedbugsTableDataSource(bugreports);
  }

  // async getData(id:string) {
  //   const bugReport:BugReport = await this.api.getBugReportById(Number(id));
  //   const solutions:Solution[] = await this.api.getSolutionsByBugId(Number(id));
  //   this.report = bugReport;
  //   this.updateIsResolved(bugReport);
  //   this.dataSource = new MatTableDataSource(solutions);
  // }
}
