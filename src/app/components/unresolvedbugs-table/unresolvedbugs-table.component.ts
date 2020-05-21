import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UnresolvedbugsTableDataSource,UnresolvedbugsTableItem } from './unresolvedbugs-table-datasource';
//import {BugReport} from 'src/app/models/BugReport';
import { ApiServiceService } from 'src/app/services/api-service.service';
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
  displayedColumns = ['title'];

  constructor(private api:ApiServiceService){}
 // constructor(private adminsolutionservice:AdminsolutionsService){}

  // reports: Array<BugReport>;
  // report:BugReport;
  // //id:string;
  // api: any;


  ngOnInit() {
    this.addUnresolvedBugs();
    let dataSource=new UnresolvedbugsTableDataSource(null);
    //this.dataSource=dataInstance;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  bugReportsArray=[]

  async addUnresolvedBugs(){
    console.log("Hit");
    let bugreports=await this.api.getBugReports();
    // //this.reports=bugReports;
    console.log(bugreports);
    bugreports.forEach(report => {
      let obj:any={}
     // obj.bId=report.bId;
      obj.title=report.title;
     // obj.createdTime=report.createdTime;
      //obj.solutions=report.solutions;
      
      this.bugReportsArray.push(obj);
    });
    this.dataSource=new UnresolvedbugsTableDataSource(this.bugReportsArray);
    console.log(this.dataSource);
    //return this.dataSource;
  }
   
}
