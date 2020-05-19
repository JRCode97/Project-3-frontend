import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PostedSolutionsTableDataSource, PostedSolutionsTableItem } from './posted-solutions-table-datasource';

@Component({
  selector: 'app-posted-solutions-table',
  templateUrl: './posted-solutions-table.component.html',
  styleUrls: ['./posted-solutions-table.component.css']
})
export class PostedSolutionsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PostedSolutionsTableItem>;
  dataSource: PostedSolutionsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['solution_title', 'solution_describtion' ,'status','solver'];

  ngOnInit() {
    this.dataSource = new PostedSolutionsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
