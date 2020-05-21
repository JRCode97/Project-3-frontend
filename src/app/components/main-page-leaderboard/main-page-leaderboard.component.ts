import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

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
    {name:"Wael", points:36},
    {name:"Sharjeel", points:30},
    {name:"Tiff", points:24},
    {name:"Dylan", points:21},
    {name:"Sandra", points:16},
    {name:"Cheng", points:14},
    {name:"Will", points:9},
    {name:"Adam", points:5}
  ];
  // API not created yet, should be simple
  clientNames:Array<String>;
  clientPoints:Array<number>;

  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.clientNames = [];
    this.getList();
  }

  async getList():Promise<any>{
    let nameList:Array<String> = await this.apiservice.getLeaderboardNames();
    this.clientNames = nameList;
    console.log(this.clientNames);
    let pointList:Array<number> = await this.apiservice.getLeaderboardPoints();
    this.clientPoints = pointList;
    console.log(this.clientPoints);
    this.createLeaderboard();
  }

  createLeaderboard():void{
    for (let i:number = 0; i < this.clientNames.length; i++){
      this.clients[i].name = this.clientNames[i];
      this.clients[i].points = this.clientPoints[i];
    }
  }

}
