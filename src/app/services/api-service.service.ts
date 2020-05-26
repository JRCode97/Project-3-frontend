import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//  schaud
// import {BugReport} from 'src/app/models/BugReport';
// import {Application} from 'src/app/models/Application';

import Application from 'src/app/models/Application';
import BugReport from 'src/app/models/BugReport';
import Client from '../models/Client';

import Solution from '../models/Solution';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  constructor(private http: HttpClient) { }


  path: string = 'http://ec2-52-14-153-164.us-east-2.compute.amazonaws.com:9000'


  //################ Start of Bug Report Section ###################

  getBugReports(): Promise<BugReport[]> {
    return this.http.get<BugReport[]>(this.path + '/bugreports').toPromise();
  }

  getBugReportById(id:number) {
    return this.http.get<BugReport>(`${this.path}/bugreports/${id}`).toPromise();
  }

  submitNewBugReport(bugReport: BugReport): Promise<BugReport>{
    return this.http.post<BugReport>(this.path + '/bugreports', bugReport).toPromise();
  }

  putBugReport(bugReport: BugReport): Promise<BugReport> {
    return this.http.put<BugReport>(`${this.path}/bugreports`, bugReport).toPromise();
  }

  //################ Start of Client Section ###################

  getClientById(id: number): Promise<Client> {
    return this.http.get<Client>(this.path + `/clients/${id}`).toPromise();
  }
  //to be set within the login function 
  setLoggedClient(client: Client) {
    localStorage.setItem('client', JSON.stringify(client));
  }
  //to be used anywhere the user object is needed, it is better to call it in the component constructor 
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

  updatePassword(client:Client):Promise<Client> {
    return this.http.put<Client>(this.path+`/clients`, client).toPromise();
  }
  //does not work
  resetPassword(email:string):Promise<any>{
    return this.http.put(this.path+`/clients`, email).toPromise();
  }

  //################ Start of Solution Section ###################

  //1. Add new Solution 
  async postSolution(slution: Solution): Promise<any> {
    let ticketPromise = await this.http.post(this.path + "/solutions", slution).toPromise();
    return ticketPromise;
  }
  //2. Get all Solutions by Bug Report ID 
  getSolutionsByBugId(id:number) {
    return this.http.get<Solution[]>(this.path +`/query/solutions/bugreport?id=${id}`).toPromise();
  }

  getSolutionById(id: number) {
    return this.http.get<Solution>(this.path + `/solutions/${id}`).toPromise();
  }

  getSolutionsByClientId(id:number) {
    return this.http.get<Solution[]>(this.path +`/solutions?cid=${id}`).toPromise();
  }
  
  //################ Start of Applicationn Section ###################
  getApplications(): Promise<Application[]>{
    return this.http.get<Application[]>(this.path + '/applications').toPromise();
  }

  //################ Start of Leaderboard Section ###################

  getLeaderboardNames(): Promise<String[]>{
    return this.http.get<String[]>(this.path + '/clients/leaderboard/username').toPromise();
  }
  getLeaderboardPoints(): Promise<number[]>{
    return this.http.get<number[]>(this.path + '/clients/leaderboard/points').toPromise();
  }

}
