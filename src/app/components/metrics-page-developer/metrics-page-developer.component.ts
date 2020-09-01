import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Client } from '../../models/Client';
import { DatePipe } from '@angular/common';
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
  clientsWithBugsOrSolutions: Array<ClientDTO> = [];

  bugsDataPoints: Array<DataPoint> = [];
  solsDataPoints: Array<DataPoint> = [];
  clientsUsage: Array<DataObject> = [];

  whileLoading: string = "buffering";
  ifLoading: boolean = true;

  theme: string;
  clientBugsAndSolutionsBarChart: CanvasJS.Chart;
  clientUsageLineChart: CanvasJS.Chart;


  constructor(private apiServ: ApiServiceService, private datePipe: DatePipe) {

  }

  async ngOnInit(): Promise<void> {

    await this.initializeData();
    this.initializeCharts();

    this.apiServ.theme.subscribe((event) => {
      if (document.body.classList.contains('light-theme')) {
        this.theme = 'light2';
        this.render();
      }
      if (document.body.classList.contains('dark-theme')) {
        this.theme = 'dark2';
        this.render();
      }
    })

    if (document.body.classList.contains('dark-theme')) {
      this.theme = 'dark2';
      this.render();
    } else {
      this.theme = 'light2';
      this.render();
    }


  }

  async initializeData() {
    await this.initializeClientsField();
    this.initializeDataPointsFields();
    this.initializeTheDataObject();
  }

  initializeCharts() {
    this.makeBugsAndSolutionsStackedBarChart();
    this.makeClientsUsageLineChart();
  }

  render() {
    this.clientBugsAndSolutionsBarChart.options.theme = this.theme;
    this.clientUsageLineChart.options.theme = this.theme;
    this.clientBugsAndSolutionsBarChart.render();
    this.clientUsageLineChart.render();
  }


  async initializeClientsField(): Promise<void> {

    const clientsReturned: Array<Client> = await this.apiServ.getAllClients();
    const allBugsReturned: Array<BugReport> = await this.apiServ.getBugReports();
    const allSolutionsReturned: Array<Solution> = await this.apiServ.getSolutions();

    let bugsMap: Map<string, BugReport[]> = new Map();
    let solsMap: Map<string, Solution[]> = new Map();

    let tempBugsHolder: BugReport[] = [];
    for (let bug of allBugsReturned) {
      if (bugsMap.has(bug.username)) {
        tempBugsHolder = bugsMap.get(bug.username);
        tempBugsHolder.push(bug);
        bugsMap.set(bug.username, tempBugsHolder);
      } else {
        bugsMap.set(bug.username, [bug]);
      }

    }

    let tempSolsHolder: Solution[] = [];
    for (let sol of allSolutionsReturned) {
      if (solsMap.has(sol.client.username)) {
        tempSolsHolder = solsMap.get(sol.client.username);
        tempSolsHolder.push(sol);
        solsMap.set(sol.client.username, tempSolsHolder);
      } else {
        solsMap.set(sol.client.username, [sol]);
      }

    }

    for (let c of clientsReturned) {

      let cBugs: BugReport[] = bugsMap.get(c.username);

      let cSols: Solution[] = solsMap.get(c.username);

      /*
        not all clients have bugs or solutions, if they don't have bugs or solutions 
        , there is no key for them in the bug map or solutions map,
        so if I try to get their bugs by their 
        username, I will get undefined, here I am checking for this, if client's bugs 
        is undefined turn the variable to an empty array.
      */
      cBugs = cBugs === undefined ? [] : cBugs;
      cSols = cSols === undefined ? [] : cSols;

      if (cBugs.length !== 0 || cSols.length !== 0) {

        //clients with bugs or solution either one should be not empty at least.
        this.clientsWithBugsOrSolutions.push(new ClientDTO(c.cId, c.fName, c.lName, cBugs, cSols
          , this.calcAverageTimeAUserBugTakesToResolve(cBugs)));


        // all clients regardless of their bugs or solutions existence.
        this.clients.push(new ClientDTO(c.cId, c.fName, c.lName, cBugs, cSols
          , this.calcAverageTimeAUserBugTakesToResolve(cBugs)));

      } else {

        this.clients.push(new ClientDTO(c.cId, c.fName, c.lName, cBugs, cSols
          , this.calcAverageTimeAUserBugTakesToResolve(cBugs)));
      }

    }

  }


  initializeDataPointsFields(): void {

    for (let c of this.clientsWithBugsOrSolutions) {
      this.bugsDataPoints.push(new DataPoint(
        { y: c.bugs.length, label: `${c.firstName} ${c.lastName}` })
      );
      this.solsDataPoints.push(new DataPoint(
        { y: c.sols.length, label: `${c.firstName} ${c.lastName}` })
      );

    }
  }

  initializeTheDataObject(): void {

    for (let c of this.clientsWithBugsOrSolutions) {

      let datapointArray: Array<DataPoint> = [];

      let numOfBugsPerDate: Map<string, [Date, number]> = new Map();

      for (let bug of c.bugs) {

        let date: Date = new Date(bug.createdTime);
        let dateString: string = this.datePipe.transform(date, 'MM/yyyy');
        if (numOfBugsPerDate.has(dateString)) {
          numOfBugsPerDate.set(dateString, [date, numOfBugsPerDate.get(dateString)[1] + 1]);
        } else {
          numOfBugsPerDate.set(dateString, [date, 1]);
        }
      }

      for (let entry of numOfBugsPerDate.entries()) {
        datapointArray.push(new DataPoint({ x: entry[1][0], y: entry[1][1] }));
      }

      this.clientsUsage.push(new DataObject({
        type: "line",
        axisYType: "secondary",
        name: `${c.firstName}`,
        showInLegend: true,
        markerSize: 20,
        dataPoints: datapointArray
      }));
    }
  }


  makeBugsAndSolutionsStackedBarChart(): void {

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true, backgroundColor: "transparent",
      title: { text: "Bugs and Solutions per Developer" },
      axisX: {}, axisY: {}, toolTip: { shared: true },
      legend: { cursor: "pointer" },
      data: [{
        type: "stackedColumn",
        name: "Bugs",
        showInLegend: "true",
        color: 'IndianRed',
        dataPoints: this.bugsDataPoints
      },
      {
        type: "stackedColumn",
        name: "solutions",
        showInLegend: "true",
        color: 'DarkSeaGreen',
        dataPoints: this.solsDataPoints
      }
      ]
    });
    this.clientBugsAndSolutionsBarChart = chart;
  }



  makeClientsUsageLineChart() {
    let chart = new CanvasJS.Chart("chartContainer_2", {
      animationEnabled: true,
      backgroundColor: "transparent",
      title: { text: "Bugs Submitted By Date" },
      axisX: { interval: 1, intervalType: "month", valueFormatString: "MM YYYY" },
      axisY2: { title: "Number of Bugs" },
      toolTip: { shared: true },
      legend: {
        cursor: "pointer", verticalAlign: "top", horizontalAlign: "center",
        dockInsidePlotArea: true
      },

      data: this.clientsUsage
    });

    this.clientUsageLineChart = chart;

    this.whileLoading = "";
    this.ifLoading = false;
  }


  calcAverageTimeAUserBugTakesToResolve(bugs: Array<BugReport>): number {


    if (bugs === [])
      return 0;

    for (let b of bugs) {

      const date1 = new Date(b.createdTime);
      const date2 = new Date(b.resolvedTime);
      const diff = Math.abs((date2.getTime() - date1.getTime()) / 36e5);
      const diffAsInteger = Math.ceil(diff);
      return diffAsInteger;

    }

  }


}
