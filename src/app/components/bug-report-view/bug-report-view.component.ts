import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Solution from 'src/app/models/Solution';
import BugReport from 'src/app/models/BugReport';
import Client from 'src/app/models/Client';
import { ActivatedRoute, Router } from '@angular/router';
import SolutionStatus from 'src/app/models/SolutionStatus';

@Component({
    selector: 'app-bug-report-view',
    templateUrl: './bug-report-view.component.html',
    styleUrls: ['./bug-report-view.component.css']
})
export class BugReportViewComponent implements OnInit {
    brId: any;
    solutions: Array<Solution>;
    br: BugReport;
    client: Client;
    SolDescription: string = '';
    SolTitle: string = '';





    constructor(private apiserv: ApiServiceService, private route: ActivatedRoute, private router: Router) {
        // const queryString = window.location.search;
        // const urlParams = new URLSearchParams(queryString);
        // this.brId = urlParams.get("brid");
        this.getClient();
        if (this.client == null || this.client === undefined)
            this.router.navigate(["/"]);
        else {
            console.log(this.client);
            this.brId = this.route.snapshot.paramMap.get("id");
            this.getBugReportById();

            this.getBugSolutionsById();
        }

    }

    ngOnInit(): void {
    }
    //0. Get Client By ID 
    getClient(): Client {
        this.client = this.apiserv.getLoggedClient();

        console.log(this.client);
        return this.client;
    }
    //1. Get Bug Report By ID 
    async  getBugReportById(): Promise<BugReport> {
        this.br = await this.apiserv.getBugReportById(this.brId);

        console.log(this.br);
        return this.br;
    }
    //2. Get all Solutions  by Bug Report ID 
    async  getBugSolutionsById(): Promise<Array<Solution>> {
        this.solutions = await this.apiserv.getSolutionsByBugId(this.brId);

        console.log(this.solutions);
        return this.solutions;
    }
    //3. Add new  Solution 
    async postSolution(): Promise<any> {
        let sol: Solution;
        sol.br = this.br;
        sol.client = this.client;
        sol.id = 0;
        sol.status = SolutionStatus.pending;
        sol.title = this.SolTitle;
        sol.description = this.SolDescription;
        sol.timeSubmitted = Number(new Date().toLocaleString());

        let result = await this.apiserv.postSolution(sol);
        console.log(sol);
        return result;
    }
}