import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiServiceService} from 'src/app/services/api-service.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  email = new FormControl('');
  
  constructor(private api:ApiServiceService) { }

  submit(){
    this.api.resetPassword(this.email.value);
  }

  ngOnInit(): void {
  }


}
