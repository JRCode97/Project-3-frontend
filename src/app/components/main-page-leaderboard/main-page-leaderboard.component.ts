import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-main-page-leaderboard',
  templateUrl: './main-page-leaderboard.component.html',
  styleUrls: ['./main-page-leaderboard.component.css']
})
export class MainPageLeaderboardComponent implements OnInit {

  clients: Array<any> = [
    { name: "Avi", points: 50 },
    { name: "Tiff", points: 42 },
    { name: "Wael", points: 36 },
    { name: "Sharjeel", points: 30 },
    { name: "Tiff", points: 24 },
    { name: "Dylan", points: 21 },
    { name: "Sandra", points: 16 },
    { name: "Cheng", points: 14 },
    { name: "Will", points: 9 },
    { name: "Adam", points: 5 }
  ];
  clientNames: Array<String>;
  clientPoints: Array<number>;

  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.clientNames = [];
    this.getList();
  }

  async getList(): Promise<any> {
    let nameList: Array<String> = await this.apiservice.getLeaderboardNames();
    this.clientNames = nameList;
    let pointList: Array<number> = await this.apiservice.getLeaderboardPoints();
    this.clientPoints = pointList;
    this.createLeaderboard();
  }

  createLeaderboard(): void {
    for (let i: number = 0; i < 10; i++) {
      if (this.clientNames[i]) {
        this.clients[i].name = this.clientNames[i];
        this.clients[i].points = this.clientPoints[i];
      }
    }
  }

}
