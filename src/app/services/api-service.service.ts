import { Injectable, Output, EventEmitter } from '@angular/core';
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





  @Output() theme:EventEmitter<string> = new EventEmitter<string>()


  //path: string = 'http://ec2-52-14-153-164.us-east-2.compute.amazonaws.com:9000'
  //path: string = 'http://ec2-52-14-153-164.us-east-2.compute.amazonaws.com:9111'
  path: string = 'http://localhost:9111';


  //################ Start of Bug Report Section ###################

  async getBugReports(): Promise<BugReport[]> {
    return await this.http.get<BugReport[]>(`${this.path}/bugreports`).toPromise();
  }

  getbugReportByClientUsername(username:string){
    return this.http.get<BugReport[]>(this.path + `/bugreports/client/${username}`).toPromise();
  }

  /* getbugReportByApp(id:number){
    return this.http.get<BugReport>(`${this.path}/applications/${id}/bugreports`).toPromise();
  } */

  getResolvedBugs(): Promise<BugReport[]> {
    return this.http.get<BugReport[]>(`${this.path}/bugreports?status=Resolved`).toPromise();
  }

  getResolvedBugsCount(): Promise<number> {
    return this.http.get<number>(`${this.path}/bugreports?status=Resolved&count=true`).toPromise();
  }

  getRequestedBugs(): Promise<BugReport[]> {
    return this.http.get<BugReport[]>(`${this.path}/bugreports?status=Requested`).toPromise();
  }
  getRequestedBugsCount(): Promise<number> {
    return this.http.get<number>(`${this.path}/bugreports?status=Requested&count=true`).toPromise();
  }

  getUnResolvedBugs(): Promise<BugReport[]> {
    return this.http.get<BugReport[]>(`${this.path}/bugreports?status=Unresolved`).toPromise();
  }

  getUnResolvedBugsCount(): Promise<number> {
    return this.http.get<number>(`${this.path}/bugreports?status=Unresolved&count=true`).toPromise();
  }

  getHighPriorityBugsCount(): Promise<number> {
    return this.http.get<number>(`${this.path}/bugreports?priority=High&count=true`).toPromise();
  }
  getMediumPriorityBugsCount(): Promise<number> {
    return this.http.get<number>(`${this.path}/bugreports?priority=Medium&count=true`).toPromise();
  }
  getLowPriorityBugsCount(): Promise<number> {
    return this.http.get<number>(`${this.path}/bugreports?priority=Low&count=true`).toPromise();
  }

  getBugReportById(id:number) {
    return this.http.get<BugReport>(`${this.path}/bugreports?id=${id}`).toPromise();
  }

  submitNewBugReport(bugReport: BugReport): Promise<BugReport>{
    return this.http.post<BugReport>(`${this.path}/bugreports`, bugReport).toPromise();
  }

  putBugReport(bugReport: BugReport): Promise<BugReport> {
    return this.http.put<BugReport>(`${this.path}/bugreports`, bugReport).toPromise();
  }

  //################ Start of Client Section ###################

  clientLogin(username: any, pass: any): Promise<Client> {
    return this.http.get<Client>(this.path + `/clients/login?username=${username}&password=${pass}`).toPromise();
  }
  getClientByUserName(username: any): Promise<Client> {
    return this.http.get<Client>(this.path + `/query/clients?username=${username}`).toPromise();
  }
  async clientRegister(client: Client): Promise<Client> {
    return await this.http.post<Client>(this.path + `/clients`, client).toPromise();
  }
  getClientById(id: number): Promise<Client> {
    return this.http.get<Client>(`${this.path}/clients/${id}`).toPromise();
  }

  async getAllClients():Promise<Array<Client>>{
    let clients: Array<Client> = await this.http.get<Array<Client>>(`${this.path}/clients`).toPromise();
    return clients;
  }

  async getClientBugReportCount() : Promise<number>{
    const bugsCount: number = await this.http.get<number>(`${this.path}/bugreports/count`).toPromise();
    return bugsCount;
  }

  async getClientSolutionsCount(): Promise<number> {
    const solsCount: number = await this.http.get<number>(`${this.path}/solutions/count`).toPromise();
    return solsCount;
  }

  // points displayed in profile page
  getPoints(id:number){
    return this.http.get<number>(this.path + `/clients/points?id=${id}`).toPromise();
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
    return this.http.put<Client>(`${this.path}/clients`, client).toPromise();
  }
  //does not work
  resetPassword(email:string):Promise<any>{
    return this.http.post(`${this.path}/resetpassword/${email}`, email).toPromise();

  }



  //################ Start of Solution Section ###################

  //1. Add new Solution
  // TODO: check if Promise<Solution> is okay
  async postSolution(solution: Solution): Promise<Solution> {
    let ticketPromise = await this.http.post<Solution>(`${this.path}/solutions`, solution).toPromise();
    return ticketPromise;
  }

  async getSolutions(): Promise<Solution[]> {
    return await this.http.get<Solution[]>(`${this.path}/solutions`).toPromise();
  }
  
  //2. Get all Solutions by Bug Report ID
  getSolutionsByBugId(id:number) {
    return this.http.get<Solution[]>(`${this.path}/solutions?bId=${id}`).toPromise();

  }

  getSolutionById(id: number) {
    return this.http.get<Solution>(`${this.path}/solutions?id=${id}`).toPromise();
  }


  getSolutionsByClientId(id:number) {
    return this.http.get<Solution[]>(`${this.path}/solutions?cId=${id}`).toPromise();
  }

  putSolution(solution:Solution) {
    return this.http.put<Solution>(`${this.path}/solutions`,solution).toPromise();
  }

  //################ Start of Application Section ###################
  getApplications(): Promise<Application[]>{
    return this.http.get<Application[]>(`${this.path}/applications`).toPromise();
  }

  postApplication(appTitle:string,appLink:string):Promise<Application>{
    let appJson = {"id":0, "title":`${appTitle}`, "gitLink":`${appLink}`}
    return this.http.post<Application>(`${this.path}/applications/`, appJson).toPromise();
  }

  getApplicationSolutions(appId:number): Promise<number>{
    return this.http.get<number>(`${this.path}/applications/${appId}/solutions`).toPromise();
  }

  getApplicationUsers(appId:number): Promise<number>{
    return this.http.get<number>(`${this.path}/applications/${appId}/clients`).toPromise();
  }

  getApplicationAverageResolvedTime(appId:number): Promise<number>{
    return this.http.get<number>(`${this.path}/applications/${appId}?resolvedtime=average`).toPromise();
  }

  getApplicationLongestResolvedTime(appId:number): Promise<number>{
    return this.http.get<number>(`${this.path}/applications/${appId}?resolvedtime=longest`).toPromise();
  }

  getApplicationShortestResolvedTime(appId:number): Promise<number>{
    return this.http.get<number>(`${this.path}/applications/${appId}?resolvedtime=shortest`).toPromise();
  }

  //################ Start of Leaderboard Section ###################
  getLeaderboardNames(): Promise<String[]>{
    return this.http.get<String[]>(`${this.path}/clients/leaderboard/username`).toPromise();
  }

  getLeaderboardPoints(): Promise<number[]>{
    return this.http.get<number[]>(`${this.path}/clients/leaderboard/points`).toPromise();
  }

}
