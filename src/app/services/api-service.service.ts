import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugReport } from 'src/app/models/BugReport'
import { Application } from 'src/app/models/application'
import { promise } from 'protractor';
import Solution from '../models/Solution';
import Client from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  //path: string = 'http://ec2-52-14-153-164.us-east-2.compute.amazonaws.com:9000'
  path: string = 'http://localhost:9000'




  submitNewBugReport(bugReport: BugReport): Promise<BugReport> {
    return this.http.post<BugReport>(this.path + '/BugReport', bugReport).toPromise();
  }

  getApplications(): Promise<Application[]> {
    return this.http.get<Application[]>(this.path + '/Application').toPromise();
  }

  getBugReports(): Promise<BugReport[]> {
    return this.http.get<BugReport[]>(this.path + '/bugreports').toPromise();
  }

  getBugReportById(id: number) {
    return this.http.get<BugReport>(this.path + `/bugreports/${id}`).toPromise();
  }

  getSolutionById(id: number) {
    return this.http.get<Solution>(this.path + `/solutions/${id}`).toPromise();
  }



  //################ Start of Client Section ###################

  getClientById(id: number): Promise<Client> {
    return this.http.get<Client>(this.path + `/clients/${id}`).toPromise();
  }
  //to be set within the login function 
  setLoggedClient(client: Client) {
    localStorage.setItem('client', JSON.stringify(client));
  }
  //to be used anywhere the user objec is needed  , it is better to call it in the component constructor 
  getLoggedClient(): Client {
    let val = localStorage.getItem('client');
    let client = new Client();
    client = JSON.parse(val)
    return client;
  }
  //used on logout 
  clearLoggedClient() {
    localStorage.clear();
  }

  //################ End of Client  Section ###################


  //################ Start of Solution Section ###################

  //1. Add new Solution 
  async postSolution(slution: Solution): Promise<any> {
    let ticketPromise = await this.http.post(this.path + "/solutions", slution).toPromise();
    return ticketPromise;
  }
  //2. Get all Solutions  by Bug Report ID 
  getSolutionsByBugId(brId: number): Promise<Array<Solution>> {
    return this.http.get<Array<Solution>>(this.path + '/query/solutions/bugreport?id=' + brId).toPromise();
  }
  
  //################ End of Solution Section ###################
}
