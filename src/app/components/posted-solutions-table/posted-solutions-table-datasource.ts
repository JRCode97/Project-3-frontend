import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface PostedSolutionsTableItem {

  solution_id: number;
  solution_title: string;
  solution_describtion: string;
  status: string;
  solver: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PostedSolutionsTableItem[] = [
  { solution_id: 1, solution_title: 'Rebuild', solution_describtion: 'Rebuild the whole project to apply the new changes', solver: 'Wael Dawoud', status: 'Submitted' },
  { solution_id: 2, solution_title: 'Clear the cache ', solution_describtion: 'clear teh server cache', solver: 'Mohamed', status: 'Submitted' },
  { solution_id: 3, solution_title: 'Add new dependencies to POM', solution_describtion: 'Add new dependencies to POM.xml and rebuild', solver: 'Dylan', status: 'Submitted' },

];

/**
 * Data source for the PostedSolutionsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PostedSolutionsTableDataSource extends DataSource<PostedSolutionsTableItem> {
  data: PostedSolutionsTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<PostedSolutionsTableItem[]> {
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
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PostedSolutionsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PostedSolutionsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'solution_title': return compare(a.solution_title, b.solution_title, isAsc);
        case 'solver': return compare(+a.solver, +b.solver, isAsc);
        case 'status': return compare(+a.status, +b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
