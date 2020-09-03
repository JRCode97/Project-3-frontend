import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {Client} from 'src/app/models/Client';
import BugReport from 'src/app/models/BugReport';

@Component({
  selector: 'app-view-bugs-page',
  templateUrl: './view-bugs-page.component.html',
  styleUrls: ['./view-bugs-page.component.css']
})
export class ViewBugsPageComponent implements OnInit {
  
  isAdmin:boolean;
  client:Client;
  isDeveloper:boolean;
  typeOfReport:string[] = ["Resolved","Unresolved","Requested"];
  bugReports:BugReport[];

  constructor(private serv: ApiServiceService) { }

  ngOnInit(): void {
    this.client = this.serv.getLoggedClient();
    
    if(this.client === null){
      this.isAdmin = false;
      this.isDeveloper = false;
    }else{
      this.isAdmin = this.client.role ? true : false;
      this.isDeveloper = this.client.cId ? true : false;
    }
  }

}
