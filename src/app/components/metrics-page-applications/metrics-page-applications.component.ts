import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Application } from 'src/app/models/Application';
import { ConstantPool } from '@angular/compiler';
import Solution from 'src/app/models/Solution';

@Component({
  selector: 'app-metrics-page-applications',
  templateUrl: './metrics-page-applications.component.html',
  styleUrls: ['./metrics-page-applications.component.scss']
})
export class MetricsPageApplicationsComponent implements OnInit {
  appStats:Array<Application>;
  bugsPerApp:Array<DataPoint> = [];
  solutionsPerApp:Array<DataPoint> = [];
  // charts:Array<any> = [];
  
  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.getApplicationStats();
  }



  async getApplicationStats() {
    let apps = await this.apiservice.getApplications();
    console.log(apps);

    for (let i = 0; i < apps.length; i++) {
      let bugDto = new DataPoint(apps[i].reports.length, apps[i].title)
      this.bugsPerApp.push(bugDto);
      try {
        let solution = await this.apiservice.getApplicationSolutions(apps[i].id);
        console.log(solution);
        let solutionDto = new DataPoint(solution, apps[i].title);
        this.solutionsPerApp.push(solutionDto);
      } catch (error) {
        console.log("wdw");
      }
    }
    this.appStats = apps;

    this.renderChart();
    this.renderChart2();
    this.renderChart3();
    this.renderchart4();
  }

  renderChart(){
    let chart = new CanvasJS.Chart("chartContainer",
    {
      // theme: "dark2", 
      title:{
      text: "Bugs/Solutions per App",
      fontFamily: "Verdana",
      fontWeight: "bold"
      },
      backgroundColor: "transparent",
      data: [
      {
        type: "column",
        color: "rgb(255, 89, 89)",        // change color here
        dataPoints: this.bugsPerApp
      },
        {
        type: "column",
        color: "rgb(186, 255, 177)",
        dataPoints: this.solutionsPerApp
      }
      ]
    });

    chart.options.theme = "dark";
    chart.render();
  } 


  renderChart2(){
    var chart2 = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: "Active Users per Application",
        fontFamily: "Verdana",
        fontWeight: "bold"
      },
      backgroundColor: "transparent",
      axisY: {
        title: ""
      },
      data: [{        
        type: "column",  
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "MMbbl = one million barrels",
        dataPoints: [      
          { y: this.appStats[0].reports.length, label: this.appStats[0].title},
          { y: this.appStats[1].reports.length, label: this.appStats[1].title },
          { y: this.appStats[2].reports.length, label: this.appStats[2].title },
          { y: this.appStats[3].reports.length, label: this.appStats[3].title },
          { y:this.appStats[4].reports.length, label: this.appStats[4].title }
        ]
      }]
    });

    // this.charts.push(chart2);
    // for( var i = 0; i < this.charts.length; i++){
    //   this.charts[i].render();
    // }
    chart2.render();
  }

  renderChart3(){
    var chart3 = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      title: {
        text: "Average Bug Solution Time per Application",
        fontFamily: "Verdana",
        fontWeight: "bold"
      },
      backgroundColor: "transparent",
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: [
          {y: 79.45, label: "Google"},
          {y: 7.31, label: "Bing"},
          {y: 7.06, label: "Baidu"},
          {y: 4.91, label: "Yahoo"},
          {y: 1.26, label: "Others"}
        ]
      }]
    });
    chart3.render();
  }

  renderchart4(){
    var chart4 = new CanvasJS.Chart("chartContainer4", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      animationEnabled: true,
      title: {
        text: "Bug Solution Time by Application",
        fontFamily: "Verdana",
        fontWeight: "bold"
      },
      backgroundColor: "transparent",
      axisY: {
        title: "Solution Time",
        prefix: ""
      },
      data: [{
        type: "rangeColumn",
        yValueFormatString: "#,##0.00",
        xValueFormatString: "",
        toolTipContent: "{x}<br>High: {y[0]}<br>Low: {y[1]}",
        dataPoints: [		
          { x: 5, y: [27.10, 38.99] },
          { x: 6, y: [29.92, 37.00] },
          { x: 12, y: [35.95, 42.54] },
          { x: 1, y: [37.27, 48.50] },
          { x: 6, y: [43.33, 50.51] },
          { x: 8, y: [46.69, 52.86] },
          { x: 11, y: [41.80, 50.75] },
          { x: 10, y: [41.51, 51.22] },
          { x: 4, y: [45.09, 50.14] },
          { x: 2, y: [47.98, 53.73] },
          { x: 7, y: [43.57, 50.49] },
          { x: 9, y: [51.51, 57.89] }
        ]
      }]
    });
    chart4.render();
  }
  
}

export class DataPoint {
  y: number;
  label: string;
  constructor(y: number, label:string){
    this.y= y;
    this.label= label;
  }
}
