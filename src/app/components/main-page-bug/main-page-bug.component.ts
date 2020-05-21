import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-bug',
  templateUrl: './main-page-bug.component.html',
  styleUrls: ['./main-page-bug.component.css']
})
export class MainPageBugComponent implements OnInit {

  // Temp Field
  title: String = 'Can\'t resolve promise';
  status: String = 'Unresolved';
  pointValue: Number = 500;
  username: String = 'WackyWill';
  dateApproved: Date = new Date();
  description: String = 'This is a description for my bug. There are many other bugs like it, but this one\'s mine.';
  repSteps: String = 'First run the page. Try to add 20 pizzas. Place order. It should return the list of objects but I\'m getting a promise.';

  constructor() { }

  ngOnInit(): void {
  }

}
