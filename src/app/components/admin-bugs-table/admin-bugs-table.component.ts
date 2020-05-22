import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import BugReport from '../../models/BugReport';

@Component({
  selector: 'app-admin-bugs-table',
  templateUrl: './admin-bugs-table.component.html',
  styleUrls: ['./admin-bugs-table.component.css']
})
export class AdminBugsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() bugReports: BugReport[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BugReport>;
  obs: Observable<any>;
  dataSource: MatTableDataSource<BugReport> = new MatTableDataSource<BugReport>();


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'application', 'location', 'severity', 'priority', 'date', 'developer', 'details' ];
  constructor(private changeDetectorRef: ChangeDetectorRef) {

  }


  ngOnInit() {
    console.log(this.paginator)
    console.log(this.bugReports);
    this.dataSource = new MatTableDataSource<BugReport>(this.bugReports);
    console.log('Datasource in table')
    console.log(this.dataSource)

    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.obs = this.dataSource.connect();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log('data in table from datasrc');
    console.log(this.dataSource.data);
    console.log('Paginator');
    console.log(this.dataSource.paginator);
  }
}

