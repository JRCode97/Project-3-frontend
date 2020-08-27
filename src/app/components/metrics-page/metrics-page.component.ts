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
 
  btnStyleSum: string;
  btnStyleDev: string;
  btnStyleApp: string;


  ngOnInit(): void {
    this.btnStyleSum = "tab-btn-clicked";
    this.btnStyleDev = "tab-btn";
    this.btnStyleApp = "tab-btn";
    this.ifSummary=true;
  }

  changeToDev(){
    this.btnStyleSum = "tab-btn";
    this.btnStyleDev = "tab-btn-clicked";
    this.btnStyleApp = "tab-btn";
    this.ifSummary=false;
    this.ifApplications=false;
    this.ifDeveloper=true;
  }
  changeToSum(){
    this.btnStyleSum = "tab-btn-clicked";
    this.btnStyleDev = "tab-btn";
    this.btnStyleApp = "tab-btn";
    this.ifApplications=false;
    this.ifDeveloper=false;
    this.ifSummary=true;
  }
  changeToApp(){
    this.btnStyleSum = "tab-btn";
    this.btnStyleDev = "tab-btn";
    this.btnStyleApp = "tab-btn-clicked";
    this.ifSummary=false;
    this.ifDeveloper=false;
    this.ifApplications=true;
  }
  

}
