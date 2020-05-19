// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {Application} from 'src/app/models/application'

// @Injectable({
//   providedIn: 'root'
// })
// export class ApplicationsService {

//   constructor(private http:HttpClient) { }
//   path:string = 'http://localhost:9000'


//   getApps():Promise<Application[]>{
//     return this.http.get<Application[]>(this.path+'/applications/').toPromise();
//   }

//   addApp(appTitle:string,appLink:string):Promise<Application>{
//     let appJson = {"appId":0, "appTitle":`${appTitle}`,"appLink":`${appLink}`}
//     return this.http.post<Application>(this.path+'/applications/', appJson).toPromise();
//   }




 //}
