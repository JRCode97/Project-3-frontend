import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../services/api-service.service';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  applications: Array<Application> = [];

  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.applications = [];
    this.getApplications();
  }

  async getApplications(): Promise<any> {
    let aList: Array<Application> = await this.apiservice.getAllApplications();
    console.log(aList);
    this.applications = aList;
    console.log(this.applications);
  }

}
