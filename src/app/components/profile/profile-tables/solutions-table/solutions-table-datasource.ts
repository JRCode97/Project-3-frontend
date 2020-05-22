import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface SolutionsTableItem {
  title: string;
  date: number;
  status: string;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: SolutionsTableItem[] = [
//   {date: 1, title: 'Hydrogen'},
//   {date: 2, title: 'Helium'},
//   {date: 3, title: 'Lithium'},
//   {date: 4, title: 'Beryllium'},
//   {date: 5, title: 'Boron'},
//   {date: 6, title: 'Carbon'},
//   {date: 7, title: 'Nitrogen'},
//   {date: 8, title: 'Oxygen'},
//   {date: 9, title: 'Fluorine'},
//   {date: 10, title: 'Neon'},
//   {date: 11, title: 'Sodium'},
//   {date: 12, title: 'Magnesium'},
//   {date: 13, title: 'Aluminum'},
//   {date: 14, title: 'Silicon'},
//   {date: 15, title: 'Phosphorus'},
//   {date: 16, title: 'Sulfur'},
//   {date: 17, title: 'Chlorine'},
//   {date: 18, title: 'Argon'},
//   {date: 19, title: 'Potassium'},
//   {date: 20, title: 'Calcium'},
// ];

/**
 * Data source for the SolutionsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SolutionsTableDataSource extends DataSource<any> {
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
  connect(): Observable<SolutionsTableItem[]> {
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
  private getPagedData(data: SolutionsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SolutionsTableItem[]) {
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
