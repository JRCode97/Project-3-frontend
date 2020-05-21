import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

// TODO: Replace this with your own data model type
export interface AdminBugsTableItem {
  title: string;
  application: string;
  location: string;
  severity: string;
  priority: string;
  date: string;
  developer: string;
  details: string;
}


// TODO: replace this with real data from your application
const EXAMPLE_DATA: AdminBugsTableItem[] = [
  {title: 'Bug1', application: 'App1', location: 'Page1', severity: 'Severe', priority: 'Urgent', date: '05/13/2020', developer: 'Developer1', details: 'Inspect'},
  {title: 'Bug2', application: 'App2', location: 'Page3', severity: 'Mild', priority: 'Low', date: '05/01/2020', developer: 'Developer3', details: 'Inspect'},
  {title: 'Bug3', application: 'App2', location: 'Page5', severity: 'Medium', priority: 'Middle', date: '05/10/2020', developer: 'Developer2', details: 'Inspect'},
  {title: 'Bug4', application: 'App3', location: 'Page3', severity: 'Mild', priority: 'Low', date: '05/01/2020', developer: 'Developer5', details: 'Inspect'},
  {title: 'Bug5', application: 'App1', location: 'Page1', severity: 'Severe', priority: 'Urgent', date: '05/13/2020', developer: 'Developer1', details: 'Inspect'},
  {title: 'Bug6', application: 'App2', location: 'Page3', severity: 'Mild', priority: 'Low', date: '05/01/2020', developer: 'Developer3', details: 'Inspect'},
  {title: 'Bug7', application: 'App2', location: 'Page5', severity: 'Medium', priority: 'Middle', date: '05/10/2020', developer: 'Developer2', details: 'Inspect'},
  {title: 'Bug8', application: 'App3', location: 'Page3', severity: 'Mild', priority: 'Low', date: '05/01/2020', developer: 'Developer5', details: 'Inspect'},
  {title: 'Bug9', application: 'App2', location: 'Page5', severity: 'Medium', priority: 'Middle', date: '05/10/2020', developer: 'Developer2', details: 'Inspect'},
  {title: 'Bug10', application: 'App3', location: 'Page3', severity: 'Mild', priority: 'Low', date: '05/01/2020', developer: 'Developer5', details: 'Inspect'}
];

/**
 * Data source for the AdminBugsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminBugsTableDataSource extends DataSource<AdminBugsTableItem> {
  data: AdminBugsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AdminBugsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }



  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from theng server.
   */
  private getPagedData(data: AdminBugsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AdminBugsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'application': return compare(a.application, b.application, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'severity': return compare(a.severity, b.severity, isAsc);
        case 'priority': return compare(a.priority, b.priority, isAsc);
        case 'date': return compare(a.date, b.date, isAsc);
        case 'developer': return compare(a.developer, b.developer, isAsc);
        case 'details': return compare(a.details, b.details, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
