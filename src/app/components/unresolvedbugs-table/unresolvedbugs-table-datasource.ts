import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
// import {AdminsolutionsService} from 'src/app/services/adminsolutions.service';
// import {HttpClient} from '@angular/common/http';
// import {ApiServiceService} from 'src/app/services/api-service.service';
// import { ActivatedRoute } from '@angular/router';

// TODO: Replace this with your own data model type
export interface UnresolvedbugsTableItem {
  title: string;
  //solutions: string;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: UnresolvedbugsTableItem[] = [
//   {bugtit: 'Bug 1', sols:'Solution 1'},
//   {bugtit: 'Bug 2', sols:'Solution 2'},
//   {bugtit: 'Bug 3', sols:'Solution 3'},
//   {bugtit: 'Bug 4', sols:'Solution 4'},
//   {bugtit: 'Bug 5', sols:'Solution 5'},
//   {bugtit: 'Bug 6', sols:'Solution 6'},
//   {bugtit: 'Bug 7', sols:'Solution 7'},
//   {bugtit: 'Bug 8', sols:'Solution 8'},
//   {bugtit: 'Bug 9', sols:'Solution 9'},
//   {bugtit: 'Bug 10', sols:'Solution 10'},
//   {bugtit: 'Bug 11', sols:'Solution 11'},
//   {bugtit: 'Bug 12', sols:'Solution 12'}
// ];

/**
 * Data source for the UnresolvedbugsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UnresolvedbugsTableDataSource extends DataSource<any> {

  data: any[]=this.givenData;
  paginator: MatPaginator;
  sort: MatSort;
 
  // bId:number;
  // title: string;
  // createdTime:number;
  // sols: string;
  
  constructor(private givenData) { 
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UnresolvedbugsTableItem[]> {
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
  private getPagedData(data: UnresolvedbugsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UnresolvedbugsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        //case 'solutions': return compare(+a.sols, +b.sols, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
