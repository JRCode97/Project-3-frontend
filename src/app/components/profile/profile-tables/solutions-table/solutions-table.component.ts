import { AfterViewInit, Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SolutionsTableDataSource, SolutionsTableItem } from './solutions-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Solution from 'src/app/models/Solution';
import {Observable} from 'rxjs';
import Client from 'src/app/models/Client';

@Component({
  selector: 'app-solutions-table',
  templateUrl: './solutions-table.component.html',
  styleUrls: ['./solutions-table.component.css']
})
export class SolutionsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SolutionsTableItem>;
  obs: Observable<any>;
  @Input() solutionStatus: string;
  @Input() client:Client;
  storedSolutions: Solution[];
  solutions: Solution[];
  dataSource: MatTableDataSource<Solution> = new MatTableDataSource<Solution>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'title', 'status'];

  constructor(private changeDetectorRef: ChangeDetectorRef,private api:ApiServiceService){}


  ngOnInit() {
    this.initSolutions()
    this.changeDetectorRef.detectChanges();

    this.obs = this.dataSource.connect();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  solutionArray=[]

  async initSolutions(){
    this.storedSolutions = await this.api.getSolutionsByClientId(this.client.cId)
    this.dataSource = new MatTableDataSource(await this.filterSolutions());
  }
  async filterSolutions(){
    switch (this.solutionStatus) {
      case "Pending":
        this.solutions = this.storedSolutions.filter(sol => sol.status === "Pending");
        break;
      case "Accepted":
        this.solutions = this.storedSolutions.filter(sol => sol.status === "Accepted");
        break;
      case "Rejected":
        this.solutions = this.storedSolutions.filter(sol => sol.status === "Rejected");
        break;
      default:
        this.solutions = this.storedSolutions;
        break;
    }
    
    return this.solutions;
  }
}
