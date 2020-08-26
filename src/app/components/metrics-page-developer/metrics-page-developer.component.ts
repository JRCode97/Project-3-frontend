import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metrics-page-developer',
  templateUrl: './metrics-page-developer.component.html',
  styleUrls: ['./metrics-page-developer.component.scss']
})
export class MetricsPageDeveloperComponent implements OnInit {

  // bugs requested & solutions per user 
  // some kind of "social enagement" - stretch
  // active users - users that have submitted something in the past week 
  // inactive users 
  // avg time user takes to complete 
  // amount of users 
  // users per application

  constructor() { }

  ngOnInit(): void {
  }

}
