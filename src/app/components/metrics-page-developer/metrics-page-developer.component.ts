import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Client } from '../../models/Client';
import { DatePipe } from '@angular/common';

import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';
import * as CanvasJS from 'src/assets/canvasjs.min';


@Component({
  selector: 'app-metrics-page-developer',
  templateUrl: './metrics-page-developer.component.html',
  styleUrls: ['./metrics-page-developer.component.scss']
})
export class MetricsPageDeveloperComponent implements OnInit {
  
  
  clients: Array<ClientDTO> = [];
  bugsDataPoints: Array<DataPoint> = [];
  solsDataPoints: Array<DataPoint> = [];
  
  constructor(private apiServ: ApiServiceService, private datePipe:DatePipe) {
    
    // bugs requested & solutions per user 
    // some kind of "social enagement" - stretch
    // active users - users that have submitted something in the past week 
    /*
    user bug creation time or solution time submitted.
    */
    
    // inactive users 
    // avg time user bug takes to complete 
    // amount of users 
    // users per application
    
  }
  
  async ngOnInit(): Promise<void> {
    await this.initializeClientsField();
    this.initializeDataPointsFields();
    this.drawBugsAndSolutionsBarChart();
    this.drawClientsUsage();
  }
  
  async initializeClientsField(): Promise<void> {
    let bugs: Array<BugReport> = [];
    let sols: Array<Solution> = [];
    const clientsReturned: Array<Client> = await this.apiServ.getAllClients();
    for (let c of clientsReturned) {
      
      bugs = await this.apiServ.getbugReportByClientUsername(c.username);
      sols = await this.apiServ.getSolutionsByClientId(c.cId);
      
      //const bugsDataPoint = new DataPoint(bugs.length, `${c.fName} ${c.lName}`);
      //{y: bugs.length, label: `${c.fName} ${c.lName}`};
      //const solsDataPoint = new DataPoint(sols.length, `${c.fName} ${c.lName}`);
      //{y: sols.length, label: `${c.fName} ${c.lName}`}
      this.clients.push(new ClientDTO(c.cId, c.fName, c.lName, bugs, sols));
    }
    
  }
  
  initializeDataPointsFields(): void {
    
    for (let c of this.clients) {
      this.bugsDataPoints.push(new DataPoint(
          {y: c.bugs.length, label: `${c.firstName} ${c.lastName}`})
      );
      this.solsDataPoints.push(new DataPoint(
          {y: c.sols.length, label: `${c.firstName} ${c.lastName}`})
      );


    }
  }
  
  
  
  drawBugsAndSolutionsBarChart(): void {
    
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: false, backgroundColor: "transparent", title: {
        text: "Developers Bugs And Solutions"
      },
      axisY: {
        title: "Bugs Per Developer", titleFontColor: "#4F81BC",
        lineColor: "#4F81BC", labelFontColor: "#4F81BC", tickColor: "#4F81BC"
      },
      axisY2: {
        title: "Solutions Per Developer", titleFontColor: "#C0504E",
        lineColor: "#C0504E", labelFontColor: "#C0504E", tickColor: "#C0504E"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer", itemclick: toggleDataSeries
      },
      data: [{
        type: "column", color: "IndianRed", name: "Bugs",
        legendText: "bugs", showInLegend: true, dataPoints: this.bugsDataPoints
      },
      {
        type: "column", color: "DarkSeaGreen", name: "Solutions",
        legendText: "sols", axisYType: "secondary",
        showInLegend: true, dataPoints: this.solsDataPoints
      }]
    });
    chart.render();
    
    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }
  
  
  
  drawClientsUsage(){
    let chart = new CanvasJS.Chart("chartContainer_2", {
      title: {
        text: "House Median Price"
      },
      axisX: {
        valueFormatString: "MMM YYYY"
      },
      axisY2: {
        title: "Median List Price"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer", verticalAlign: "top", horizontalAlign: "center",
        dockInsidePlotArea: true, itemclick: toogleDataSeries
      },
      data: [{
        type:"line", axisYType: "secondary",
        name: "Bollyood", showInLegend: true, markerSize: 0,
        dataPoints: [		
          //{ x: new Date(2014, 00, 01), y: 850 },
          
        ]
      },
      {
        type: "line",
        axisYType: "secondary",
        name: "Manhattan",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: [
          // { x: new Date(2014, 00, 01), y: 1200 },
          
        ]
      },
      {
        type: "line",
        axisYType: "secondary",
        name: "Seatle",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: [
          //{ x: new Date(2014, 00, 01), y: 409 },
          
        ]
      },
      {
        type: "line",
        axisYType: "secondary",
        name: "Los Angeles",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: [
          //{ x: new Date(2014, 00, 01), y: 529 },
          
        ]
      }]
    });
    chart.render();
    
    function toogleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else{
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    
  }
  
  
  
  formatTimeData(dateInMilliseconds: number): string {
    return this.datePipe.transform(dateInMilliseconds, 'MM-yyyy');
  }
}


export class ClientDTO {
  
  cId: number;
  firstName: string;
  lastName: string;
  
  bugs: Array<BugReport>;
  sols: Array<Solution>;
  
  constructor(cId: number, firstname: string, lastname: string, bugs: Array<BugReport>, sols: Array<Solution>) {
    this.cId = cId;
    this.firstName = firstname;
    this.lastName = lastname;
    this.bugs = bugs;
    this.sols = sols;
  }
}

export class DataPoint {
  x:number ;
  y: number;

  label: string;

  constructor({x,y,label}: { x?:number, y?: number,  label?: string} ) {
    this.x=x;
    this.y = y;
    this.label = label;
  }
  
}


export class DataObject{

  type: string;// "line",
  axisYType:string; // "secondary",
  name: string; //"Seatle",
  showInLegend: boolean; //true,
  markerSize: number; // 0,
  yValueFormatString: string // "$#,###k",
  dataPoints: Array<DataPoint>[];
    //{ x: new Date(2014, 00, 01), y: 409 },
    
  constructor({type, axisYType, name, showInLegend, markerSize, 
    yValueFormatString, dataPoints} : {type?:string, axisYType?: string 
      , name?:string, showInLegend?:boolean, markerSize?:number
      , yValueFormatString?:string, dataPoints:Array<DataPoint>}){

      }

}
