import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BugReportsTableDataSource, BugReportsTableItem } from './bug-reports-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-bug-reports-table',
  templateUrl: './bug-reports-table.component.html',
  styleUrls: ['./bug-reports-table.component.css']
})
export class BugReportsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BugReportsTableItem>;
  dataSource: BugReportsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initBugreports()
    this.dataSource = new BugReportsTableDataSource(null);
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
    bugreports.forEach(bugreport => {
      let obj:any = {}
      obj.title = bugreport.title
      obj.status = bugreport.status
      obj.date = bugreport.createdTime
      this.bugreportsArray.push(obj)
    })
    // console.log(this.bugreportsArray)
    // console.log(this.profileservice.bugreportsArray)
    this.dataSource = new BugReportsTableDataSource(this.bugreportsArray);
    console.log(this.dataSource)
  }
}
