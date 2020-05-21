import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  //TEMP FIELD
  fName:String = "Sarah";
  lName:String = "Connor";

  constructor() { }

  ngOnInit(): void {
  }

}
