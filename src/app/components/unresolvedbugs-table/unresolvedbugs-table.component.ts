import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UnresolvedbugsTableDataSource,UnresolvedbugsTableItem } from './unresolvedbugs-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';
import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';

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

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.initUnresolvedBugs();
    let dataSource=new UnresolvedbugsTableDataSource(this.bugreports);
    this.dataSource.sort=this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

    bugreports: Array<BugReport>;

  async initUnresolvedBugs(){
    const bugreports = await this.api.getUnResolvedBugs();
    this.dataSource = new UnresolvedbugsTableDataSource(bugreports);
  }
}
