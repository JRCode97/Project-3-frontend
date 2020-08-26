import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../services/api-service.service';
import {Client} from '../../models/Client';



@Component({
  selector: 'app-metrics-page-developer',
  templateUrl: './metrics-page-developer.component.html',
  styleUrls: ['./metrics-page-developer.component.css']
})
export class MetricsPageDeveloperComponent implements OnInit {

clients: Array<Client>;
//dataMap
  constructor(private apiServ: ApiServiceService) { 

  // bugs requested & solutions per user 
  // some kind of "social enagement" - stretch
  // active users - users that have submitted something in the past week 
  // inactive users 
  // avg time user takes to complete 
  // amount of users 
  // users per application

  }

  ngOnInit(): void {
  }

  async initializeClientsData(): Promise<void>{

    const clientsReturned: Array<Client>  = await this.apiServ.getAllClients();

    for (let c of clientsReturned)
      console.log(c);

    this. clients=clientsReturned;
  }



  // static ClientDTO= class {
  //   Set<>
  // }

}
