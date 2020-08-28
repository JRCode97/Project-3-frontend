import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import * as CanvasJS from 'src/assets/canvasjs.min';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-metrics-page-summary',
  templateUrl: './metrics-page-summary.component.html',
  styleUrls: ['./metrics-page-summary.component.scss']
})
export class MetricsPageSummaryComponent implements OnInit {

  theme:string;
  timeSeries:Array<Object> = new Array();
  resolvedBugsCount:number;
  unresolvedBugsCount:number;
  requestedBugsCount:number;
  highCount:number;
  medCount:number;
  lowCount:number;
  avgTime:number;
  lineChart;
  pieChart;

  // count by severity & status 
  // document.body.classList.contains('light-theme')

  constructor(private apiservice: ApiServiceService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    if(document.body.classList.contains('light-theme')){
      this.theme='light2';
    } else {
      this.theme='dark2';
    }
    this.getStats();
    
    this.apiservice.theme.subscribe((event)=>{
      if(document.body.classList.contains('light-theme')){
        this.theme = 'light2';
        this.lineChart.options.theme='light2';
        this.pieChart.options.theme='light2';
        this.lineChart.render();
        this.pieChart.render();
      }
      if(document.body.classList.contains('dark-theme')){
        this.theme = 'dark2';
        this.lineChart.options.theme='dark2';
        this.pieChart.options.theme='dark2';
        this.lineChart.render();
        this.pieChart.render();
      }
    })
  }

  async getStats() {
    this.resolvedBugsCount = await this.apiservice.getResolvedBugsCount();
    this.unresolvedBugsCount = await this.apiservice.getUnResolvedBugsCount();
    this.requestedBugsCount = await this.apiservice.getRequestedBugsCount();
    this.highCount = await this.apiservice.getHighPriorityBugsCount();
    this.medCount = await this.apiservice.getMediumPriorityBugsCount();
    this.lowCount = await this.apiservice.getLowPriorityBugsCount();

    let all = await this.apiservice.getBugReports();

    let sum:number = 0;
    let nonZeros:number = 0;
    for (let r of all){
      // let date = this.datePipe.transform(r.createdTime, 'yyyy-MM-dd')
      this.timeSeries.push(r.createdTime)
      let diff:number;
      let a:number = r.resolvedTime
      let b:number = r.createdTime
      diff = a - b
      if (diff > 0){
        ++nonZeros;
        sum += (diff / 3600000);
      }
    }
    
    this.timeSeries = this.timeSeries.sort().reverse()

    this.avgTime = Math.round(sum/nonZeros)
    
    this.makePieChart();
    this.makeLineChart();
    this.lineChart.render();
    this.pieChart.render();
  }

  formatTimeData(timeSeries) {

    // "It just works" - Todd Howard
    let data= [];
    let months = new Array();
    
    for(let point of timeSeries){
      months.push(this.datePipe.transform(point, 'MM-yyyy'))
    }
    

    // seperate into x=months, y=number of occurences 
    let a = [], b = [], prev;
    for ( var i = 0; i < months.length; i++ ) {
        if ( months[i] !== prev ) {
            a.push(months[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = months[i];
    }

    for(var j = 0; j< a.length; j++){
      data.push({ y : b[j], label:a[j]})
    }
    
    
    
    return data;
  }

  makeLineChart(){
    
    let dataPoints = this.formatTimeData(this.timeSeries).reverse();
	  
    
	  let chart = new CanvasJS.Chart("lineChartContainer", {
      theme: this.theme,
      zoomEnabled: true,
      animationEnabled: true,
      backgroundColor: "transparent",
      exportEnabled: true,
      title: {
        text: "Bug Reports Per Month"
      },
      subtitles:[{
        text: "Try Zooming and Panning"
      }],
      axisX: {
        labelAngle: -30
      },
      data: [
      {
        type: "line",                
        dataPoints: dataPoints
      }]
	  });
    this.lineChart = chart;
	  
  }

  makePieChart(){
    let chart = new CanvasJS.Chart("pieChartContainer", {
      theme: this.theme,
      backgroundColor: "transparent",
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
    
    this.pieChart = chart;
  }
}
