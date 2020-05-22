import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface BugReportsTableItem {
  title: string;
  date: number;
  status: string;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: BugReportsTableItem[] = [
//   {date: 1, title: 'Hydrogen', status: 'Pending'},
//   {date: 2, title: 'Helium', status: 'Resolved'},
//   {date: 3, title: 'Lithium', status: 'Pending'},
//   {date: 4, title: 'Beryllium', status: 'Unresolved'},
//   {date: 5, title: 'Boron', status: 'Pending'},
//   {date: 6, title: 'Carbon', status: 'Pending'},
//   {date: 7, title: 'Nitrogen', status: 'Pending'},
//   {date: 8, title: 'Oxygen', status: 'Pending'},
//   {date: 9, title: 'Fluorine', status: 'Pending'},
//   {date: 10, title: 'Neon', status: 'Pending'},
//   {date: 11, title: 'Sodium', status: 'Pending'},
//   {date: 12, title: 'Magnesium', status: 'Pending'},
//   {date: 13, title: 'Aluminum', status: 'Pending'},
//   {date: 14, title: 'Silicon', status: 'Pending'},
//   {date: 15, title: 'Phosphorus', status: 'Pending'},
//   {date: 16, title: 'Sulfur', status: 'Pending'},
//   {date: 17, title: 'Chlorine', status: 'Pending'},
//   {date: 18, title: 'Argon', status: 'Pending'},
//   {date: 19, title: 'Potassium', status: 'Pending'},
//   {date: 20, title: 'Calcium', status: 'Pending'},
// ];

/**
 * Data source for the BugReportsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BugReportsTableDataSource extends DataSource<any> {
  data: any[] = this.givenData;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private givenData) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BugReportsTableItem[]> {
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
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: BugReportsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: BugReportsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'date': return compare(+a.date, +b.date, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/title columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
