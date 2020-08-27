import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-metrics-page',
  templateUrl: './metrics-page.component.html',
  styleUrls: ['./metrics-page.component.scss']
})
export class MetricsPageComponent implements OnInit {

  ifSummary:boolean;
  ifApplications:boolean;
  ifDeveloper:boolean;

  constructor(private apiservice: ApiServiceService) { }
 
 
  ngOnInit(): void {
    this.ifSummary=true;
  }

  changeToDev(){
    this.ifSummary=false;
    this.ifApplications=false;
    this.ifDeveloper=true;
  }
  changeToSum(){
    this.ifApplications=false;
    this.ifDeveloper=false;
    this.ifSummary=true;
  }
  changeToApp(){
    this.ifSummary=false;
    this.ifDeveloper=false;
    this.ifApplications=true;
  }
  

}
