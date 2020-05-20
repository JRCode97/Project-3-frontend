import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

export interface AdminBugsCards {
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
const EXAMPLE_DATA: AdminBugsCards[] = [
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

@Component({
  selector: 'app-admin-bugs-cards',
  templateUrl: './admin-bugs-cards.component.html',
  styleUrls: ['./admin-bugs-cards.component.css']
})
export class AdminBugsCardsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<AdminBugsCards> = new MatTableDataSource<AdminBugsCards>(EXAMPLE_DATA);


  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}


