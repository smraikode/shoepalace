import { Component, OnInit } from '@angular/core';
import { FormSubmitService } from '../services_/form-submit.service';
import { Router }  from '@angular/router';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[FormSubmitService],
})
export class LoginComponent implements OnInit {

  data: any = {};
  constructor(private sendData: FormSubmitService,private router: Router) { }

  ngOnInit() {
  }
  formSubmit() {
    this.sendData.postFormData(this.data).subscribe(res=>{
      this.router.navigate(['/dashboard']); 
    },
    err => {
      alert('Please enter proper creadiancials');
    });
  }
  
}
