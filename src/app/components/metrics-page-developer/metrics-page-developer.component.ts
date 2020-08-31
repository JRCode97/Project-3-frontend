import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Client } from '../../models/Client';
import { DatePipe } from '@angular/common';
//import {fxLayout} from  '@angular/flex-layout';

import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';
import * as CanvasJS from 'src/assets/canvasjs.min';
import { DataPoint, ClientDTO, DataObject } from './metrics-page-developer-models';

@Component({
  selector: 'app-metrics-page-developer',
  templateUrl: './metrics-page-developer.component.html',
  styleUrls: ['./metrics-page-developer.component.scss']
})
export class MetricsPageDeveloperComponent implements OnInit {
  
  
  clients: Array<ClientDTO> = [];
  bugsDataPoints: Array<DataPoint> = [];
  solsDataPoints: Array<DataPoint> = [];
  clientsUsage: Array<DataObject> = [];

  whileLoading:string = "buffering";
  ifLoading:boolean = true;

  constructor(private apiServ: ApiServiceService, private datePipe: DatePipe) {
    
    // bugs requested & solutions per user 
    // some kind of "social enagement" - stretch
    // active users - users that have submitted something in the past week 
    /*
    user bug creation time or solution time submitted.
    */
    
    // inactive users 
    // avg time user bug takes to complete 
    // amount of users 
    
  }
  
  async ngOnInit(): Promise<void> {
    await this.initializeClientsField();
    this.initializeDataPointsFields();
    this.initializeTheDataObject();
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
      this.clients.push(new ClientDTO(c.cId, c.fName, c.lName, bugs, sols, this.calcAverageTimeAUserBugTakesToResolve (bugs)));
    }
    
  }
  "{client:me , bugs:count, sols:count}"
  
  initializeDataPointsFields(): void {
    
    for (let c of this.clients) {
      this.bugsDataPoints.push(new DataPoint(
        { y: c.bugs.length, label: `${c.firstName} ${c.lastName}` })
        );
        this.solsDataPoints.push(new DataPoint(
          { y: c.sols.length, label: `${c.firstName} ${c.lastName}` })
          );
          
        }
      }
      
      
      
      
      initializeTheDataObject(): void {
        
        for (let c of this.clients) {
          
          let datapointArray: Array<DataPoint> = [];
          for (let bug of c.bugs) {
            let numOfBugsPerMonth: number = 0;
            let date: Date = new Date(bug.createdTime);
            
            for (let yy of c.bugs) {
              let yyDate: Date = new Date(yy.createdTime);
              if (date.getMonth() === yyDate.getMonth()
              && date.getFullYear() === yyDate.getFullYear()) {
                
                ++numOfBugsPerMonth;
              }
            }
            
            /*
            num of bugs =0
            num of bugs is at least one 
            */
            
            
            datapointArray.push(new DataPoint({ x: new Date(bug.createdTime), y: numOfBugsPerMonth }));
            
          }
          this.clientsUsage.push(new DataObject({
            type: "line",
            axisYType: "secondary",
            name: `${c.firstName}`,
            showInLegend: true,
            markerSize: 0,
            dataPoints: datapointArray
          }))
        }
        
      }
      
      
      
      drawBugsAndSolutionsBarChart(): void {
        
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true, backgroundColor: "transparent", title: {
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
          toolTip: { shared: true },
          legend: { cursor: "pointer", itemclick: toggleDataSeries},
          data: [{
            type: "column", color: "IndianRed", name: "Bugs",
            legendText: "bugs", showInLegend: true, dataPoints: this.bugsDataPoints
          },
          {
            type: "column", color: "DarkSeaGreen", name: "Solutions",
            legendText: "sols", axisYType: "secondary",
            showInLegend: true, 
            dataPoints: this.solsDataPoints
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
      
      
      
      drawClientsUsage() {
        let chart = new CanvasJS.Chart("chartContainer_2", {
          animationEnabled: true,
          title: { text: "Bugs Submitted By Date" },
          axisX: { interval: 1, intervalType: "month", valueFormatString: "MM YYYY"},
          axisY2: { title: "Median List Price" } ,
          toolTip: { shared: true },
          legend: {
            cursor: "pointer", verticalAlign: "top", horizontalAlign: "center",
            dockInsidePlotArea: true, itemclick: toogleDataSeries
          },
          data: this.clientsUsage
        });
        chart.render();
        
        function toogleDataSeries(e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          chart.render();
        }
        
        this.whileLoading = "";
        this.ifLoading= false;
      }
      
      calcAverageTimeAUserBugTakesToResolve(bugs: Array<BugReport>): number{
        
        for (let b of bugs){
          const date1 = new Date(b.createdTime);
          const date2 = new Date(b.resolvedTime);
          const diff = Math.abs( (date2.getTime() - date1.getTime()) / 36e5);
          const diffAsInteger= Math.ceil(diff);
          return diffAsInteger;
        }
      }
      
      
    }
    
    
    
    