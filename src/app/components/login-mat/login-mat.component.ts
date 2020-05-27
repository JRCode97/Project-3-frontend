import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-mat',
  templateUrl: './login-mat.component.html',
  styleUrls: ['./login-mat.component.css']
})
export class LoginMatComponent implements OnInit {

  constructor() { }

  showSpinner: boolean;

  toggle = false;
  status = 'Enable';

  ngOnInit(): void {
  }

}
