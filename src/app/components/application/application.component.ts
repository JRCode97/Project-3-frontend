import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Application} from 'src/app/models/Application';
import { Router } from '@angular/router';
// import {ApplicationsService} from 'src/app/services/applications.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private router: Router) { }
  @ViewChild('titlErr') x: ElementRef;
  @ViewChild('linkErr') y: ElementRef;
  apps: Array<any>;

  app: any;
  appTitle: string;
  appLink: string;
// private applications:ApplicationsService
  ngOnInit(): void {
   this.getApplications();

  }

   // method that calls applcations get
  async getApplications(){
    // this.apps = await this.applications.getApps();
    this.apps = [{id: 1, title: 'Project 1', gitLink: 'github.com'},
                {id: 2, title: 'Project 2', gitLink: 'github2.com'}];
   }
   clear(){
     // clears fields
     this.appTitle = undefined;
     this.appLink = undefined;
   }


  // method that calls applications post
    // async addApplication(){
    //   if(this.appTitle == undefined) this.x.nativeElement.innerHTML = 'Application Title is required!';
    //   else this.x.nativeElement.innerHTML = '';
    //   if(this.appLink == undefined) this.y.nativeElement.innerHTML = 'Application Github Link is required!';
    //   else this.y.nativeElement.innerHTML = '';
    //   if(this.title != undefined && this.link != undefined){
    //     this.app = await this.applications.addApp(this.appTitle,this.appLink)
    //     this.clear()
    //     if(this.app)this.router.navigate(['/application']);
    //   }
    // }


}
