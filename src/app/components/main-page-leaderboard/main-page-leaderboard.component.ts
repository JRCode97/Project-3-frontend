import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-leaderboard',
  templateUrl: './main-page-leaderboard.component.html',
  styleUrls: ['./main-page-leaderboard.component.css']
})
export class MainPageLeaderboardComponent implements OnInit {

  //TEMP FIELD
  clients:Array<any>=[
    {name:"Avi", points:5000},
    {name:"Tiff", points:4200},
    {name:"Wael", points:3600},
    {name:"Sharjeel", points:3000},
    {name:"Will", points:2400},
    {name:"Dylan", points:2100},
    {name:"Sandra", points:1600},
    {name:"Cheng", points:1400},
    {name:"Mohammed", points:900},
    {name:"Adam", points:500}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
