import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {Application} from 'src/app/models/Application';
import { Router } from '@angular/router';
import {ApplicationsService} from 'src/app/services/applications.service';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



const a1 = new Application();
 a1.id =1
 a1.title = "werk" 
 a1.gitLink = "ok.com"
const a2 = new Application();
 a2.id =2
 a2.title = "work" 
 a2.gitLink = "okay.com"
const a3 = new Application();
 a3.id =3
 a3.title = "w3rk" 
 a3.gitLink = "oh-kay.com"

const applis = [a1, a2, a3]

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  @ViewChild('titlErr') x: ElementRef;
  @ViewChild('linkErr') y: ElementRef;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  displayedColumns: string[] = ['id', 'title', 'gitLink'];
  dataSource: MatTableDataSource<Application>;
  apps:Array<any> = applis

  constructor(private router: Router,private applications:ApplicationsService) { }

  ngOnInit(): void {
   this.dataSource = new MatTableDataSource(this.apps);
   this.dataSource.sort = this.sort;
   this.addData()
   
  }

  app:any
  appTitle:string
  appLink:string

   //method that calls applcations get
  // async getApplications(){
  //   // this.apps = await this.applications.getApps();
  //    this.applications.tableData = await this.applications.getApps();
  //    console.log(this.applications.tableData)
  //  }


   async addData() {
    const projs:Array<any> = await this.applications.getApps();
    console.log(projs,"1")
    this.apps = projs;
    console.log(this.apps, "2")
    this.dataSource = new MatTableDataSource(this.apps);
  }

   clear(){
     this.appTitle = undefined
     this.appLink = undefined
     this.x.nativeElement.innerHTML = '';
     this.y.nativeElement.innerHTML = '';
   }
  
    async addApplication(){
      if(this.appTitle == undefined) this.x.nativeElement.innerHTML = 'Application Title is required!';
      else this.x.nativeElement.innerHTML = '';
      if(this.appLink == undefined) this.y.nativeElement.innerHTML = 'Application Github Link is required!';
      else this.y.nativeElement.innerHTML = '';
      if(this.appTitle != undefined && this.appLink != undefined){
        this.app = await this.applications.addApp(this.appTitle,this.appLink)
        this.clear()
        if(this.app)this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/application']);
      }); 
      }
    }


}

