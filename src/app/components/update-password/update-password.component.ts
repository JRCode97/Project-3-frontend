import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ApiServiceService} from 'src/app/services/api-service.service';
import { Validators } from '@angular/forms';
import {Client} from 'src/app/models/Client'

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  passwordForm =  this.fb.group({
    currentPassword:[''],
    newPassword:['', Validators.minLength(8)],
    verifyPassword:['']
  }, {validators:this.validatePassword});

  client:Client = this.api.getLoggedClient();

  passwordCorrect:boolean;

  constructor(private fb:FormBuilder, private api:ApiServiceService) { }

  ngOnInit(): void {

  }

  async submit(){
    if(this.passwordForm.value.currentPassword==this.client.password){
      this.client.password = this.passwordForm.value.newPassword;
      let result = await this.api.updatePassword(this.client);
      this.api.setLoggedClient(result);
      this.passwordCorrect = true;
      alert("password successfully updated");
    }else{
      this.passwordCorrect = false;
    }
  }

  validatePassword(form: FormGroup){
    let newPassword = form.value.newPassword;
    let validatePassword = form.value.verifyPassword;
    if(validatePassword !== newPassword){
      return {'passwordNotMatch': {value: form.value}};
    }else{
      return null;
    }
  }
}
