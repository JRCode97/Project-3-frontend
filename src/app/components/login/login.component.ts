import {Component, OnInit, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) {
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

   switch2(){
    this.x.nativeElement.style.left = '50px';
    this.y.nativeElement.style.left = '450px';
    this.z.nativeElement.style.left = '0';
  }


}
