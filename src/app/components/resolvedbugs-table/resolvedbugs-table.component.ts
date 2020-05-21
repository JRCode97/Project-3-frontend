import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ResolvedbugsTableDataSource, ResolvedbugsTableItem } from './resolvedbugs-table-datasource';

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
  displayedColumns = ['bugtit', 'bugdet','reporter','soltit','soltext','solver'];

  ngOnInit() {
    this.dataSource = new ResolvedbugsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
