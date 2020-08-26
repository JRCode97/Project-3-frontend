import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import * as CanvasJS from 'src/assets/canvasjs.min';

@Component({
  selector: 'app-metrics-page-summary',
  templateUrl: './metrics-page-summary.component.html',
  styleUrls: ['./metrics-page-summary.component.scss']
})
export class MetricsPageSummaryComponent implements OnInit {

  resolvedBugsCount:number;
  unresolvedBugsCount:number;
  requestedBugsCount:number;
  highCount:number;
  medCount:number;
  lowCount:number;
  avgTime:number;


  

  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.getStats();
  }

  async getStats() {
    let req = await this.apiservice.getRequestedBugs();
    let res = await this.apiservice.getResolvedBugs();
    let unres = await this.apiservice.getUnResolvedBugs();
    let all = await this.apiservice.getBugReports();
    let hCount:number =0;
    let mCount:number = 0;
    let lCount:number = 0;
    let timeSum:number = 0;
    for (let r of all){
      timeSum += (r.resolvedTime - r.dateCreated);
      if(r.severity === "High"){
        ++hCount;
      }
      if(r.severity === "Medium"){
        ++mCount;
      } 
      if(r.severity === "Low"){
        ++lCount;
      } 
    }
    this.avgTime = Math.round(timeSum / all.length);
    this.highCount = hCount;
    this.medCount = mCount;
    this.lowCount = lCount;
    
    this.resolvedBugsCount = res.length;
    this.unresolvedBugsCount = unres.length;
    this.requestedBugsCount = req.length;
    this.makeChart();
  }


  makeChart(){
    console.log(this.highCount);
    console.log(this.medCount);
    console.log(this.lowCount);
    CanvasJS.addColorSet("colors",
                [//colorSet Array

                "rgb(255, 89, 89)",
                "rgb(255, 217, 112)",
                "rgb(186, 255, 177)",            
                ]);

    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      backgroundColor: "transparent",
      colorSet: "colors",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Severity Distribution"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} Bugs (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: this.highCount, name: "High" },
          { y: this.medCount, name: "Medium" },
          { y: this.lowCount, name: "Low" }
        ]
      }]
    });
      
    chart.render();
  }
}
