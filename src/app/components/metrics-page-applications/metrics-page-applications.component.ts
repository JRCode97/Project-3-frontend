import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Application } from 'src/app/models/Application';
import { ConstantPool } from '@angular/compiler';
import Solution from 'src/app/models/Solution';
import { stringify } from 'querystring';

@Component({
  selector: 'app-metrics-page-applications',
  templateUrl: './metrics-page-applications.component.html',
  styleUrls: ['./metrics-page-applications.component.scss']
})
export class MetricsPageApplicationsComponent implements OnInit {
  // appStats:Array<Application>;
  bugsPerApp:Array<ylDataPoint> = [];
  solutionsPerApp:Array<ylDataPoint> = [];

  usersPerApp:Array<ylDataPoint> = [];

  avgSolTimePerApp:Array<ylDataPoint> = [];

  hiLoResolveTime:Array<xyDataPoint> = [];
 

  theme:string;
  solBugChart;
  hiLoChart;
  avgChart;
  uChart;


  whileLoading:string = "buffering";
  ifLoading:boolean = true;

  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    if(document.body.classList.contains('light-theme')){
      this.theme='light2';
    } else {
      this.theme='dark2';
    }
    this.getApplicationStats();
    
    this.apiservice.theme.subscribe((event)=>{
      if (document.body.classList.contains('light-theme')){
        this.theme = 'light2';
        this.solBugChart.options.theme ='light2';
        this.hiLoChart.options.theme = 'light2';
        this.avgChart.options.theme = 'light2';
        this.uChart.options.theme = 'light2';
        this.solBugChart.render();
        this.hiLoChart.render();
        this.avgChart.render();
        this.uChart.render();
      }
      if (document.body.classList.contains('dark-theme')){
        this.theme = 'dark2';
        this.solBugChart.options.theme ='dark2';
        this.hiLoChart.options.theme = 'dark2';
        this.avgChart.options.theme = 'dark2';
        this.uChart.options.theme = 'dark2';
        this.solBugChart.render();
        this.hiLoChart.render();
        this.avgChart.render();
        this.uChart.render();
      }
    })
  }



  async getApplicationStats() {
    let apps = await this.apiservice.getApplications();
    console.log(apps);

    for (let i = 0; i < apps.length; i++) {
      let bugDto = new ylDataPoint(apps[i].reports.length, apps[i].title)
      this.bugsPerApp.push(bugDto);
      try {
        let solutions = await this.apiservice.getApplicationSolutions(apps[i].id);
        console.log(solutions);
        let solutionDto = new ylDataPoint(solutions, apps[i].title);
        this.solutionsPerApp.push(solutionDto);

        let users = await this.apiservice.getApplicationUsers(apps[i].id);
        let userDto = new ylDataPoint(users, apps[i].title);
        this.usersPerApp.push(userDto);

        let avgSolTime = await this.apiservice.getApplicationAverageResolvedTime(apps[i].id);
        avgSolTime = avgSolTime/3600000
        let avgTimeDto = new ylDataPoint(avgSolTime,apps[i].title);
        this.avgSolTimePerApp.push(avgTimeDto);

        let longResolveTime = await this.apiservice.getApplicationLongestResolvedTime(apps[i].id);
        longResolveTime = longResolveTime/3600000;
        let shortResolveTime = await this.apiservice.getApplicationShortestResolvedTime(apps[i].id);
        shortResolveTime = shortResolveTime/3600000;
        let hiLoTime = [longResolveTime, shortResolveTime];
        let hiLoDto = new xyDataPoint((i+1)*10, hiLoTime, apps[i].title);
        this.hiLoResolveTime.push(hiLoDto);

      } catch (error) {
        console.log("wdw");
      }
    }


    if (this.theme == 'light2'){
      this.makeSolBugChart();
      this.solBugChart.options.theme ='light2';
      this.solBugChart.render();
  
      this.makeUserChart();
      this.uChart.options.theme = 'light2';
      this.uChart.render();
  
      this.makeAverageChart();
      this.avgChart.options.theme = 'light2';
      this.avgChart.render();
  
      this.makeHiLoChart();
      this.hiLoChart.options.theme = 'light2';
      this.hiLoChart.render();
    }
    if (this.theme == "dark2"){
      this.makeSolBugChart();
      this.solBugChart.options.theme ='dark2';
      this.solBugChart.render();
  
      this.makeUserChart();
      this.uChart.options.theme = 'dark2';
      this.uChart.render();
  
      this.makeAverageChart();
       this.avgChart.options.theme = 'dark2';
      this.avgChart.render();
  
      this.makeHiLoChart();
      this.hiLoChart.options.theme = 'dark2';
      this.hiLoChart.render();
    }

    this.whileLoading = "";
    this.ifLoading= false;
  }

  makeSolBugChart(){
    let chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
      text: "Bugs/Solutions per App",
      fontFamily: "Verdana",
      fontWeight: "bold"
      },
      backgroundColor: "transparent",
      data: [
      {
        legendText: "Bugs",
        showInLegend: true,
        type: "column",
        color: "IndianRed",        // change color here
        dataPoints: this.bugsPerApp
      },
        {
          legendText: "Solutions",
          showInLegend: true,
        type: "column",
        color: "DarkSeaGreen",
        dataPoints: this.solutionsPerApp
      }
      ]
    });

    // chart.options.theme = "dark";
    this.solBugChart = chart;
  } 


  makeUserChart(){
    var chart2 = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      colorSet:  "colorSet3",
      title:{
        text: "Active Users per Application",
        fontFamily: "Verdana",
        fontWeight: "bold"
      },
      backgroundColor: "transparent",
      axisY: {
        title: "Users"
      },
      data: [{        
        type: "pie",  
        dataPoints: this.usersPerApp
      }]
    });
    this.uChart = chart2;
  }

  makeAverageChart(){
    var chart3 = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      colorSet:  "colorSet3",
      title: {
        text: "Average Bug Solution Time per Application",
        fontFamily: "Verdana",
        fontWeight: "bold"
      },
      axisY: {
        title: "Solution Time (hours)",
      },
      backgroundColor: "transparent",
      data: [{
        type: "column",
        startAngle: 240,
        yValueFormatString: "##0\" hours\"",
        // indexLabel: "{label} {y}",
        dataPoints: this.avgSolTimePerApp
      }]
    });
    this.avgChart = chart3;
    // chart3.render();
  }

  makeHiLoChart(){
    console.log(this.hiLoResolveTime)
    var chart4 = new CanvasJS.Chart("chartContainer4", {
      colorSet:  "colorSet3",
      animationEnabled: true,
      title: {
        text: "Bug Solution Time by Application",
        fontFamily: "Verdana",
        fontWeight: "bold"
      },
      backgroundColor: "transparent",
      axisY: {
        title: "Solution Time (hours)",
      },

      axisX: {
        interval: 10
      },
      data: [{
        type: "rangeBar",
        yValueFormatString: "#,##0.00",
        indexLabel: "{y[#index]}" ,
        toolTipContent: "{label}<br>High: {y[0]}<br>Low: {y[1]}",
        dataPoints: this.hiLoResolveTime
      }]
    });
    this.hiLoChart = chart4;
  }
  
}

export class ylDataPoint {
  y: number;
  label: string;
  constructor(y: number, label:string){
    this.y= y;
    this.label= label;
  }
}

export class xyDataPoint {
  x: number;
  y: Array<number>;
  label:string;
  constructor(x: number, y:Array<number>, label:string){
    this.x= x;
    this.y= y;
    this.label = label;
  }
}
