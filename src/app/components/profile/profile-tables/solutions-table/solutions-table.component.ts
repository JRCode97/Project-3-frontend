import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SolutionsTableDataSource, SolutionsTableItem } from './solutions-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-solutions-table',
  templateUrl: './solutions-table.component.html',
  styleUrls: ['./solutions-table.component.css']
})
export class SolutionsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SolutionsTableItem>;
  dataSource: SolutionsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}


  ngOnInit() {
    this.initSolutions()
    this.dataSource = new SolutionsTableDataSource(null);
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
    solutions.forEach(solution => {
      let obj:any = {}
      obj.title = solution.title
      obj.status = solution.status
      obj.date = solution.timeSubmitted
      this.solutionArray.push(obj)
    })
    console.log(this.solutionArray)
    // console.log(this.profileservice.bugreportsArray)
    this.dataSource = new SolutionsTableDataSource(this.solutionArray);
    console.log(this.dataSource)
  }
}
