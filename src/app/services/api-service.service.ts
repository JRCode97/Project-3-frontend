import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from 'src/app/models/Client';
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

  updatePassword(client:Client):Promise<Client>{
    return this.http.put<Client>(this.path+`/clients`, client).toPromise();
  }

  getSolutionsByClientId(id:number) {
    return this.http.get<Solution>(this.path +`/query/solutions/client?id=${id}`).toPromise();
  }
}
