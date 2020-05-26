import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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

  closeResult = '';
  showSpinner: boolean;

  toggle = false;
  status = 'Enable';

  constructor(private modalService: NgbModal, private serv: ApiServiceService, private router: Router) {}
  // dummy login function , just to showoff how to store the client object  in local storage session
  async dummyLocgin() {
    this.showSpinner = true;
    let client = new Client();
    client = await this.serv.getClientById(2);
    // alert(client.fName);
    this.serv.setLoggedClient(client);
    // dummy route
    // await this.router.navigate(['bugreport/1']);
    setTimeout(() => {
      window.location.href = '/main';
    }, 1500);

  }



  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }



  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

   switch1(){
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
