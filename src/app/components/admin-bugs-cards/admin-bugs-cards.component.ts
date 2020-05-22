import {ChangeDetectorRef, Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import BugReport from '../../models/BugReport';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-admin-bugs-cards',
  templateUrl: './admin-bugs-cards.component.html',
  styleUrls: ['./admin-bugs-cards.component.css']
})

export class AdminBugsCardsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() bugReports: BugReport[];
  @ViewChild(MatCard) card: MatCard;
  obs: Observable<any>;
  dataSource: MatTableDataSource<BugReport> = new MatTableDataSource<BugReport>();
  currentItemsToShow = [];
  pageSize = 6; // number of cards per page


  constructor(private changeDetectorRef: ChangeDetectorRef) {

  }


  ngOnInit() {
    this.currentItemsToShow = this.bugReports.slice(0, this.pageSize);
    console.log(this.paginator);
    console.log(this.bugReports);
    this.dataSource = new MatTableDataSource<BugReport>(this.bugReports);
    console.log('Datasource');
    console.log(this.dataSource);

    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.obs = this.dataSource.connect();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data);
    console.log('Paginator');
    console.log(this.dataSource.paginator);

  }

  onPageChange($event){
    this.currentItemsToShow = this.bugReports;
    this.currentItemsToShow = this.bugReports.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize +
      $event.pageSize
    );

  }


  // ngOnDestroy() {
  //   if (this.dataSource) {
  //     this.dataSource.disconnect();
  //   }
  // }
}




