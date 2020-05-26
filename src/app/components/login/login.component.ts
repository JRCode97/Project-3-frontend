import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Client from 'src/app/models/Client';
import Solution from 'src/app/models/Solution';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerform=this.fb.group({
    Fname:['',Validators.required],
    Lname:['',Validators.required],
    UserName:['',Validators.required],
    Email: ['',Validators.required],
    Password: ['',Validators.required],
    ConfPass:['',Validators.required],
  })
  @ViewChild('login') x: ElementRef;
  @ViewChild('register') y: ElementRef;
  @ViewChild('btn') z: ElementRef;
  @ViewChild('txtusername') txtusername: ElementRef;
  @ViewChild('txtpassword') txtpassword: ElementRef;
  client = new Client();
  Fname: string;
  Lname: string;
  Username: string;
  Email: string;
  Pass: string;
  ConfPass: string;
  closeResult = '';
 
  valiationMsg:any;
  public savingfailed: boolean = false;
  public inValidUser: boolean = false;
  constructor(private modalService: NgbModal, private serv: ApiServiceService, private router: Router , private fb:FormBuilder) {
    this.client = serv.getLoggedClient()
    if (this.client != null && this.client.cId > 0) {
      this.serv.setLoggedClient(this.client);
      //dummy route 
      this.router.navigate(["/main"]);
    }
  }
  showSpinner: boolean;

  toggle = false;
  status = 'Enable';
 
  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
 
  }

  ngOnInit(): void {
  }
  // dummy login function , justto showoff how to store the client object  in local storage session 
  async getClientByUsername(): Promise<Client> {
    let user= new Client();
    let username = this.txtusername.nativeElement.value;
    let pass = this.txtpassword.nativeElement.value;
    try {
      this.client = await this.serv.clientLogin(username, pass);
      console.log(this.client);
      // alert(client.fName)
      if (this.client != null && this.client.cId > 0) {
        this.serv.setLoggedClient(this.client);
        //dummy route 
        this.valiationMsg ="This Username is not available , please select another one"
      }
      else {
        this.valiationMsg ="";
      }
    }
    catch{
      this.valiationMsg ="";
    }
    return this.client;
  }

 async clientLogin() {
    let username = this.txtusername.nativeElement.value;
    try {
      this.client = await this.serv.getClientByUserName(username);
      console.log(this.client);
      // alert(client.fName)
      if (this.client != null && this.client.cId > 0) {
        this.serv.setLoggedClient(this.client);
        this.showSpinner = true;
        setTimeout(() => {
          window.location.href = '/main';
        }, 1500);
      }
      else {
        this.txtusername.nativeElement.focus();
        this.inValidUser = true;
      }
    }
    catch{
      this.txtusername.nativeElement.focus();
      this.inValidUser = true;
    }
  }

  async clientRegister(): Promise<Client> {
    let newclient = new Client();
    let solutions: Array<Solution>;
    newclient.cId = 0;
    newclient.email = this.Email;
    newclient.fName = this.Fname;
    newclient.lName = this.Lname;
    newclient.username = this.Username;
    newclient.password = this.Pass;
    newclient.solutions = solutions;
    newclient.role = 0;
    try {
      newclient = await this.serv.clientRegister(newclient);
      console.log(newclient);
      if (newclient != null && newclient.cId > 0) {

        this.router.navigate(["/"]);
      }
      else {
        this.savingfailed = true;
      }
    }
    catch{
      this.savingfailed = true;
    }
    return newclient;

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
  resetlogin(): void {
    this.inValidUser = false;
  }

  resetregister(): void {
    this.savingfailed = false;
  }

}
