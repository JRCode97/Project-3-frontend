import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Application} from 'src/app/models/Application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http:HttpClient) { }
   //path:string = 'http://ec2-52-14-153-164.us-east-2.compute.amazonaws.com:9000'

   path:string = 'http://localhost:9111'

  //path:string = 'http://localhost:9000'


  getApps():Promise<Application[]>{
    return this.http.get<Application[]>(this.path+'/applications/').toPromise();
  }

  addApp(appTitle:string,appLink:string):Promise<Application>{
    let appJson = {"id":0, "title":`${appTitle}`, "gitLink":`${appLink}`}
    return this.http.post<Application>(this.path+'/applications/', appJson).toPromise();
  }




 }
