import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-application',
  templateUrl: './main-page-application.component.html',
  styleUrls: ['./main-page-application.component.css']
})
export class MainPageApplicationComponent implements OnInit {

  //TEMP FIELD
  title:String = "Cursed Pizza Online Ordering System App";
  gitLink:String = "http://github.com/wackywill/cpoos";
  panelOpenState = false;
  bugCount:Number = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
