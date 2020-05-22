import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UnresolvedbugsTableDataSource,UnresolvedbugsTableItem } from './unresolvedbugs-table-datasource';
//import {BugReport} from 'src/app/models/BugReport';
import { ApiServiceService } from 'src/app/services/api-service.service';
import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';
// import { ActivatedRoute } from '@angular/router';
// import {AdminsolutionsService} from 'src/app/services/adminsolutions.service';

@Component({
  selector: 'app-unresolvedbugs-table',
  templateUrl: './unresolvedbugs-table.component.html',
  styleUrls: ['./unresolvedbugs-table.component.css']
})
export class UnresolvedbugsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UnresolvedbugsTableItem>;
  dataSource: UnresolvedbugsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title','solutions'];
  //bugCount: number;

  constructor(private api:ApiServiceService){}
 // constructor(private adminsolutionservice:AdminsolutionsService){}

  // reports: Array<BugReport>;
  // report:BugReport;
  // //id:string;
  // api: any;
  // panelOpenState = false;
  // bugCount:Number=0;

  ngOnInit() {
    this.initUnresolvedBugs();
    let dataSource=new UnresolvedbugsTableDataSource(this.bugreports);
    this.dataSource.sort=this.sort;
    //this.bugCount = this.bugreports.solutions.length;
    //this.dataSource=dataInstance;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
 
    bugreports: Array<BugReport>;
  //solutions: Array<Solution>;

  async initUnresolvedBugs(){
    console.log("Hit");
    const bugreports=await this.api.getUnResolvedBugs();
   // const solutions = await this.api.getSolutionsByBugId(Number(1));
    console.log(bugreports);
    // console.log(this.bugreports.solutions.length);
    // console.log("bug count"+this.bugCount);
    //console.log(solutions);
    //console.log(this.bugreports.length);
    this.dataSource=new UnresolvedbugsTableDataSource(bugreports);
  }  
}
