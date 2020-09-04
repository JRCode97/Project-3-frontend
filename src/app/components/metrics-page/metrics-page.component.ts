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
  theme:string = document.body.classList[1];

  constructor(private apiservice: ApiServiceService) { }
 
  btnStyleSum: string = `tab-btn-clicked ${this.theme}`;
  btnStyleDev: string = `tab-btn`;
  btnStyleApp: string = `tab-btn`;


  ngOnInit(): void {
    this.apiservice.theme.subscribe((event)=>{
      this.theme = document.body.classList[1];
      // selected tab is updated without refresh
      if(this.ifSummary){
        this.btnStyleSum = `tab-btn-clicked ${this.theme}`;
      }
      if(this.ifDeveloper){
        this.btnStyleDev = `tab-btn-clicked ${this.theme}`;
      }
      if(this.ifApplications){
        this.btnStyleApp = `tab-btn-clicked ${this.theme}`;
      }
    })
    this.ifSummary=true;
  }

  changeToDev(){
    this.btnStyleSum = `tab-btn`;
    this.btnStyleDev = `tab-btn-clicked ${this.theme}`;
    this.btnStyleApp = `tab-btn`;
    this.ifSummary=false;
    this.ifApplications=false;
    this.ifDeveloper=true;
  }
  changeToSum(){
    this.btnStyleSum = `tab-btn-clicked ${this.theme}`;
    this.btnStyleDev = `tab-btn`;
    this.btnStyleApp = `tab-btn`;
    this.ifApplications=false;
    this.ifDeveloper=false;
    this.ifSummary=true;
  }
  changeToApp(){
    this.btnStyleSum = `tab-btn`;
    this.btnStyleDev = `tab-btn`;
    this.btnStyleApp = `tab-btn-clicked ${this.theme}`;
    this.ifSummary=false;
    this.ifDeveloper=false;
    this.ifApplications=true;
  }
  

}
