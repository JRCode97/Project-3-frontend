import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BugReport} from 'src/app/models/BugReport'
import {Application} from 'src/app/models/application'
import Solution from '../models/Solution';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  path = 'http://ec2-52-14-153-164.us-east-2.compute.amazonaws.com:9000';

  submitNewBugReport(bugReport: BugReport): Promise<BugReport>{
    return this.http.post<BugReport>(this.path + '/BugReport', bugReport).toPromise();
  }

  getApplications(): Promise<Application[]>{
    return this.http.get<Application[]>(this.path + '/Application').toPromise();
  }

  getBugReports(): Promise<BugReport[]>{
    return this.http.get<BugReport[]>(this.path + '/bugreports').toPromise();
  }

  getBugReportById(id:number) {
    return this.http.get<BugReport>(this.path +`/bugreports/${id}`).toPromise();
  }

  getSolutionById(id:number) {
    return this.http.get<Solution>(this.path +`/solutions/${id}`).toPromise();
  }

  getAllApplications(): Promise<Application[]>{
    return this.http.get<Application[]>(this.path + '/applications').toPromise();
  }

  getLeaderboardNames(): Promise<String[]>{
    return this.http.get<String[]>(this.path + '/clients/leaderboard/username').toPromise();
  }

  getLeaderboardPoints(): Promise<number[]>{
    return this.http.get<number[]>(this.path + '/clients/leaderboard/points').toPromise();
  }

}
