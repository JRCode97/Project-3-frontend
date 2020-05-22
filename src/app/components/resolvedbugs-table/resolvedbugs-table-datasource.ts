import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// TODO: Replace this with your own data model type
export interface ResolvedbugsTableItem {
  bId:number;
  title: string;
  bugdetails: string;
  username:string;

  solutiontitle:string;
  description:string;
  client:string;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: ResolvedbugsTableItem[] = [
//   {bugId:'1', bugtit: 'Bug 1', bugdet: 'Bug details', reporter:'Reporter 1', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'2', bugtit: 'Bug 2', bugdet: 'Bug details', reporter:'Reporter 2', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'3', bugtit: 'Bug 3', bugdet: 'Bug details', reporter:'Reporter 3', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'4', bugtit: 'Bug 4', bugdet: 'Bug details', reporter:'Reporter 4', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'5', bugtit: 'Bug 5', bugdet: 'Bug details', reporter:'Reporter 5', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'7', bugtit: 'Bug 6', bugdet: 'Bug details', reporter:'Reporter 6', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'8', bugtit: 'Bug 7', bugdet: 'Bug details', reporter:'Reporter 7', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'9', bugtit: 'Bug 8', bugdet: 'Bug details', reporter:'Reporter 8', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'10', bugtit: 'Bug 9', bugdet: 'Bug details', reporter:'Reporter 9', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'11', bugtit: 'Bug 10', bugdet: 'Bug details', reporter:'Reporter 10', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'12', bugtit: 'Bug 10', bugdet: 'Bug details', reporter:'Reporter 11', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'13', bugtit: 'Bug 11', bugdet: 'Bug details', reporter:'Reporter 12', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
//   {bugId:'14', bugtit: 'Bug 12', bugdet: 'Bug details', reporter:'Reporter 13', soltit:'Solution 1', soltext:'Solution text 1', solver:'solver 1'},
// ];

/**
 * Data source for the ResolvedbugsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ResolvedbugsTableDataSource extends DataSource<ResolvedbugsTableItem> {
  data: any[] = this.givenData;
  //soldata: any[]= this.
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
  connect(): Observable<ResolvedbugsTableItem[]> {
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
  private getPagedData(data: ResolvedbugsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ResolvedbugsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        
        // case 'reporter':return compare(a.reporter,b.reporter,isAsc);
        // case 'soltit':return compare(a.soltit,b.soltit,isAsc);
        // case 'soltext':return compare(a.soltext,b.soltext,isAsc);
        // case 'solver': return compare(+a.solver, +b.solver, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
