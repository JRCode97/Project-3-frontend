import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service.service';
import {Client} from '../../models/Client';
import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';
import * as CanvasJS from 'src/assets/canvasjs.min';


@Component({
  selector: 'app-metrics-page-developer',
  templateUrl: './metrics-page-developer.component.html',
  styleUrls: ['./metrics-page-developer.component.css']
})
export class MetricsPageDeveloperComponent implements OnInit {

clients: Array<ClientDTO> = [];
bugsDataPoints: Array<DataPoint> = [];
solsDataPoints :  Array<DataPoint> = [];

  constructor(private apiServ: ApiServiceService) { 

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
    await this. initializeClientsField();
    this.initializeDataPointsFields();
    this.draw();
  }

  async initializeClientsField(): Promise<void>{
    let bugs:  Array<BugReport> = [];
    let sols: Array<Solution> = [];
    const clientsReturned: Array<Client>  = await this.apiServ.getAllClients();
    for (let c of clientsReturned){
      
      bugs= await this.apiServ.getbugReportByClientUsername(c.username);
      sols= await this.apiServ.getSolutionsByClientId(c.cId);

      const bugsDataPoint= new DataPoint(bugs.length, `${c.fName} ${c.lName}`);
      //{y: bugs.length, label: `${c.fName} ${c.lName}`};
      const solsDataPoint= new DataPoint(sols.length, `${c.fName} ${c.lName}`);
      //{y: sols.length, label: `${c.fName} ${c.lName}`}
      this.clients.push(new ClientDTO(c.cId,c.fName, c.lName, bugsDataPoint, solsDataPoint));
    }

  }

  initializeDataPointsFields() :void{

    for (let c of this.clients){
      this.bugsDataPoints.push(c.bugsDataPoint);
      this.solsDataPoints.push(c.solutionsDataPoint);
    }

    //console.log(this.bugsDataPoints);
    //console.log(this.solsDataPoint);
    //console.log(this.clients);
  }



  draw(): void {

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: false,
      title:{
        text: "Developers Bugs And Solutions"
      },	
      axisY: {
        title: "Bugs Per Developer",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },
      axisY2: {
        title: "Solutions Per Developer",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
      },	
      toolTip: {
        shared: true
      },
      legend: {
        cursor:"pointer",
        itemclick: toggleDataSeries
      },
      data: [{
        type: "column",
        color: "IndianRed", 
        name: "Bugs",
        legendText: "bugs",
        showInLegend: true, 
        dataPoints: this.bugsDataPoints
      },
      {
        type: "column",
        color: "DarkSeaGreen",	
        name: "Solutions",
        legendText: "sols",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: this.solsDataPoints
      }]
    });
    chart.render();
    
    function toggleDataSeries(e) {
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }


  }

      
      

  }



export class ClientDTO  {
    
  cId: number;
  firstName:string;
  lastname: string;
  bugsDataPoint: DataPoint;
  solutionsDataPoint: DataPoint;


  constructor(cId:number,  firstname:string, lastname:string, bugs:DataPoint, sols:DataPoint){
    this.cId=cId;
    this.firstName=firstname;
    this.lastname=lastname;
    this.bugsDataPoint=bugs;
    this.solutionsDataPoint=sols;
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