import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Client from 'src/app/models/Client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('login') x: ElementRef;
  @ViewChild('register') y: ElementRef;
  @ViewChild('btn') z: ElementRef;

  constructor(private serv: ApiServiceService, private router: Router) {


  }
  // dummy login function , justto showoff how to store the client object  in local storage session 
  async dummyLocgin() {

    let client = new Client();
    client = await this.serv.getClientById(1);
    alert(client.fName)
    this.serv.setLoggedClient(client);
    //dummy route 
    this.router.navigate(["bugreport/1"]);

  }
  ngOnInit(): void {
  }

  switch1() {
    this.x.nativeElement.style.left = '-400px';
    this.y.nativeElement.style.left = '50px';
    this.z.nativeElement.style.left = '110px';
  }

  switch2() {
    this.x.nativeElement.style.left = '50px';
    this.y.nativeElement.style.left = '450px';
    this.z.nativeElement.style.left = '0';
  }


}
