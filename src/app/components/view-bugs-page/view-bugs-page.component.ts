import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {Client} from 'src/app/models/Client';

@Component({
  selector: 'app-view-bugs-page',
  templateUrl: './view-bugs-page.component.html',
  styleUrls: ['./view-bugs-page.component.css']
})
export class ViewBugsPageComponent implements OnInit {
  isAdmin:boolean;
  client:Client;
  isDeveloper:boolean;
  constructor(private serv: ApiServiceService) { }

  ngOnInit(): void {
    this.client = this.serv.getLoggedClient();
    this.isAdmin = this.client.role ? true : false;
    this.isDeveloper = this.client.cId ? true : false;
  }

}
