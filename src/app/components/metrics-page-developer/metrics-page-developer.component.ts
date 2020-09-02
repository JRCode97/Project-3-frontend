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

  //all clients (no conditions attached)
  clients: Array<ClientDTO> = [];
  //clients with bugs or solution either one should be not empty at least.
  clientsWithBugsOrSolutions: Array<ClientDTO> = [];

  //used in the stacked bar chart
  bugsDataPoints: Array<DataPoint> = [];
  solsDataPoints: Array<DataPoint> = [];

  //used in the multiline chart
  clientsUsage: Array<DataObject> = [];

  //these variables are used to show the loading gif before the charts are rendered. 
  whileLoading: string = "buffering";
  ifLoading: boolean = true;

  theme: string;

  clientBugsAndSolutionsBarChart: CanvasJS.Chart;
  clientUsageLineChart: CanvasJS.Chart;


  constructor(private apiServ: ApiServiceService, private datePipe: DatePipe) {

  }

  async ngOnInit(): Promise<void> {

    // initialze variables
    await this.initializeData();
    // create the charts without drawing them to the page.
    this.initializeCharts();

    // at the time of switching to this page, what is the theme?, 
    // set theme to the correct one.
    if (document.body.classList.contains('dark-theme')) {
      this.theme = 'dark2';
    } else {
      this.theme = 'light2';
    }

    //draw the graphs.
    this.render();

    // if you changed the theme while you are on the page, code below listens to this change
    // and sets the theme accordingly
    this.apiServ.theme.subscribe((event) => {
      if (document.body.classList.contains('light-theme')) {
        this.theme = 'light2';
      }
      else if (document.body.classList.contains('dark-theme')) {
        this.theme = 'dark2';
      }

      this.render();
    })

  }


  async initializeData() {
    //data used by the whole component.
    await this.initializeClientsField();

    //data used by the stacked bar chart 
    this.initializeDataPointsFieldsForStackedBarChart();

    //data used by the multi-series line chart.
    this.initializeClientUsageFieldForMultiLineChart();
  }

  initializeCharts() {
    this.makeBugsAndSolutionsStackedBarChart();
    this.makeClientsUsageLineChart();
  }

  render() {

    // set the theme of the graph to the page theme.
    this.clientBugsAndSolutionsBarChart.options.theme = this.theme;
    this.clientUsageLineChart.options.theme = this.theme;

    // the render functions here is builtin within canvasJS, this will draw the graphs
    this.clientBugsAndSolutionsBarChart.render();
    this.clientUsageLineChart.render();
  }


  async initializeClientsField(): Promise<void> {


    const clientsReturned: Array<Client> = await this.apiServ.getAllClients();
    const allBugsReturned: Array<BugReport> = await this.apiServ.getBugReports();
    const allSolutionsReturned: Array<Solution> = await this.apiServ.getSolutions();

    //the key of the maps are the username of the client.
    let bugsMap: Map<string, BugReport[]> = new Map();
    let solsMap: Map<string, Solution[]> = new Map();


    // code below maps bugs and solutions to the username of the client 

    // initialize bugsMap
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

    //initialize solsMap
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

        this.clientsWithBugsOrSolutions.push(new ClientDTO(c.cId, c.fName, c.lName, cBugs, cSols
          , this.calcAverageTimeAClientBugTakesToResolve(cBugs)));
      }

      //add the bugs and solutions to the object whether they are empty or not.
      this.clients.push(new ClientDTO(c.cId, c.fName, c.lName, cBugs, cSols
        , this.calcAverageTimeAClientBugTakesToResolve(cBugs)));

    }

  }


  initializeDataPointsFieldsForStackedBarChart(): void {

    for (let c of this.clientsWithBugsOrSolutions) {
      this.bugsDataPoints.push(new DataPoint(
        { y: c.bugs.length, label: `${c.firstName} ${c.lastName}` })
      );
      this.solsDataPoints.push(new DataPoint(
        { y: c.sols.length, label: `${c.firstName} ${c.lastName}` })
      );

    }
  }

  initializeClientUsageFieldForMultiLineChart(): void {

    for (let c of this.clientsWithBugsOrSolutions) {

      let datapointArray: Array<DataPoint> = [];

      // key is a string, value is an array, where the first element is Date and the second is number
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


  calcAverageTimeAClientBugTakesToResolve(bugs: Array<BugReport>): number {


    if (bugs === [])
      return 0;

    let sumOfHoursToResolveBug: number = 0;
    let count: number = 0;

    for (let b of bugs) {
      count++;

      const date1 = new Date(b.createdTime);
      const date2 = new Date(b.resolvedTime);
      //line below gets the difference in hours.
      // 36e5 is the scientific notation for 60*60*1000 (I got it from stackoverflow.)
      const diff = Math.abs((date2.getTime() - date1.getTime()) / 36e5);
      sumOfHoursToResolveBug += diff;

    }
    const avgAsInteger = Math.ceil(sumOfHoursToResolveBug / count);
    if (Number.isNaN(avgAsInteger))
      return undefined; //so we can show nothing.
    return avgAsInteger;



  }


}
