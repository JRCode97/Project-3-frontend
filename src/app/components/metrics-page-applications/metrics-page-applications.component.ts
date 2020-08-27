import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Application } from 'src/app/models/Application';

@Component({
  selector: 'app-metrics-page-applications',
  templateUrl: './metrics-page-applications.component.html',
  styleUrls: ['./metrics-page-applications.component.scss']
})
export class MetricsPageApplicationsComponent implements OnInit {
  appStats:Array<Application>;
  
  // resolution time per bug per application 
  // some kind of severity per bug per application - Stacked Column Chart
  // solutions submissions per app 
  // active users per app 


  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.getApplicationStats();
  }

  async getApplicationStats() {
    let apps = await this.apiservice.getApplications();
    this.appStats = apps;
    this.renderChart();
  }

  renderChart(){
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Bug Reports Per Application"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.appStats[0].reports.length, label: this.appStats[0].title},
          { y: this.appStats[1].reports.length, label: this.appStats[1].title },
          { y: this.appStats[2].reports.length, label: this.appStats[2].title },
          { y: this.appStats[3].reports.length, label: this.appStats[3].title },
          { y:this.appStats[4].reports.length, label: this.appStats[4].title }
        ]
      }]
    });
      
    chart.render();
  }
}
