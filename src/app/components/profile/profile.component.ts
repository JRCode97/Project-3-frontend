import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Client from 'src/app/models/Client';
import { Router } from '@angular/router';
import { BugReport } from 'src/app/models/BugReport';
import BugStatus from 'src/app/models/BugStatus';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private modalService: NgbModal, private api: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    
    this.client = this.api.getLoggedClient()
    if (this.client == null || this.client === undefined)
    this.router.navigate(["/"]);
    this.assignRole();
    this.getClientPoint();
    this.getSolutionsAndBugs();
  }
  
  bugStatus:string = "All";
  solutionStatus:string = "All";
  hidePassword:boolean = true;;
  shownPass:string = "********";
  editFirstName:boolean = false;
  editLastName:boolean = false;
  editUsername:boolean = false;
  points
  client
  closeResult = '';
  numberOfBugs:number;
  numberOfSolutions:number;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  async getClientPoint(){
   this.points = await this.api.getPoints(this.client.cId);
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

  assignRole(){
    if(this.client.role === 0){
      this.client.role = "Developer"
    }
    else{
      this.client.role = "Admin"
    }
  }
  
  togglePasswordShow(){
    if(!this.hidePassword){
      this.shownPass = "********";
    }else{
      this.shownPass = this.client.password;
    }
    this.hidePassword = !this.hidePassword;
  }
  async getSolutionsAndBugs(){
    this.numberOfBugs = await this.api.getClientBugReportCount();
    this.numberOfSolutions = await this.api.getClientSolutionsCount();
  }
}
