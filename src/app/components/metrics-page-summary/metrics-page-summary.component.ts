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

  timeSeries:Array<Object> = new Array();
  resolvedBugsCount:number;
  unresolvedBugsCount:number;
  requestedBugsCount:number;
  highCount:number;
  medCount:number;
  lowCount:number;
  avgTime:number;

  // count by severity & status 
  // weekly bug reports line chart 
  

  constructor(private apiservice: ApiServiceService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getStats();
  }

  async getStats() {
    this.resolvedBugsCount = await this.apiservice.getResolvedBugsCount();
    this.unresolvedBugsCount = await this.apiservice.getUnResolvedBugsCount();
    this.requestedBugsCount = await this.apiservice.getRequestedBugsCount();
    console.log(this.requestedBugsCount)
    this.highCount = await this.apiservice.getHighPriorityBugsCount();
    this.medCount = await this.apiservice.getMediumPriorityBugsCount();
    this.lowCount = await this.apiservice.getLowPriorityBugsCount();
    console.log(this.lowCount)

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
    console.log(this.timeSeries)
    this.avgTime = Math.round(sum/nonZeros)
    
    this.makePieChart();
    this.makeLineChart();
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
	
	  chart.render();
  }

  makePieChart(){
    let chart = new CanvasJS.Chart("pieChartContainer", {
      theme: "light2",
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
      
    chart.render();
  }
}
